import React from "react";
import styled from "styled-components";
import type { Todo } from "../types/todo";
import TodoItem from "./TodoItem";

type TodoListProps = {
  todos: Todo[];
};

const TodoList: React.FC<TodoListProps> = ({ todos }) => {
  if (todos.length === 0) {
    return <EmptyMessage>할 일이 없습니다.</EmptyMessage>;
  }

  return (
    <List>
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </List>
  );
};

export default TodoList;

const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const EmptyMessage = styled.p`
  margin: 12px 0;
  text-align: center;
  font-size: 14px;
  color: #6b7280;
`;
