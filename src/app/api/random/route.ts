import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  try {
    const messages =
      await prisma.$queryRaw`SELECT * FROM messages ORDER BY RANDOM() LIMIT 1`;
    return NextResponse.json({ messages });
  } catch (err) {
    return NextResponse.json({ err }, { status: 400 });
  }
}
