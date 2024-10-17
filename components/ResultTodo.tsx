"use client";

import React, { useEffect, useRef, useState } from "react";

import { DndProvider, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { TodoProps } from "@/interface";
import { uniqueStoreLocalStorage } from "@/app/Homepage";

import { DraggableItem } from "./Card/DraggableCard";
import { DropZone } from "./DropZone/DropzoneCard";

export const ItemType = "ITEM";

export default function ResultTodo({
  resultTodo,
  setResultTodo,
}: {
  resultTodo: any;
  setResultTodo: any;
}) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleDeleteTodo = (todoId: any) => {
    setResultTodo((prevTodos: TodoProps[]) => {
      const updateTodos = prevTodos.filter((todo) => todo.todoId !== todoId);

      localStorage.setItem(
        uniqueStoreLocalStorage,
        JSON.stringify(updateTodos)
      );

      return updateTodos;
    });
  };

  const handleDrop = (id: number, newStatus: string) => {
    setResultTodo((prevTodos: TodoProps[]) =>
      prevTodos.map((todo: TodoProps) =>
        todo.todoId === id ? { ...todo, todo_status: newStatus } : todo
      )
    );
  };

  const ResultGrid = ({
    title,
    todo_status,
    resultTodo,
    handleDrop,
  }: {
    title: string;
    todo_status: string;
    resultTodo: string[];
    handleDrop: any;
  }) => {
    return (
      <DropZone onDropTodo={handleDrop} todo_status={todo_status}>
        <div>
          <h2 className="text-lg font-bold">{title}</h2>
          <div className="grid gap-2 pt-4">
            {isMounted &&
              resultTodo
                .filter((item: any) => item.todo_status === todo_status)
                .map((todo: any, index) => (
                  <DraggableItem
                    item={todo}
                    handleDeleteTodo={handleDeleteTodo}
                    key={index}
                  />
                ))}
          </div>
        </div>
      </DropZone>
    );
  };

  useEffect(() => {
    localStorage.setItem(uniqueStoreLocalStorage, JSON.stringify(resultTodo));
  }, [resultTodo]);

  return (
    <div className="grid md:grid-cols-3 md:grid-rows-1 mt-10 gap-10 grid-rows-3 grid-cols-1">
      <DndProvider backend={HTML5Backend}>
        <ResultGrid
          title="Tertunda"
          todo_status="Tertunda"
          resultTodo={resultTodo}
          handleDrop={handleDrop}
        />
        <ResultGrid
          title="Diproses"
          todo_status="Diproses"
          resultTodo={resultTodo}
          handleDrop={handleDrop}
        />
        <ResultGrid
          title="Tuntas"
          todo_status="Tuntas"
          resultTodo={resultTodo}
          handleDrop={handleDrop}
        />
      </DndProvider>
    </div>
  );
}
