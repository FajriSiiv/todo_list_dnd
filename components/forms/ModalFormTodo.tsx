import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import FormTodo from "./FormTodo";
import { Plus } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

export function ModalFormTodo({
  setResultTodo,
  resultTodo,
  setTodoTasks,
  todoTasks,
}: any) {
  return (
    <Dialog>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <DialogTrigger asChild className="fixed right-10 bottom-10">
              <Button size="icon" className="rounded-full w-14 h-14 ">
                <Plus className="w-8 h-8" />
              </Button>
            </DialogTrigger>
          </TooltipTrigger>
          <TooltipContent side="left">
            <p>Tambah Task Baru</p>
          </TooltipContent>
        </Tooltip>
        <DialogContent className="sm:max-w-[625px]">
          <DialogHeader>
            <DialogTitle className="text-2xl font-semibold">
              Tambah Todo Baru
            </DialogTitle>
          </DialogHeader>
          <FormTodo
            setResultTodo={setResultTodo}
            resultTodo={resultTodo}
            setTodoTasks={setTodoTasks}
            todoTasks={todoTasks}
          />
        </DialogContent>
      </TooltipProvider>
    </Dialog>
  );
}
