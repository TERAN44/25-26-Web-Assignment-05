import React from "react";
import styled from "styled-components";
import type { Todo } from "../types/todo";

type TodoItemProps = {
  todo: Todo;
};

const TodoItem: React.FC<TodoItemProps> = ({ todo }) => {
  return (
    <TodoCard completed={todo.completed}>
      <TodoTitle>{todo.title}</TodoTitle>
      <TodoMeta completed={todo.completed}>
        <StatusDot completed={todo.completed} />
        <StatusText>{todo.completed ? "완료" : "미완료"}</StatusText>
      </TodoMeta>
    </TodoCard>
  );
};

export default TodoItem;

const TodoCard = styled.div<{ completed: boolean }>`
  padding: 12px 14px;
  border-radius: 12px;
  border: 1px solid ${({ completed }) => (completed ? "#059669" : "#e5e7eb")};
  background-color: ${({ completed }) => (completed ? "#dcfce7" : "#ffffff")};
  display: flex;
  flex-direction: column;
  gap: 4px;
  transition: transform 0.12s ease, box-shadow 0.12s ease,
    background-color 0.12s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 18px rgba(0, 0, 0, 0.06);
    background-color: ${({ completed }) => (completed ? "#bbf7d0" : "#f9fafb")};
  }
`;

const TodoTitle = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: #111827;
`;

const TodoMeta = styled.div<{ completed: boolean }>`
  font-size: 12px;
  font-weight: 500;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  color: ${({ completed }) => (completed ? "#047857" : "#6b7280")};
`;

const StatusDot = styled.span<{ completed: boolean }>`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  display: inline-block;
  background-color: ${({ completed }) => (completed ? "#16a34a" : "#9ca3af")};
`;

const StatusText = styled.span`
  font-weight: 500;
`;
