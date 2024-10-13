export interface TodoProps {
  todo: string;
  todo_status: "Tertunda" | "Diproses" | "Tuntas";
  todoId: number;
  todoTasks?: string[];
  todoDate: Date | string;
}
