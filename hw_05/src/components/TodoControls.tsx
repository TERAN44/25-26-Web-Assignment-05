import React from "react";
import styled from "styled-components";
import type { TodoFilter } from "../types/todo";

type TodoControlsProps = {
  filter: TodoFilter;
  onChangeFilter: (filter: TodoFilter) => void;
  autoRefresh: boolean;
  onToggleAutoRefresh: () => void;
  onRefresh: () => void;
  isLoading: boolean;
};

const TodoControls: React.FC<TodoControlsProps> = ({
  filter,
  onChangeFilter,
  autoRefresh,
  onToggleAutoRefresh,
  onRefresh,
  isLoading,
}) => {
  return (
    <ControlsWrapper>
      <LeftGroup>
        <FilterButton
          type="button"
          active={filter === "all"}
          onClick={() => onChangeFilter("all")}
        >
          전체
        </FilterButton>
        <FilterButton
          type="button"
          active={filter === "completed"}
          onClick={() => onChangeFilter("completed")}
        >
          완료만
        </FilterButton>
        <FilterButton
          type="button"
          active={filter === "incomplete"}
          onClick={() => onChangeFilter("incomplete")}
        >
          미완료만
        </FilterButton>
      </LeftGroup>

      <RightGroup>
        <ActionButton type="button" onClick={onToggleAutoRefresh}>
          {autoRefresh ? "자동 갱신 끄기" : "자동 갱신 켜기"}
        </ActionButton>
        <ActionButton type="button" onClick={onRefresh} disabled={isLoading}>
          {isLoading ? "불러오는 중..." : "새로고침"}
        </ActionButton>
      </RightGroup>
    </ControlsWrapper>
  );
};

export default TodoControls;

const ControlsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  align-items: center;
  justify-content: space-between;
`;

const LeftGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
`;

const RightGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
`;

const FilterButton = styled.button<{ active?: boolean }>`
  padding: 5px 10px;
  border-radius: 999px;
  border: 1px solid ${({ active }) => (active ? "#2563eb" : "#d1d5db")};
  background-color: ${({ active }) => (active ? "#2563eb" : "#ffffff")};
  color: ${({ active }) => (active ? "#ffffff" : "#4b5563")};
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.15s ease, color 0.15s ease,
    border-color 0.15s ease, transform 0.08s ease, box-shadow 0.08s ease;

  &:hover {
    background-color: ${({ active }) => (active ? "#1d4ed8" : "#f3f4f6")};
    box-shadow: 0 3px 8px rgba(0, 0, 0, 0.04);
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
    box-shadow: none;
  }

  &:disabled {
    opacity: 0.6;
    cursor: default;
    transform: none;
    box-shadow: none;
  }
`;

const ActionButton = styled.button`
  padding: 5px 10px;
  border-radius: 999px;
  border: none;
  background-color: #2563eb;
  color: #ffffff;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.15s ease, transform 0.08s ease,
    box-shadow 0.08s ease;

  &:hover {
    background-color: #1d4ed8;
    box-shadow: 0 4px 10px rgba(37, 99, 235, 0.3);
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
    box-shadow: none;
  }

  &:disabled {
    opacity: 0.6;
    cursor: default;
    box-shadow: none;
    transform: none;
  }
`;
