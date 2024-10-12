"use client";

import { z } from "zod";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { TodoProps } from "@/interface";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { uniqueStoreLocalStorage } from "@/app/Homepage";
import { useEffect, useState } from "react";
import { Label } from "../ui/label";
import { Trash2 } from "lucide-react";

const formSchema = z.object({
  todo: z
    .string()
    .min(3, { message: "Minimal 3 karakter" })
    .max(40, { message: "Maksimal 40 karakter" }),
  todo_status: z.enum(["Tertunda", "Diproses", "Tuntas"], {
    message: "Status tidak valid",
  }),
  todoTasks: z
    .array(z.string().min(1, { message: "Task harus diisi" }))
    .min(1, "Setidaknya satu task harus diisi"),
});

export default function FormTodo({
  setResultTodo,
  resultTodo,
  todoLength,
  setTodoTasks,
  todoTasks,
}: any) {
  const [newTask, setNewTask] = useState("");

  const form = useForm<TodoProps>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      todo: "",
      todo_status: "Tertunda",
      todoTasks: [""],
    },
  });

  const handleAddTaskTodo = () => {
    setTodoTasks((prevTasks: TodoProps[]) => [...prevTasks, newTask]);
  };

  const handleDeleteTaskTodo = (taskId: number) => {
    setTodoTasks((prevTask: TodoProps[]) =>
      prevTask.filter((_, index) => index !== taskId)
    );
  };

  const handleTaskChange = (index: number, value: string) => {
    const updatedTasks = [...todoTasks];
    updatedTasks[index] = value;
    setTodoTasks(updatedTasks);
  };

  const onSubmit = (data: TodoProps) => {
    const newTodo = {
      ...data,
      todoTasks: todoTasks.filter((task: string) => task.trim() !== ""),
      todoId: todoLength + 1,
    };

    console.log(newTodo);
    setResultTodo((prevTodos: TodoProps[]) => {
      const updateTodos = [...prevTodos, newTodo];

      localStorage.setItem(
        uniqueStoreLocalStorage,
        JSON.stringify(updateTodos)
      );

      return updateTodos;
    });
  };

  useEffect(() => {
    localStorage.setItem(uniqueStoreLocalStorage, JSON.stringify(resultTodo));
  }, [resultTodo]);

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="todo"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Judul Todo</FormLabel>
              <FormControl>
                <Input placeholder="Judul Todo" {...field} />
              </FormControl>
              <FormMessage>{form.formState.errors.todo?.message}</FormMessage>
            </FormItem>
          )}
        />

        <div className="grid gap-y-2 py-2 mt-4">
          <Label>Todo</Label>
          {todoTasks.map((task: any, index: number) => (
            <div className="flex gap-x-2" key={index}>
              <Input
                {...form.register(`todoTasks.${index}`)}
                placeholder={`Tugas ${index + 1}`}
                value={task}
                onChange={(e) => handleTaskChange(index, e.target.value)}
              />
              <Button
                onClick={() => handleDeleteTaskTodo(index)}
                type="button"
                size="icon"
                variant="destructive"
              >
                <Trash2 />
              </Button>
            </div>
          ))}
          <Button onClick={handleAddTaskTodo}>Tambah Task</Button>
        </div>

        <FormField
          control={form.control}
          name="todo_status"
          render={({ field }) => (
            <FormItem className="pt-4">
              <FormLabel>Status</FormLabel>
              <FormControl>
                <Select
                  onValueChange={(value) => field.onChange(value)}
                  defaultValue="Tertunda"
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="Tertunda">Tertunda</SelectItem>
                      <SelectItem value="Diproses">Diproses</SelectItem>
                      <SelectItem value="Tuntas">Tuntas</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage>
                {form.formState.errors.todo_status?.message}
              </FormMessage>
            </FormItem>
          )}
        />
        <Button type="submit" className="btn-submit mt-10">
          Submit
        </Button>
      </form>
    </FormProvider>
  );
}
