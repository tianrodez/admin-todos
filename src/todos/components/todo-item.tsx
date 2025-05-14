"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Todo } from "@prisma/client";
import { Check, CircleX } from "lucide-react";
import React from "react";

interface TodoItemProps {
  todo: Todo;
  updateTodo: (id: string, complete: boolean) => Promise<Todo | void>;
}

export function TodoItem({ todo, updateTodo }: TodoItemProps) {
  return (
    <Card
      className="cursor-pointer hover:bg-accent"
      onClick={() => updateTodo(todo.id, !todo.complete)}
    >
      <CardContent className="flex justify-start items-center gap-3">
        {todo.complete ? (
          <Check className="text-green-600" />
        ) : (
          <CircleX className="text-red-600" />
        )}
        <div className="text-center sm:text-left">{todo.description}</div>
      </CardContent>
    </Card>
  );
}
