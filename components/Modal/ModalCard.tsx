import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
          {todo.todoTasks?.map((task) => (
            <li>{task}</li>
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
          <Button type="submit" className="bg-green-600">
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
