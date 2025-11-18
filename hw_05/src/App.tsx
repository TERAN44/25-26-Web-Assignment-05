import React, { useCallback, useEffect, useMemo, useState } from "react";
import styled, { createGlobalStyle } from "styled-components";
import TodoList from "./components/TodoList";
import TodoControls from "./components/TodoControls";
import type { Todo, TodoFilter } from "./types/todo";

const API_URL = "https://jsonplaceholder.typicode.com/todos?_limit=5";

const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [filter, setFilter] = useState<TodoFilter>("all");

  const fetchTodos = useCallback(async () => {
    try {
      setIsLoading(true);
      const res = await fetch(API_URL);
      if (!res.ok) {
        throw new Error("네트워크 응답이 정상이 아닙니다.");
      }
      const data: Todo[] = await res.json();
      setTodos(data);
      setLastUpdated(new Date().toLocaleTimeString());
    } catch (error) {
      console.error("Todo 데이터를 불러오는 중 오류 발생:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // 최초 1회 호출
  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  // 5초마다 자동 갱신
  useEffect(() => {
    if (!autoRefresh) return;

    const intervalId = window.setInterval(() => {
      fetchTodos();
    }, 5000);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [autoRefresh, fetchTodos]);

  // 필터 적용 모습
  const filteredTodos = useMemo(() => {
    switch (filter) {
      case "completed":
        return todos.filter((t) => t.completed);
      case "incomplete":
        return todos.filter((t) => !t.completed);
      default:
        return todos;
    }
  }, [todos, filter]);

  const handleToggleAutoRefresh = () => {
    setAutoRefresh((prev) => !prev);
  };

  const handleChangeFilter = (nextFilter: TodoFilter) => {
    setFilter(nextFilter);
  };

  return (
    <>
      <GlobalStyle />
      <AppContainer>
        <Card>
          <Header>
            <Title>Todo 정보 관리</Title>
          </Header>

          <TodoControls
            filter={filter}
            onChangeFilter={handleChangeFilter}
            autoRefresh={autoRefresh}
            onToggleAutoRefresh={handleToggleAutoRefresh}
            onRefresh={fetchTodos}
            isLoading={isLoading}
          />

          {isLoading && <LoadingText>불러오는 중...</LoadingText>}

          <TodoList todos={filteredTodos} />

          <Footer>
            <span>
              마지막 업데이트:{" "}
              {lastUpdated ? lastUpdated : "아직 업데이트 기록 없음"}
            </span>
            <span>
              전체 {todos.length}개
              {filter !== "all" && ` (필터 적용: ${filteredTodos.length}개)`}
            </span>
          </Footer>
        </Card>
      </AppContainer>
    </>
  );
};

export default App;

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }
  body {
    margin: 0;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
    background-color: #f4f5f7;
  }
`;

const AppContainer = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Card = styled.div`
  width: 480px;
  max-width: 90vw;
  background-color: #ffffff;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  padding: 24px 24px 18px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
`;

const Title = styled.h1`
  margin: 0;
  font-size: 20px;
  font-weight: 700;
  color: #222;
`;

const LoadingText = styled.p`
  margin: 0;
  font-size: 13px;
  color: #6b7280;
`;

const Footer = styled.footer`
  margin-top: 10px;
  padding-top: 10px;
  border-top: 1px solid #e5e7eb;
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  color: #9ca3af;
`;
