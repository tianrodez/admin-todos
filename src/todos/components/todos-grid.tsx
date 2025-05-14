"use client";

import { Todo } from "@prisma/client";
import React from "react";
import { TodoItem } from "./todo-item";

import * as api from "@/todos/helpers/todos";

interface TodosGridProps {
  todos?: Todo[];
}

export function TodosGrid({ todos = [] }: TodosGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-2">
      {todos.map((todo) => {
        return (
          <TodoItem key={todo.id} todo={todo} updateTodo={api.updateTodo} />
        );
      })}
    </div>
  );
}
