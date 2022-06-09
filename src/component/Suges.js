import faker from "faker";
import React, { useEffect, useState } from "react";

function Suges() {
  const [datanya, setdatanya] = useState([]);

  useEffect(() => {
    const ambil = [...Array(5)].map((_, i) => ({
      ...faker.helpers.contextualCard(),
      id: i,
    }));

    setdatanya(ambil);
  }, []);

  return (
    <div className="p-3">
      <div className="flex justify-between items-center">
        <h6 className=" text-xs text-gray-400 font-semibold">
          Suggestions for you
        </h6>
        <button className="text-xs font-medium ">See All</button>
      </div>
      <div className="flex flex-col justify-between items-center mt-3 space-y-3">
        {datanya.map((du) => (
          <div key={du.id} className=" flex justify-between w-full  ">
            <div className="flex space-x-2  items-center ">
              <img
                src="https://blue.kumparan.com/image/upload/fl_progressive,fl_lossy,c_fill,q_auto:best,w_640/v1613716919/qitbrk73uvz8s19qqxso.png"
                alt=""
                className=" h-10 w-10 rounded-full "
              />
              <div className="flex flex-col justify-center">
                <h5 className="text-sm font-semibold">Laperrman</h5>
                <h6 className="text-[10px] font-semibold">
                  Instagram recomended
                </h6>
              </div>
            </div>
            <button className=" flex items-center text-end text-xs font-semibold text-blue-500 ">
              Follow
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Suges;
