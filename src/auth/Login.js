import React, { useState } from "react";
import hp from "../assets/hp.png";
import insta from "../assets/insta.png";
import app from "../assets/app.png";
import play from "../assets/play.png";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, provider } from "../firebase";
import { useStateValue } from "../Stateprovider";
import { actionTypes } from "../reducer";

function Login() {
  const navigate = useNavigate();
  const [{}, dispatch] = useStateValue();
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  const signin = () => {
    signInWithPopup(auth, provider).then((res) => {
      dispatch({
        type: actionTypes.SET_USER,
        user: res.user,
      });

      navigate("/");
    });
  };

  const singinmanual = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password).then((res) => {
      dispatch({
        type: actionTypes.SET_USER,
        user: res.user,
      });
      navigate("/");
    });
  };

  return (
    <div className="main h-screen items-center  flex justify-center">
      <div className="w-4/5  h-full grid items-center grid-cols-2 p-5">
        <div className="">
          <img src={hp} alt="instag" style={{ height: "30rem" }} />
        </div>
        <div className="flex flex-col gap-y-3 items-center">
          <div className="bg-white border-2 flex flex-col  pt-10 px-10 pb-5 items-center w-3/5 h-3/5">
            <img src={insta} alt="" className="mb-5" />
            <form
              action=""
              className="input flex flex-col w-full gap-y-3 "
              onSubmit={singinmanual}
            >
              <input
                type="email"
                name="email"
                onChange={(e) => setemail(e.target.value)}
                placeholder="Phone number, username or email address "
                className="formlogin w-full h-10 inp"
              />
              <input
                type="password"
                name="password"
                onChange={(e) => setpassword(e.target.value)}
                placeholder="Password"
                className="formlogin outline-none w-full h-10  inp"
              />
              <button
                type="submit"
                className="w-full text-white font-semibold py-1"
                style={{ background: "#0095f6", borderRadius: "4px" }}
              >
                Log in
              </button>
            </form>

            {/* Or Section */}

            <div className="flex gap-3 my-5 items-center">
              <div className="border-b-2  w-24"></div>
              <h6 className=" text-gray-400 font-medium ">OR</h6>
              <div className="border-b-2  w-24"></div>
            </div>

            {/* Login with GOogole */}

            <button className="flex gap-1 items-center" onClick={signin}>
              <FcGoogle className=" text-xl " />
              <h4 className=" font-semibold text-gray-600 ">
                Log in with Google{" "}
              </h4>
            </button>
            <button className="mt-3 text-xs text-gray-600">
              Forgotten your password?
            </button>
          </div>

          {/* dont have acoount */}
          <div
            className="w-3/5 h-3/5 bg-white border-2 flex justify-center py-5  "
            style={{ fontSize: "13px" }}
          >
            <h5>
              Don't have account?{" "}
              <Link to="/signup" className=" ml-1 text-blue-600 font-bold ">
                Sign Up
              </Link>
            </h5>
          </div>
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

export default Login;
