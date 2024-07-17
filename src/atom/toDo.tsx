import { atom } from "recoil";

export interface IToDo {
  id: number;
  text: string;
}

interface IToDoAtom {
  [key: string]: IToDo[];
}

export const toDoAtom = atom<IToDoAtom>({
  key: "toDo",
  default: {
    "To Do": [],
    Doing: [],
    Done: [],
  },
});
