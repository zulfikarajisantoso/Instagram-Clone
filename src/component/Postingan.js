import React, { useState, useEffect } from "react";
import { IoEllipsisHorizontalSharp } from "react-icons/io5";
import { BsChat, BsBookmark } from "react-icons/bs";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { FiSend } from "react-icons/fi";
import { BiTrash } from "react-icons/bi";
import { MdInsertEmoticon } from "react-icons/md";
import { db } from "../firebase";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { useStateValue } from "../Stateprovider";
import Moment from "react-moment";

function Postingan({ id, profileimage, image, username, caption }) {
  const [{ user }, dispatch] = useStateValue();

  const [comment, setcomment] = useState("");
  const [commentnya, setcommentnya] = useState([]);
  const [likes, setlikes] = useState([]);
  const [haslike, sethaslike] = useState(false);

  // const [commnya, setcommnya] = useState(false);

  const postcomment = async (e) => {
    e.preventDefault();

    const commenttosend = comment;
    setcomment("");

    await addDoc(collection(db, "posts", id, "comments"), {
      comment: commenttosend,
      username: user.displayName,
      userimage: user.photoURL,
      timestamp: serverTimestamp(),
    });
  };

  const likepost = async () => {
    if (haslike) {
      await deleteDoc(doc(db, "posts", id, "likes", user.uid));
    } else {
      await setDoc(doc(db, "posts", id, "likes", user.uid), {
        username: user.displayName,
      });
    }
  };

  useEffect(() => {
    onSnapshot(
      query(
        collection(db, "posts", id, "comments"),
        orderBy("timestamp", "desc")
      ),
      (snapshot) => setcommentnya(snapshot.docs)
    );
  }, [db, id]);

  useEffect(() => {
    onSnapshot(collection(db, "posts", id, "likes"), (snapshot) => {
      setlikes(snapshot.docs);
    });
  }, [db, id]);

  useEffect(
    () => sethaslike(likes.findIndex((like) => like.id === user?.uid) !== -1),
    [likes]
  );

  // useEffect(
  //   () =>
  //     setcommnya(commentnya.findIndex((like) => like.id === user?.uid) !== -1),
  //   [commentnya]
  // );

  const hpus = async (idd) => {
    await deleteDoc(doc(db, "posts", id, "comments", idd));
  };

  const hapuspost = (idd) => {
    deleteDoc(doc(db, "posts", idd));
  };

  return (
    <>
      <div className="bg-white border-[1px] rounded-[8px] ">
        <div className="flex w-full justify-between p-3 items-center">
          <div className="flex items-center gap-3">
            {profileimage ? (
              <img src={profileimage} className=" w-10 h-10 rounded-full " />
            ) : (
              <img
                src="https://i.pinimg.com/474x/65/25/a0/6525a08f1df98a2e3a545fe2ace4be47.jpg"
                className=" w-10 h-10 rounded-full "
              />
            )}

            <h6 className="text-sm">{username}</h6>
          </div>
          <button onClick={(e) => hapuspost(id)} disabled={!user}>
            <BiTrash />
          </button>
        </div>
        {/* button */}

        <img src={image} alt="" className="w-full" />
        {user && (
          <div className="p-3 flex justify-between">
            <div className="space-x-5 flex">
              {haslike ? (
                <button onClick={likepost}>
                  <FaHeart className="text-[23px] text-red-500" />
                </button>
              ) : (
                <button onClick={likepost}>
                  <FaRegHeart className="text-[23px]" />
                </button>
              )}

              <button>
                <BsChat className="text-[23px]" />
              </button>
              <button>
                <FiSend className="text-[23px]" />
              </button>
            </div>
            <BsBookmark className="text-[23px]" />
          </div>
        )}

        {/* likes */}
        {likes.length > 0 && (
          <div className="flex px-3 mt-3 gap-[2px] ">
            <p className="text-sm  font-semibold"> {likes.length} likes</p>
          </div>
        )}

        {/* caption */}

        <div className="flex gap-1 px-3  mt-1">
          <h6 className="text-sm font-semibold">{username}</h6>
          <h6 className="text-sm">{caption}</h6>
        </div>

        {/* comments */}
        {commentnya.length > 0 && (
          <div className="overflow-y-scroll scrollbar-thumb-black scrollbar-thin h-20">
            {commentnya.map((com) => (
              <div
                className="px-3 flex items-center justify-between"
                key={com.id}
              >
                <div className="flex items-center">
                  {com.data().userimage ? (
                    <img
                      src={com.data().userimage}
                      alt=""
                      className="h-7 w-7 rounded-full my-2"
                    />
                  ) : (
                    <img
                      src="https://i.pinimg.com/474x/65/25/a0/6525a08f1df98a2e3a545fe2ace4be47.jpg"
                      className="h-7 w-7 rounded-full my-2"
                    />
                  )}

                  <h6 className="text-[12px] ">
                    <span className="font-bold ml-2">
                      {com.data().username}
                    </span>{" "}
                    {com.data().comment}
                  </h6>
                </div>
                <div className="flex">
                  <Moment fromNow className="text-[9px] pr-5">
                    {com.data().timestamp?.toDate()}
                  </Moment>
                  <button
                    onClick={(e) => hpus(com.id)}
                    disabled={!user}
                    className="flex items-center"
                  >
                    <BiTrash />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* timepost */}

        <div className="flex gap-1 mt-1 mb-2 font-medium text-gray-500 px-3 text-[10px]">
          <h6>1 DAY</h6>
          AGO
        </div>

        {/* comment */}

        {user && (
          <>
            <hr />
            <div className="flex gap-2 items-center p-3  ">
              <button>
                <MdInsertEmoticon />
              </button>
              <input
                type="text"
                value={comment}
                onChange={(e) => setcomment(e.target.value)}
                className="flex-1 outline-none"
                placeholder="Add a comment..."
              />
              <button
                type="submit"
                disabled={!comment.trim()}
                onClick={postcomment}
                className="font-semibold text-blue-400"
              >
                post
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default Postingan;
