import { useEffect, useState } from "react";
import styled from "styled-components";

// Todo 타입 정의
interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

// --- Styled Components ---
const PageWrapper = styled.div`
  min-height: 100vh;
  background: #f5f5f7;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding-top: 60px;
  font-family: "Pretendard", sans-serif;
`;

const Container = styled.div`
  width: 100%;
  max-width: 600px;
  padding: 20px;
`;

const Title = styled.h1`
  text-align: center;
  margin-bottom: 30px;
  font-size: 28px;
  font-weight: 700;
  color: #333;
`;

const TodoList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 18px;
`;

const TodoCard = styled.div<{ completed: boolean }>`
  padding: 18px 20px;
  border-radius: 12px;
  background-color: ${(props) => (props.completed ? "#d2f8d2" : "#ffffff")};
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  transition: 0.25s ease;
  cursor: pointer;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 6px 18px rgba(0, 0, 0, 0.15);
  }

  strong {
    font-size: 17px;
    display: block;
    margin-bottom: 8px;
    color: #222;
  }

  p {
    margin: 0;
    font-size: 15px;
    color: #555;
  }
`;

const EmptyMessage = styled.p`
  text-align: center;
  color: #777;
  font-size: 16px;
  margin-top: 40px;
`;

const LastUpdated = styled.p`
  margin-top: 35px;
  text-align: center;
  color: #666;
  font-size: 14px;
`;

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);

  const fetchTodos = async () => {
    try {
      const response = await fetch("https://dummyjson.com/todos?limit=5");
      const data = await response.json();

      const formatted: Todo[] = data.todos.map((item: any) => ({
        id: item.id,
        title: item.todo,
        completed: item.completed,
      }));

      setTodos(formatted);
      setLastUpdated(new Date().toLocaleTimeString());
    } catch (error) {
      console.error("API 호출 오류:", error);
    }
  };

  useEffect(() => {
    fetchTodos();

    const interval = setInterval(() => {
      fetchTodos();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <PageWrapper>
      <Container>
        <Title>📌 Todo 관리 프로그램</Title>

        {todos.length === 0 ? (
          <EmptyMessage>할 일이 없습니다.</EmptyMessage>
        ) : (
          <TodoList>
            {todos.map((todo) => (
              <TodoCard key={todo.id} completed={todo.completed}>
                <strong>{todo.title}</strong>
                <p>완료 여부: {todo.completed ? "완료됨" : "미완료"}</p>
              </TodoCard>
            ))}
          </TodoList>
        )}

        {lastUpdated && (
          <LastUpdated>⏱ 마지막 업데이트: {lastUpdated}</LastUpdated>
        )}
      </Container>
    </PageWrapper>
  );
}

export default App;
