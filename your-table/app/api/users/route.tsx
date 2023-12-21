import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const name = searchParams.get("username");
  const pass = searchParams.get("password");

  const user = await prisma.user.findUnique({
    where: {
      name: name ?? undefined,
      password: pass ?? undefined,
    },
  });

  if (!user) return NextResponse.json(null, { status: 404 });

  return NextResponse.json(user);
}
