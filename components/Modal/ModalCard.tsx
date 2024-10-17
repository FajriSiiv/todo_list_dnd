import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { TodoProps } from "@/interface";
import { Trash2 } from "lucide-react";

export function ModalCardTodo({
  children,
  todo,
  handleDelete,
}: {
  children: React.ReactNode;
  todo: TodoProps;
  handleDelete: () => void;
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{todo.todo}</DialogTitle>
          {todo.todoTasks?.map((task, index) => (
            <li key={index}>{task}</li>
          ))}
        </DialogHeader>

        <DialogFooter className="flex !justify-between w-full">
          <Button
            type="submit"
            onClick={handleDelete}
            variant="destructive"
            size="icon"
          >
            <Trash2 />
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
