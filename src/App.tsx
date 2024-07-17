import React from "react";

import "./App.css";
import { DragDropContext, DropResult, Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import { useRecoilState } from "recoil";
import { toDoAtom } from "./atom/toDo";
import DraggableCard from "./components/DraggableCard";
import Board from "./components/Board";

const Wrapper = styled.div`
  display: flex;
  max-width: 680px;
  margin: 0 auto;
  width: 100dvw;
  justify-content: center;
  align-items: center;
  height: 100dvh;
`;
const Boards = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex: 1;
  gap: 10px;
`;

// magic.placeholder
// Draggable 엘리먼트를 드래그하는 동안 position: fixed(영역을 고정시킴)를 적용합니다.
// Draggable을 드래그할 때 Droppable 리스트가 작아지는 것을 방지하기 위해 필요합니다.
// Draggable 노드의 형제로 렌더링하는 것이 좋습니다.

function App() {
  const [toDos, setToDos] = useRecoilState(toDoAtom);
  const onDragEnd = ({ destination, draggableId, source }: DropResult) => {
    if (!destination) return;
    if (destination.droppableId === source.droppableId) {
      setToDos((prev) => {
        const sourceCopy = [...prev[source.droppableId]];
        const [taskObj] = sourceCopy.splice(source.index, 1);
        sourceCopy.splice(destination?.index, 0, taskObj);

        return {
          ...prev,
          [source.droppableId]: sourceCopy,
        };
      });
    } else {
      setToDos((prev) => {
        const sourceCopy = [...prev[source.droppableId]];
        const destinationCopy = [...prev[destination.droppableId]];
        const [taskObj] = sourceCopy.splice(source.index, 1);
        destinationCopy.splice(destination.index, 0, taskObj);

        return {
          ...prev,
          [source.droppableId]: sourceCopy,
          [destination.droppableId]: destinationCopy,
        };
      });
    }
    // setToDos((prev) => {
    //   if (!destination) return prev;
    //   const toDosCopy = [...prev];
    //   toDosCopy.splice(source.index, 1);
    //   toDosCopy.splice(destination?.index, 0, draggableId);
    //   return toDosCopy;
    // });
  };
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Wrapper>
        <Boards>
          {Object.keys(toDos).map((id) => (
            <Board key={id} toDos={toDos[id]} droppableId={id} />
          ))}
        </Boards>
      </Wrapper>
    </DragDropContext>
  );
}

export default App;
