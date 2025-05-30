export const dynamic = "force-dynamic";
export const revalidate = 0;

import prisma from "@/lib/prisma";
import { DeleteTodos, NewTodo, TodosGrid } from "@/todos";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Todos list",
  description: "A list of user's current todos",
};

export default async function RestTodosPage() {
  const todos = await prisma.todo.findMany({
    orderBy: {
      description: "asc",
    },
  });

  return (
    <>
      <div className="flex gap-2 items-center justify-end">
        <NewTodo />
        <DeleteTodos />
      </div>
      <TodosGrid todos={todos} />
    </>
  );
}
