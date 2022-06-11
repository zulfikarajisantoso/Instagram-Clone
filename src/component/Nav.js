import React, { useEffect, useState } from "react";
import insta from "../assets/insta.png";
import { BiSearch } from "react-icons/bi";
import { AiFillHome } from "react-icons/ai";
import { BsChatDots } from "react-icons/bs";
import { FiPlusSquare } from "react-icons/fi";
import { FaRegHeart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useStateValue } from "../Stateprovider";
import { useRecoilState } from "recoil";
import { cari, modalState } from "../atoms/modelAtoms";

function Nav() {
  const [{ user }, dispatch] = useStateValue();
  const [open, setopen] = useRecoilState(modalState);
  const [carcar, setcarcar] = useRecoilState(cari);
  const signout = () => {
    signOut(auth).then((res) => {
      window.location.reload();
    });
  };

  return (
    <div className="w-7/12 flex justify-between">
      <Link to="/" className="flex items-center">
        <img src={insta} alt="" className=" w-24 " />
      </Link>
      <div className="haha flex items-center " style={{ borderRadius: "8px" }}>
        <BiSearch className="ml-3 mr-1" />
        <input
          type="text"
          onChange={(e) => setcarcar(e.target.value)}
          className="inse bg-transparent  outline-none p-1"
          placeholder="Search"
        />
      </div>
      <div className="flex items-center gap-5">
        <Link to="/">
          <AiFillHome className=" text-2xl navbtn" />
        </Link>

        {user ? (
          <>
            <div className="navbtn relative">
              <button>
                <BsChatDots className=" text-2xl  " />
              </button>
              <h6 className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-red-500 flex justify-center items-center text-white animate-pulse text-xs">
                3
              </h6>
            </div>
            <button onClick={() => setopen(true)}>
              <FiPlusSquare className=" text-2xl navbtn" />
            </button>
            <button>
              <FaRegHeart className=" text-2xl navbtn" />
            </button>

            <button onClick={signout}>
              {user.photoURL ? (
                <img
                  src={user.photoURL}
                  alt=""
                  style={{ borderRadius: "50%", width: "23px", height: "23px" }}
                />
              ) : (
                <img
                  src="https://i.pinimg.com/474x/65/25/a0/6525a08f1df98a2e3a545fe2ace4be47.jpg"
                  alt=""
                  style={{ borderRadius: "50%", width: "23px", height: "23px" }}
                />
              )}
            </button>
          </>
        ) : (
          <>
            <Link to="/login">Sign In</Link>
          </>
        )}
      </div>
    </div>
  );
}

export default Nav;
