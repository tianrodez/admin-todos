"use server";

import { getUserSessionServer } from "@/auth/actions/auth-actions";
import prisma from "@/lib/prisma";
import { Todo } from "@prisma/client";
import { revalidatePath } from "next/cache";

export const toggleTodo = async (
  id: string,
  complete: boolean
): Promise<Todo> => {
  const user = await getUserSessionServer();
  const todo = await prisma.todo.findFirst({ where: { id, userId: user?.id } });

  if (!todo) {
    throw `Todo con id ${id} no encontrado`;
  }

  const updatedTodo = await prisma.todo.update({
    where: { id },
    data: { complete },
  });

  revalidatePath("/dashboard/server-todos");
  return updatedTodo;
};

export const addTodo = async (description: string) => {
  const user = await getUserSessionServer();
  try {
    const todo = await prisma.todo.create({
      data: {
        description,
        userId: user?.id,
      },
    });
    revalidatePath("/dashboard/server-todos");

    return todo;
  } catch (error) {
    return {
      message: error,
    };
  }
};

export const deleteCompleted = async (): Promise<{
  status: string;
  message: string;
}> => {
  const user = await getUserSessionServer();
  await prisma.todo.deleteMany({
    where: {
      complete: true,
      userId: user?.id,
    },
  });

  revalidatePath("/dashboard/server-todos");

  return {
    status: "Success",
    message: "All the completed todos were deleted.",
  };
};
