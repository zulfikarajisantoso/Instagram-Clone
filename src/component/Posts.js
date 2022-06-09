import React, { useState, useEffect } from "react";

import { db } from "../firebase";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";

import Postingan from "./Postingan";

function Posts() {
  const [post, setpost] = useState([]);

  useEffect(
    () =>
      onSnapshot(
        query(collection(db, "posts"), orderBy("timestamp", "desc")),
        (snapshot) => {
          setpost(snapshot.docs);
        }
      ),
    [db]
  );

  return (
    <div className="space-y-2">
      {post.map((du) => (
        <Postingan
          key={du.id}
          id={du.id}
          profileimage={du.data().profileimage}
          image={du.data().image}
          username={du.data().username}
          caption={du.data().caption}
        />
      ))}
    </div>
  );
}

export default Posts;
