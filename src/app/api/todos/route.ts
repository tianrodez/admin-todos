import { getUserSessionServer } from "@/auth/actions/auth-actions";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import * as yup from "yup";

export async function GET(request: NextRequest) {
  const take = Number(request.nextUrl.searchParams.get("take") ?? "10");
  const skip = Number(request.nextUrl.searchParams.get("skip") ?? "0");

  if (isNaN(take) || isNaN(skip)) {
    return NextResponse.json(
      {
        message: "Take and Skip have to be a number",
      },
      { status: 400 }
    );
  }
  const allTodos = await prisma.todo.findMany({
    take,
    skip,
    orderBy: {
      description: "asc",
    },
  });

  return NextResponse.json(allTodos);
}

const postSchema = yup.object({
  description: yup.string().required(),
  complete: yup.boolean().optional().default(false),
});

export async function POST(request: NextRequest) {
  const user = await getUserSessionServer();
  if (!user) {
    return NextResponse.json("Not Authorized", { status: 401 });
  }

  try {
    const { description, complete } = await postSchema.validate(
      await request.json()
    );

    const todo = await prisma.todo.create({
      data: {
        description,
        complete,
      },
    });

    return NextResponse.json({ todo });
  } catch (error) {
    if (error instanceof yup.ValidationError) {
      return NextResponse.json({ errors: error.errors }, { status: 400 });
    }
    return NextResponse.json(error, { status: 400 });
  }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function DELETE(request: NextRequest) {
  const user = await getUserSessionServer();
  if (!user) {
    return NextResponse.json("Not Authorized", { status: 401 });
  }

  try {
    const deletedTodos = await prisma.todo.deleteMany({
      where: {
        complete: true,
        userId: user.id,
      },
    });

    return NextResponse.json({ deletedTodos });
  } catch (error) {
    return NextResponse.json(error, { status: 400 });
  }
}
