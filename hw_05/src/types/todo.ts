// 할일 데이터 타입
export type Todo = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
};

// 필터 타입
export type TodoFilter = "all" | "completed" | "incomplete";
