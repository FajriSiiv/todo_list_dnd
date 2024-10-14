"use client";

import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { TodoProps } from "@/interface";
import { uniqueStoreLocalStorage } from "@/app/Homepage";
import { Button } from "./ui/button";
import { format, formatDistanceToNow } from "date-fns";
import { ModalCardTodo } from "./Modal/ModalCard";
import { id } from "date-fns/locale";
import { Badge } from "./ui/badge";

const ItemType = "ITEM";

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

  const DraggableItem = ({ item }: { item: TodoProps }) => {
    const [{ isDragging }, drag] = useDrag(() => ({
      type: ItemType,
      item: { todoId: item.todoId },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }));

    return (
      <div ref={drag}>
        <ModalCardTodo
          todo={item}
          handleDelete={() => handleDeleteTodo(item.todoId)}
        >
          <Card
            className={`p-4 grid gap-2 rounded-sm ${
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
            {/* <CardFooter>
              <Button onClick={() => handleDeleteTodo(item.todoId)}>
                Delete
              </Button>
            </CardFooter> */}
          </Card>
        </ModalCardTodo>
      </div>
    );
  };

  const DropZone = ({ children, onDropTodo, todo_status }: any) => {
    const [, drop] = useDrop(() => ({
      accept: ItemType,
      drop: (item: TodoProps) => {
        onDropTodo(item.todoId, todo_status);
      },
    }));

    return (
      <div ref={drop} style={{ padding: "20px", border: "1px dashed gray" }}>
        {children}
      </div>
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
                .map((todo: any) => <DraggableItem item={todo} />)}
          </div>
        </div>
      </DropZone>
    );
  };

  useEffect(() => {
    localStorage.setItem(uniqueStoreLocalStorage, JSON.stringify(resultTodo));
  }, [resultTodo]);

  return (
    <div className="grid grid-cols-3 mt-10 gap-10">
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
