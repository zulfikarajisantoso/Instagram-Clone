import React, { useEffect, useState } from "react";
import faker from "faker";
import { useStateValue } from "../Stateprovider";

function Stories() {
  const [userrrr, setuser] = useState([]);
  const [{ user }, dispatch] = useStateValue();

  useEffect(() => {
    const data = [...Array(20)].map((_, index) => ({
      ...faker.helpers.contextualCard(),
      id: index,
    }));

    setuser(data);
  }, []);

  return (
    <div
      className="flex overflow-x-scroll h-28 scrollbar-thin bg-white scrollbar-thumb-black p-2 border-[1px]"
      style={{ borderRadius: "8px" }}
    >
      {user && (
        <div className="flex flex-col justify-center items-center">
          {user.photoURL ? (
            <img
              src={user.photoURL}
              className=" bg-white h-11 w-11 rounded-full p-[1.5px] border-2 border-red-500 object-contain cursor-pointer  hover:scale-110 ease-out duration-200 transition-all "
            />
          ) : (
            <img
              src="https://i.pinimg.com/474x/65/25/a0/6525a08f1df98a2e3a545fe2ace4be47.jpg"
              alt="SOON"
              className=" bg-white h-11 w-11 rounded-full p-[1.5px] border-2 border-red-500 object-contain cursor-pointer  hover:scale-110 ease-out duration-200 transition-all "
            />
          )}

          <h3 className="text-center text-xs w-14 truncate">
            {user?.displayName}
          </h3>
        </div>
      )}

      {userrrr.map((pro) => (
        <div key={pro.id} className="flex flex-col justify-center items-center">
          <div className=" bg-zinc-400 h-11 w-11 rounded-full p-[1.5px] border-2 border-red-500 object-contain cursor-pointer  hover:scale-110 ease-out duration-200 transition-all " />
          <h3 className="text-center text-xs w-14 truncate">{pro.username}</h3>
        </div>
      ))}
    </div>
  );
}

export default Stories;
