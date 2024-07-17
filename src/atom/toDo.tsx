import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

export interface IToDo {
  id: number;
  text: string;
}

interface IToDoAtom {
  [key: string]: IToDo[];
}

const { persistAtom } = recoilPersist({
  key: "persist-todo",
  storage: localStorage,
});

export const toDoAtom = atom<IToDoAtom>({
  key: "toDo",
  default: {
    "To Do": [],
    Doing: [],
    Done: [],
  },
  effects_UNSTABLE: [persistAtom],
});
export const boardOrderAtom = atom<string[]>({
  key: "board_order",
  default: ["To Do", "Doing", "Done"],
  effects_UNSTABLE: [persistAtom],
});
