"use client";

import { ModalFormTodo } from "@/components/forms/ModalFormTodo";
import ResultTodo from "@/components/ResultTodo";
import { Button } from "@/components/ui/button";
import { DialogTrigger } from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { GithubIcon } from "lucide-react";
import React, { useEffect, useState } from "react";

export const uniqueStoreLocalStorage = "siiv_todo_dnd";

export default function Homepage() {
  const [resultTodo, setResultTodo] = useState(() => {
    if (typeof window !== "undefined") {
      const storeTodos = localStorage.getItem(uniqueStoreLocalStorage);
      return storeTodos ? JSON.parse(storeTodos) : [];
    }
    return [];
  });

  const [todoTasks, setTodoTasks] = useState([]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storeTodos = localStorage.getItem(uniqueStoreLocalStorage);
      if (storeTodos) {
        try {
          const parsedTodos = JSON.parse(storeTodos);
          setResultTodo(parsedTodos);
        } catch (error) {
          setResultTodo([]);
          console.log(error);
        }
      }
    }
  }, []);

  const handleUrlGithub = () => {
    window.open("https://github.com/FajriSiiv/todo_list_dnd", "_blank");
  };

  return (
    <div className="p-10 relative">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              size="icon"
              className="fixed left-5 bottom-5"
              onClick={handleUrlGithub}
            >
              <GithubIcon />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="right">
            <p>FajriSiiv - Repository Github</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <div className="">
        <h1 className="font-bold text-xl text-center pb-2">Todo-List</h1>
        <ModalFormTodo
          setResultTodo={setResultTodo}
          resultTodo={resultTodo}
          setTodoTasks={setTodoTasks}
          todoTasks={todoTasks}
        />
        <ResultTodo resultTodo={resultTodo} setResultTodo={setResultTodo} />
      </div>
    </div>
  );
}
