import { TodoProps } from "@/interface";
import { ItemType } from "../ResultTodo";
import { useDrag } from "react-dnd";
import { ModalCardTodo } from "../Modal/ModalCard";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Badge } from "../ui/badge";
import { formatDistanceToNow } from "date-fns";
import { id } from "date-fns/locale";
import { useRef } from "react";

export const DraggableItem = ({
  item,
  handleDeleteTodo,
}: {
  item: TodoProps;
  handleDeleteTodo: (todoId: any) => void;
}) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemType,
    item: { todoId: item.todoId },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  const ref = useRef(null);
  drag(ref);
  return (
    <div ref={ref}>
      <ModalCardTodo
        todo={item}
        handleDelete={() => handleDeleteTodo(item.todoId)}
      >
        <Card
          className={`p-4 grid gap-2 rounded-sm cursor-pointer ${
            isDragging ? "bg-emerald-500/20" : ""
          }`}
        >
          <CardHeader className="p-0 flex flex-row justify-between items-center">
            <CardTitle>{item.todo}</CardTitle>

            <Badge
              variant={
                item.todo_status === "Tertunda"
                  ? "destructive"
                  : item.todo_status === "Diproses"
                  ? "secondary"
                  : "default"
              }
            >
              {item.todo_status}
            </Badge>
          </CardHeader>
          <CardContent className="p-0">
            <CardDescription>
              {formatDistanceToNow(item.todoDate, {
                includeSeconds: true,
                addSuffix: true,
                locale: id,
              })}
            </CardDescription>
          </CardContent>
        </Card>
      </ModalCardTodo>
    </div>
  );
};
