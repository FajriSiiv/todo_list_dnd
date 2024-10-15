export interface TodoProps {
  todo: string;
  todo_status: "Tertunda" | "Diproses" | "Tuntas";
  todoId: number | string;
  todoTasks?: string[];
  todoDate: Date;
}
