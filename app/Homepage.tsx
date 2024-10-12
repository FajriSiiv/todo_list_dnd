"use client";

import FormTodo from "@/components/forms/FormTodo";
import ResultTodo from "@/components/ResultTodo";
import React, { useState } from "react";

export const uniqueStoreLocalStorage = "siiv_todo_dnd";

export default function Homepage() {
  const [todo, setTodo] = useState("");
  const [todoStatus, setTodoStatus] = useState("");
  const [resultTodo, setResultTodo] = useState(() => {
    const storeTodos = localStorage.getItem(uniqueStoreLocalStorage);
    return storeTodos ? JSON.parse(storeTodos) : [];
  });

  const [todoTasks, setTodoTasks] = useState([]);

  return (
    <div className="p-10">
      <div className="">
        <h1 className="font-bold text-xl text-center pb-2">Todo-List</h1>
        <FormTodo
          setTodo={setTodo}
          setTodoStatus={setTodoStatus}
          setResultTodo={setResultTodo}
          resultTodo={resultTodo}
          todoLength={resultTodo.length}
          setTodoTasks={setTodoTasks}
          todoTasks={todoTasks}
        />
        <ResultTodo resultTodo={resultTodo} setResultTodo={setResultTodo} />
      </div>
    </div>
  );
}
