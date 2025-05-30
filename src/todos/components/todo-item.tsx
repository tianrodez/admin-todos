"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Todo } from "@prisma/client";
import { Check, CircleX } from "lucide-react";
import { startTransition, useOptimistic } from "react";
interface TodoItemProps {
  todo: Todo;
  updateTodo: (id: string, complete: boolean) => Promise<Todo | void>;
}

export function TodoItem({ todo, updateTodo }: TodoItemProps) {
  const [optimisticTodo, updateOptimisticTodo] = useOptimistic(
    todo,
    (state, newCompleteValue: boolean) => ({
      ...state,
      complete: newCompleteValue,
    })
  );

  const onUpdateTodo = async () => {
    try {
      startTransition(() => updateOptimisticTodo(!optimisticTodo.complete));
      await updateTodo(optimisticTodo.id, !optimisticTodo.complete);
    } catch (error) {
      console.log(error);
      startTransition(() => updateOptimisticTodo(!optimisticTodo.complete));
    }
  };

  return (
    <Card className="cursor-pointer hover:bg-accent" onClick={onUpdateTodo}>
      <CardContent className="flex justify-start items-center gap-3">
        {optimisticTodo.complete ? (
          <Check className="text-green-600" />
        ) : (
          <CircleX className="text-red-600" />
        )}
        <div className="text-center sm:text-left">
          {optimisticTodo.description}
        </div>
      </CardContent>
    </Card>
  );
}
