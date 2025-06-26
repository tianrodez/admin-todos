import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  await prisma.todo.deleteMany();
  await prisma.user.deleteMany();

  await prisma.user.create({
    data: {
      email: "testing@gmail.com",
      password: bcrypt.hashSync("123456"),
      roles: ["admin", "client", "super-user"],
      todos: {
        create: [
          { description: "Check universities programs", complete: true },
          { description: "Research scholarship opportunities" },
          { description: "Update resume for internship applications" },
          { description: "Complete coding assignment for portfolio" },
          { description: "Schedule meeting with academic advisor" },
          { description: "Review feedback on project proposal" },
        ],
      },
    },
  });

  return NextResponse.json({
    message: `Seed completed`,
    method: request.method,
  });
}
