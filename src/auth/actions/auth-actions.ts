import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { auth } from "@/auth/auth";

export const getUserSessionServer = async () => {
  const session = await auth();
  return session?.user;
};

export const signEmailPassword = async (email: string, password: string) => {
  if (!email || !password) return null;

  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) {
    const dbUser = await createUser(email, password);
    return dbUser;
  }

  if (!bcrypt.compareSync(password, user.password ?? "")) {
    return null;
  }

  return user;
};

const createUser = async (email: string, password: string) => {
  const user = await prisma.user.create({
    data: {
      email,
      password: bcrypt.hashSync(password),
      name: email.split("@")[0],
    },
  });

  return user;
};
