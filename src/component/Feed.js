import React from "react";
import Posts from "./Posts";
import Stories from "./Stories";
import Miniprofile from "./Miniprofile";
import Suges from "./Suges";
import { useStateValue } from "../Stateprovider";

function Feed() {
  const [{ user }, dispatch] = useStateValue();

  return (
    <div
      className={`w-8/12 grid grid-cols-2 md:grid-cols-3 md:max-w-3xl ${
        !user && "!grid-cols-1 "
      }`}
    >
      <div className="flex flex-col gap-5 col-span-2">
        <Stories />
        <Posts />
      </div>
      {user && (
        <div className={`md:col-span-1 flex-none `}>
          <Miniprofile />
          <Suges />
        </div>
      )}
    </div>
  );
}

export default Feed;
