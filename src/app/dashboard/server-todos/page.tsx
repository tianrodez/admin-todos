import prisma from "@/lib/prisma";
import { DeleteTodo, NewTodo, TodosGrid } from "@/todos";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Server Todos list",
  description: "A list of user's current todos",
};

export default async function ServerTodosPage() {
  const todos = await prisma.todo.findMany({
    orderBy: {
      description: "asc",
    },
  });

  return (
    <>
      <div className="flex gap-2 items-center justify-end">
        <NewTodo />
        <DeleteTodo />
      </div>
      <TodosGrid todos={todos} />
    </>
  );
}
