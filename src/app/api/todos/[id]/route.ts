import { getUserSessionServer } from "@/auth/actions/auth-actions";
import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import * as yup from "yup";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const user = await getUserSessionServer();
  if (!user) {
    return NextResponse.json("Not found", { status: 404 });
  }

  try {
    const todo = await prisma.todo.findUniqueOrThrow({
      where: {
        id,
        userId: user.id,
      },
    });

    return NextResponse.json(todo);
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2025"
    ) {
      return NextResponse.json({ message: "Todo not found!" }, { status: 404 });
    } else {
      return NextResponse.json({ message: error }, { status: 500 });
    }
  }
}

const putSchema = yup.object({
  description: yup.string().optional(),
  complete: yup.boolean().optional(),
});

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const { description, complete } = await putSchema.validate(
    await request.json()
  );
  const user = await getUserSessionServer();
  if (!user) {
    return null;
  }

  try {
    const updatedTodo = await prisma.todo.update({
      where: {
        id,
        userId: user.id,
      },
      data: { complete, description },
    });

    return NextResponse.json(updatedTodo);
  } catch (error) {
    if (error instanceof yup.ValidationError) {
      return NextResponse.json({ message: error.errors }, { status: 400 });
    } else {
      return NextResponse.json({ message: error }, { status: 500 });
    }
  }
}
