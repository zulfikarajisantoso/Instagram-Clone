import React from "react";
import Feed from "./Feed";
import Modal from "./Modal";
import Nav from "./Nav";

const Home = () => {
  return (
    <div className="w-full ">
      <div className="w-screen bg-white flex justify-center p-3 shadow-sm border-b z-50 sticky top-0">
        <Nav />
      </div>
      <div className="w-full flex justify-center mt-4">
        <Feed />
      </div>

      <Modal />
    </div>
  );
};

export default Home;
