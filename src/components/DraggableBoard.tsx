import React from "react";
import Board from "./Board";
import { IToDo } from "../atom/toDo";
import { Draggable } from "react-beautiful-dnd";

interface IDraggableBoardProps {
  toDos: IToDo[];
  droppableId: string;
  index: number;
}

export default function DraggableBoard({ toDos, droppableId, index }: IDraggableBoardProps) {
  return (
    <Draggable draggableId="" index={index}>
      {(magic) => (
        <div ref={magic.innerRef} {...magic.dragHandleProps} {...magic.draggableProps}>
          <Board key={droppableId} toDos={toDos} droppableId={droppableId} />
        </div>
      )}
    </Draggable>
  );
}
