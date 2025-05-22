"use client";

import { Todo } from "@prisma/client";
import React from "react";
import { TodoItem } from "./todo-item";
import { useRouter } from "next/navigation";
import { toggleTodo } from "../actions/todo-actions";

interface TodosGridProps {
  todos?: Todo[];
}

export function TodosGrid({ todos = [] }: TodosGridProps) {
  const router = useRouter();

  // const toggleTodo = async (id: string, complete: boolean) => {
  //   const updatedTodo = await todoApi.updateTodo(id, complete);
  //   console.log(updatedTodo);
  //   router.refresh();
  // };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-2">
      {todos.map((todo) => {
        return <TodoItem key={todo.id} todo={todo} updateTodo={toggleTodo} />;
      })}
    </div>
  );
}
