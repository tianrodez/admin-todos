import prisma from "@/lib/prisma";
import { TodosGrid } from "@/todos";
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

  return <TodosGrid todos={todos} />;
}
