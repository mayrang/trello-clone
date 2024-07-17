import React from "react";

import "./App.css";
import { DragDropContext, DropResult, Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import { useRecoilState } from "recoil";
import { toDoAtom } from "./atom/toDo";
import DraggableCard from "./components/DraggableCard";

const Wrapper = styled.div`
  display: flex;
  max-width: 480px;
  margin: 0 auto;
  width: 100%;
  justify-content: center;
  align-items: center;
  height: 100dvh;
`;
const Boards = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: repeat(1, 1fr);
`;

const Board = styled.div`
  background-color: ${(props) => props.theme.boardColor};
  padding: 20px 10px;
  padding-top: 30px;
  border-radius: 5px;
  min-height: 200px;
`;

// magic.placeholder
// Draggable 엘리먼트를 드래그하는 동안 position: fixed(영역을 고정시킴)를 적용합니다.
// Draggable을 드래그할 때 Droppable 리스트가 작아지는 것을 방지하기 위해 필요합니다.
// Draggable 노드의 형제로 렌더링하는 것이 좋습니다.

function App() {
  const [toDos, setToDos] = useRecoilState(toDoAtom);
  const onDragEnd = ({ destination, draggableId, source }: DropResult) => {
    setToDos((prev) => {
      if (!destination) return prev;
      const toDosCopy = [...prev];
      toDosCopy.splice(source.index, 1);
      toDosCopy.splice(destination?.index, 0, draggableId);
      return toDosCopy;
    });
  };
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Wrapper>
        <Boards>
          <Droppable droppableId="list">
            {(magic) => (
              <Board ref={magic.innerRef} {...magic.droppableProps}>
                {toDos.map((toDo, index) => (
                  <DraggableCard key={toDo} toDo={toDo} index={index} />
                ))}
                {magic.placeholder}
              </Board>
            )}
          </Droppable>
        </Boards>
      </Wrapper>
    </DragDropContext>
  );
}

export default App;
