import React from "react";

import "./App.css";
import { DragDropContext, Draggable, DropResult, Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import { useRecoilState, useSetRecoilState } from "recoil";
import { boardOrderAtom, toDoAtom } from "./atom/toDo";
import DraggableCard from "./components/DraggableCard";
import Board from "./components/Board";
import { useForm } from "react-hook-form";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 56px;
  max-width: 980px;
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

  gap: 10px;
`;

const Tresh = styled.div`
  font-size: 24px;
  padding: 12px 20px;
  border-radius: 8px;
  box-shadow: none;
  cursor: pointer;
  border: none;

  background-color: ${(props) => props.theme.cardColor};

  color: ${(props) => props.theme.bgColor};
`;

const Form = styled.form`
  width: 100%;
  display: flex;
  justify-content: center;
  padding-bottom: 10px;
  input {
    width: 40%;
    font-size: 16px;
    border: 0;
    background-color: white;
    padding: 10px;
    border-radius: 5px;
    text-align: center;
    margin: 0 auto;
  }
`;
interface IForm {
  board: string;
}

// magic.placeholder
// Draggable 엘리먼트를 드래그하는 동안 position: fixed(영역을 고정시킴)를 적용합니다.
// Draggable을 드래그할 때 Droppable 리스트가 작아지는 것을 방지하기 위해 필요합니다.
// Draggable 노드의 형제로 렌더링하는 것이 좋습니다.

function App() {
  const { register, handleSubmit, setValue } = useForm<IForm>();
  const [toDos, setToDos] = useRecoilState(toDoAtom);
  const [boardOrder, setBoardOrder] = useRecoilState(boardOrderAtom);
  console.log("boardOrder", boardOrder);
  const onDragEnd = ({ destination, draggableId, source, type }: DropResult) => {
    if (!destination) return;
    if (type === "board") {
      console.log("board", destination, source, draggableId);
      setBoardOrder((prev) => {
        const boardOrderCopy = [...prev];
        boardOrderCopy.splice(source.index, 1);
        boardOrderCopy.splice(destination?.index, 0, draggableId);
        return boardOrderCopy;
      });
    } else {
      console.log("todo", destination, source, draggableId);
      if (destination.droppableId === "tresh") {
        setToDos((prev) => {
          const sourceCopy = [...prev[source.droppableId]];
          sourceCopy.splice(source.index, 1);
          return {
            ...prev,
            [source.droppableId]: sourceCopy,
          };
        });
        return;
      }
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
    }

    // setToDos((prev) => {
    //   if (!destination) return prev;
    //   const toDosCopy = [...prev];
    //   toDosCopy.splice(source.index, 1);
    //   toDosCopy.splice(destination?.index, 0, draggableId);
    //   return toDosCopy;
    // });
  };

  const onValid = (data: IForm) => {
    if (Object.keys(toDos).find((item) => item === data.board)) {
      return;
    }
    setToDos((prev) => {
      return {
        ...prev,
        [data.board]: [],
      };
    });
    setBoardOrder((prev) => [...prev, data.board]);
    setValue("board", "");
  };

  // droppable type 바로 밑에 위치하는 draggable은 바로 위 droppable의 type과 같은 droppable에만 이동 가능한 것으로 추정

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Wrapper>
        <Droppable direction="horizontal" droppableId="board" type="board">
          {(magic) => (
            <div ref={magic.innerRef} {...magic.droppableProps} style={{ padding: 50 }}>
              <Boards>
                {boardOrder.map((id, index) => {
                  return (
                    <Draggable key={id} index={index} draggableId={id}>
                      {(m) => (
                        <div ref={m.innerRef} {...m.dragHandleProps} {...m.draggableProps}>
                          <Board toDos={toDos[id]} droppableId={id} />
                        </div>
                      )}
                    </Draggable>
                  );
                })}
                {magic.placeholder}
              </Boards>
            </div>
          )}
        </Droppable>

        <Droppable type="todo" droppableId="tresh">
          {(magic) => (
            <Tresh ref={magic.innerRef} {...magic.droppableProps}>
              X
            </Tresh>
          )}
        </Droppable>
        <Form onSubmit={handleSubmit(onValid)}>
          <input {...register("board", { required: true })} placeholder={`Add Board`} />
        </Form>
      </Wrapper>
    </DragDropContext>
  );
}

export default App;
