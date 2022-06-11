import React, { useState } from "react";
import app from "../assets/app.png";
import play from "../assets/play.png";
import insta from "../assets/insta.png";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useStateValue } from "../Stateprovider";
import { auth } from "../firebase";
import { actionTypes } from "../reducer";

function Registrasi() {
  const [password, setpassword] = useState("");
  const [username, setusername] = useState("");
  const [email, setemail] = useState("");
  const [{}, dispatch] = useStateValue();
  const navigate = useNavigate();

  const regis = (e) => {
    e.preventDefault();

    createUserWithEmailAndPassword(auth, email, password).then((res) => {
      dispatch({
        type: actionTypes.SET_USER,
        user: res.user,
      });
      updateProfile(auth.currentUser, {
        displayName: username,
      });
      navigate("/login");
    });
  };

  return (
    <div className="  items-center  flex justify-center">
      <div className="w-6/12  h-full p-5">
        <div className="flex flex-col items-center gap-5 justify-center ">
          <div className="bg-white border-2 flex flex-col  pt-10 px-10 pb-10 items-center w-3/5 h-3/5">
            <img src={insta} alt="" />

            <h6 className="font-semibold text-center text-gray-400 my-3">
              Sign up to see photos and videos <br /> from your friends.
            </h6>

            {/* button google */}
            <button className="flex gap-1 my-5 items-center">
              <FcGoogle className=" text-xl " />
              <h4 className=" font-semibold text-gray-600 ">
                Log in with Google{" "}
              </h4>
            </button>

            {/* or section */}
            <div className="flex gap-3 my-5 items-center">
              <div className="border-b-2  w-24"></div>
              <h6 className=" text-gray-400 font-medium ">OR</h6>
              <div className="border-b-2  w-24"></div>
            </div>

            {/* form */}
            <form
              action=""
              className="input flex flex-col w-full gap-y-3 "
              onSubmit={regis}
            >
              <input
                type="text"
                name="username"
                onChange={(e) => setusername(e.target.value)}
                placeholder="Username"
                className="formlogin outline-none w-full h-10 inp "
              />
              <input
                type="email"
                name="email"
                onChange={(e) => setemail(e.target.value)}
                placeholder="Phone number, username or email address"
                className="formlogin outline-none w-full h-10  inp"
              />
              <input
                type="password"
                name="password"
                onChange={(e) => setpassword(e.target.value)}
                placeholder="Password"
                className="formlogin outline-none w-full h-10 inp"
              />

              <h6 className="text-xs text-center my-5 text-gray-400 ">
                By signing up, you agree to our Terms, Data Policy <br /> and
                Cookie Policy.
              </h6>

              <button
                type="submit"
                className="w-full text-white font-semibold py-1"
                style={{ background: "#0095f6", borderRadius: "4px" }}
              >
                Sign up
              </button>
            </form>
          </div>
          {/*  Have an acoount */}
          <div
            className="w-3/5 h-3/5 bg-white border-2 flex justify-center py-4  "
            style={{ fontSize: "13px" }}
          >
            <h5>
              have account?
              <Link to="/login" className=" ml-1 text-blue-600 font-bold ">
                Log In
              </Link>
            </h5>
          </div>

          {/* get app */}
          <h6 className="my-5 text-center">Get the app.</h6>
          <div className="flex gap-5">
            <img src={app} alt="" width={100} />
            <img src={play} alt="" width={100} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Registrasi;
