import React from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";
import { IToDo } from "../atom/toDo";

interface IDraggableCardProps {
  toDo: IToDo;
  index: number;
}

const Card = styled.div<{ isDragging: boolean }>`
  background-color: ${(props) => (props.isDragging ? "#74b9ff" : props.theme.cardColor)};
  border-radius: 5px;
  padding: 10px 10px;
  margin-bottom: 5px;

  box-shadow: ${(props) => (props.isDragging ? "0px 2px 5px rgba(0, 0, 0, 0.1)" : "none")};
`;

function DraggableCard({ toDo, index }: IDraggableCardProps) {
  return (
    <Draggable index={index} draggableId={toDo.id + ""}>
      {(magic, snapshot) => (
        <Card
          isDragging={snapshot.isDragging}
          ref={magic.innerRef}
          {...magic.dragHandleProps}
          {...magic.draggableProps}
        >
          {toDo.text}
        </Card>
      )}
    </Draggable>
  );
}

export default React.memo(DraggableCard);
