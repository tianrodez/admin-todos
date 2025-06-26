export const dynamic = "force-dynamic";
export const revalidate = 0;

import { getUserSessionServer } from "@/auth/actions/auth-actions";
import prisma from "@/lib/prisma";
import { DeleteTodos, NewTodo, TodosGrid } from "@/todos";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Server Todos list",
  description: "A list of user's current todos",
};

export default async function ServerTodosPage() {
  const user = await getUserSessionServer();

  const todos = await prisma.todo.findMany({
    where: {
      userId: user?.id,
    },
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
