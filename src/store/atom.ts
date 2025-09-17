// src/recoil/atoms.ts
import { atom } from "recoil";

export const sidebarVisibility = atom({
   key: "sidebarVisibility",
   default: true,
});

export const actionDrawerState = atom({
   key: "actionDrawerState",
   default: false,
});
