"use client";

import FormTodo from "@/components/forms/FormTodo";
import ResultTodo from "@/components/ResultTodo";
import { TodoProps } from "@/interface";
import React, { useEffect, useState } from "react";

export const uniqueStoreLocalStorage = "siiv_todo_dnd";

export default function Homepage() {
  const [todo, setTodo] = useState("");
  const [todoStatus, setTodoStatus] = useState("");
  // const [resultTodo, setResultTodo] = useState(() => {
  //   const storeTodos = localStorage.getItem(uniqueStoreLocalStorage);
  //   return storeTodos ? JSON.parse(storeTodos) : [];
  // });

  // const [resultTodo, setResultTodo] = useState<TodoProps[]>([]);

  const [resultTodo, setResultTodo] = useState(() => {
    if (typeof window !== "undefined") {
      const storeTodos = localStorage.getItem(uniqueStoreLocalStorage);
      return storeTodos ? JSON.parse(storeTodos) : [];
    }
    return []; // Default state for server-side rendering
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
        }
      }
    }
  }, []);

  return (
    <div className="p-10">
      <div className="">
        <h1 className="font-bold text-xl text-center pb-2">Todo-List</h1>
        <FormTodo
          setTodo={setTodo}
          setTodoStatus={setTodoStatus}
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
