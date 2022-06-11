import { signOut } from "firebase/auth";
import React from "react";
import { auth } from "../firebase";
import { useStateValue } from "../Stateprovider";

function Miniprofile() {
  const [{ user }, dispatch] = useStateValue();

  const signout = () => {
    signOut(auth).then((res) => {
      window.location.reload();
    });
  };

  console.log(user);

  return (
    <div className="p-5">
      <div className=" flex justify-between items-center">
        <div className="flex space-x-2   items-center">
          {user.photoURL ? (
            <img
              src={user?.photoURL}
              alt=""
              className=" h-10 w-10 rounded-full "
            />
          ) : (
            <img
              src="https://i.pinimg.com/474x/65/25/a0/6525a08f1df98a2e3a545fe2ace4be47.jpg"
              alt=""
              className=" h-10 w-10 rounded-full "
            />
          )}

          <div className="flex flex-col justify-center">
            <h5 className="text-sm font-semibold">{user?.displayName}</h5>
            <h6 className="text-xs">My Instagram</h6>
          </div>
        </div>
        <button
          onClick={signout}
          className=" text-xs font-semibold text-blue-500 "
        >
          Sign Out
        </button>
      </div>
    </div>
  );
}

export default Miniprofile;
