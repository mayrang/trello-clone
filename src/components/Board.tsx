import React from "react";
import { Droppable } from "react-beautiful-dnd";
import DraggableCard from "./DraggableCard";
import styled from "styled-components";
import { IToDo, toDoAtom } from "../atom/toDo";
import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";

interface IBoardProps {
  toDos: IToDo[];
  droppableId: string;
}

const Wrapper = styled.div`
  background-color: ${(props) => props.theme.boardColor};
  padding-top: 10px;
  display: flex;
  width: 300px;
  flex-direction: column;
  align-items: center;
  div {
    flex: 1;
    width: 100%;
  }
  h2 {
    display: block;
    font-size: 18px;
    font-weight: bold;
    padding-bottom: 20px;
  }
  padding-top: 30px;
  border-radius: 5px;
  min-height: 200px;
`;

interface IAreaProps {
  isDraggingOver: boolean;
  draggingFromThisWith: boolean;
}

const Area = styled.div<IAreaProps>`
  background-color: ${(props) =>
    props.isDraggingOver ? "#dfe6e9" : props.draggingFromThisWith ? "#b2bec3" : "transparent"};
  flex-grow: 1;
  padding: 10px;
  transition: background-color 0.3s ease-in-out;
`;

const Form = styled.form`
  width: 100%;
  display: flex;
  justify-content: center;
  padding-bottom: 10px;
  input {
    width: 80%;
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
  toDo: string;
}

export default function Board({ toDos, droppableId }: IBoardProps) {
  const setToDos = useSetRecoilState(toDoAtom);
  const { register, handleSubmit, setValue } = useForm<IForm>();
  const onValid = (data: IForm) => {
    setToDos((allBoards) => {
      const newToDo = {
        text: data.toDo,
        id: Date.now(),
      };

      return {
        ...allBoards,
        [droppableId]: [newToDo, ...allBoards[droppableId]],
      };
    });
    setValue("toDo", "");
  };
  return (
    <Droppable droppableId={droppableId} type="todo">
      {(magic, snapshot) => (
        <Wrapper>
          <h2>{droppableId}</h2>
          <Form onSubmit={handleSubmit(onValid)}>
            <input {...register("toDo", { required: true })} placeholder={`Add on ${droppableId}`} />
          </Form>
          <Area
            draggingFromThisWith={Boolean(snapshot.draggingFromThisWith)}
            isDraggingOver={snapshot.isDraggingOver}
            ref={magic.innerRef}
            {...magic.droppableProps}
          >
            {toDos.map((toDo, index) => (
              <DraggableCard key={toDo.id} toDo={toDo} index={index} />
            ))}
            {magic.placeholder}
          </Area>
        </Wrapper>
      )}
    </Droppable>
  );
}
