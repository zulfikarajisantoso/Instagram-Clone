import { atom } from "recoil";

export const modalState = atom({
  key: "modalState",
  default: false,
});
export const cari = atom({
  key: "cari",
  default: "",
});
