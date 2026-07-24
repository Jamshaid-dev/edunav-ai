import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

const WELCOME_MESSAGE =
  "Welcome to EduNav AI! I'm your career guidance strategist. To kick things off, tell me a bit about what subjects or activities make time fly by for you?";

export async function POST() {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json({ success: false, error: "Not authenticated" }, { status: 401 });
  }

  const counselingSession = await prisma.counselingSession.create({
    data: {
      userId: session.user.id,
      messages: {
        create: {
          sender: "ASSISTANT",
          content: WELCOME_MESSAGE,
        },
      },
    },
    include: { messages: true },
  });

  return NextResponse.json({ success: true, session: counselingSession });
}

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json({ success: false, error: "Not authenticated" }, { status: 401 });
  }

  const sessions = await prisma.counselingSession.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: "desc" },
    include: { recommendation: true },
  });

  return NextResponse.json({ success: true, sessions });
}
