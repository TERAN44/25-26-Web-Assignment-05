import { useEffect, useState } from "react";

interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [lastUpdated, setLastUpdated] = useState<string>("");

  useEffect(() => {
    const loadTodos = () => {
      fetch("https://jsonplaceholder.typicode.com/todos?_limit=5")
        .then((res) => res.json())
        .then((data) => {
          setTodos(data);
          const now = new Date();
          const timeStr = now.toLocaleTimeString();
          setLastUpdated(timeStr);
        })
        .catch((err) => console.error("할 일 목록 불러오기 실패:", err));
    };

    loadTodos();
    const timer = setInterval(loadTodos, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div style={{ maxWidth: "500px", margin: "0 auto", padding: "2rem" }}>
      <h1 style={{ textAlign: "center" }}>📋 할 일 목록</h1>
      {todos.length === 0 ? (
        <p>할 일이 없습니다.</p>
      ) : (
        todos.map((todo) => (
          <div
            key={todo.id}
            style={{
              backgroundColor: todo.completed ? "#d4edda" : "#ffffff",
              border: "1px solid #ccc",
              borderRadius: "6px",
              padding: "1rem",
              marginBottom: "1rem",
              transition: "background-color 0.2s",
            }}
          >
            <h3 style={{ margin: 0 }}>{todo.title}</h3>
            <p>{todo.completed ? "완료됨" : "미완료"}</p>
          </div>
        ))
      )}
      <p style={{ textAlign: "right", color: "#666", fontSize: "0.9rem" }}>
        마지막 업데이트: {lastUpdated}
      </p>
    </div>
  );
}

export default App;
