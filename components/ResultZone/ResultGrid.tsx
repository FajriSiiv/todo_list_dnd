"use client";

import { useEffect, useState } from "react";
import { DropZone } from "../DropZone/DropzoneCard";
import { DraggableItem } from "../Card/DraggableCard";

export const ResultGrid = ({
  title,
  todo_status,
  resultTodo,
  handleDrop,
  handleDeleteTodo,
  isMounted,
}: {
  title: string;
  todo_status: string;
  resultTodo: string[];
  handleDrop: any;
  handleDeleteTodo: (todoId: string) => void;
  isMounted: any;
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
