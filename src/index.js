import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { StateProvider } from "./Stateprovider";
import reducer, { initialState } from "./reducer";
import { RecoilRoot } from "recoil";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <StateProvider initialState={initialState} reducer={reducer}>
      <RecoilRoot>
        <App />
      </RecoilRoot>
    </StateProvider>
  </React.StrictMode>
);
