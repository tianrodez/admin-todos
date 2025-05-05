import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

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

export async function POST(request: NextRequest) {
  const body = await request.json();
  const todo = await prisma.todo.create({
    data: body,
  });

  return NextResponse.json(todo);
}
