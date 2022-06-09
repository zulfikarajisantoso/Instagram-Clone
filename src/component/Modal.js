import React, { Fragment, useRef, useState } from "react";
import { useRecoilState } from "recoil";
import { modalState } from "../atoms/modelAtoms";
import { Dialog, Transition } from "@headlessui/react";
import { AiOutlineCamera } from "react-icons/ai";
import {
  collection,
  addDoc,
  serverTimestamp,
  updateDoc,
  doc,
} from "firebase/firestore";
import { db, storage } from "../firebase";
import { useStateValue } from "../Stateprovider";
import { ref, getDownloadURL, uploadString } from "firebase/storage";

function Modal() {
  const [open, setopen] = useRecoilState(modalState);
  const filepick = useRef(null);
  const captionref = useRef(null);
  const [selectfile, setselectfile] = useState(null);
  const [loading, setloading] = useState(false);
  const [{ user }, dispatch] = useStateValue();

  // upload
  const uploadpost = async () => {
    if (loading) return;

    setloading(true);

    // create a poost to collection firebase
    const docRef = await addDoc(collection(db, "posts"), {
      username: user.displayName,
      caption: captionref.current.value,
      profileimage: user.photoURL,
      timestamp: serverTimestamp(),
    });

    const imageref = ref(storage, `posts/${docRef.id}/image`);

    await uploadString(imageref, selectfile, "data_url").then(
      async (snapshot) => {
        const downloadurl = await getDownloadURL(imageref);
        await updateDoc(doc(db, "posts", docRef.id), {
          image: downloadurl,
        });
      }
    );
    setopen(false);
    setloading(false);
    setselectfile(null);
  };

  const addfileimage = (e) => {
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }

    reader.onload = (e) => {
      setselectfile(e.target.result);
    };
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-10 inset-0 overflow-y-auto flex justify-center"
        onClose={setopen}
      >
        <div className="flex items-end justify-center min-h-[800px] sm:min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0 ">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>

          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0  sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block align-middle bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8  sm:align-middle sm:max-w-sm sm:w-full sm:p-6 ">
              <div>
                {selectfile ? (
                  <img
                    src={selectfile}
                    className="w-full cursor-pinter"
                    onClick={() => setselectfile(null)}
                    alt=""
                  />
                ) : (
                  <div
                    className="flex justify-center bg-gray-200 rounded-full p-5"
                    onClick={() => filepick.current.click()}
                  >
                    <AiOutlineCamera className="" />
                  </div>
                )}

                <div>
                  <div className="mt-3 text-center ">
                    <h3>Upload a photo</h3>
                  </div>
                  <div>
                    <input
                      ref={filepick}
                      onChange={addfileimage}
                      type="file"
                      hidden
                    />
                  </div>
                  <div className="mt-2">
                    <input
                      ref={captionref}
                      type="text"
                      className="border-none outline-none"
                      placeholder="Please enter a caption..."
                    />
                  </div>
                </div>
                <div className="mt-5 sm:mt-6">
                  <button
                    onClick={uploadpost}
                    type="button"
                    disabled={!selectfile}
                    className="disabled:bg-gray-300 disabled:cursor-not-allowed bg-red-500 w-full p-3  font-semibold text-white rounded-md hover:bg-red-300"
                  >
                    {loading ? "Uploading...." : "Upload Post"}
                  </button>
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}

export default Modal;
