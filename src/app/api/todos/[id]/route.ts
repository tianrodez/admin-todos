import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const todo = await prisma.todo.findUniqueOrThrow({
      where: {
        id,
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
