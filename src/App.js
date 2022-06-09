import Login from "./auth/Login";

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Registrasi from "./auth/Registrasi";
import { useState } from "react";
import Home from "./component/Home";

function App() {
  const [user, setuser] = useState(false);

  // if (user) {
  //   <Navigate to="/" />;
  // }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Registrasi />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
