import { useDrop } from "react-dnd";
import { ItemType } from "../ResultTodo";
import { TodoProps } from "@/interface";
import { useRef } from "react";

export const DropZone = ({
  children,
  onDropTodo,
  todo_status,
}: {
  children: React.ReactNode;
  onDropTodo: (todoId: any, todo_status: string) => void;
  todo_status: string;
}) => {
  const [, drop] = useDrop(() => ({
    accept: ItemType,
    drop: (item: TodoProps) => {
      onDropTodo(item.todoId, todo_status);
    },
  }));
  const ref = useRef<HTMLDivElement | null>(null);

  drop(ref);
  return (
    <div ref={ref} style={{ padding: "20px", border: "1px dashed gray" }}>
      {children}
    </div>
  );
};
