import { atom } from "recoil";

export const toDoAtom = atom({
  key: "toDo",
  default: ["a", "b", "c", "d", "e", "f"],
});
