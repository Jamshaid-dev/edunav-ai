import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

const WELCOME_MESSAGE =
  "Welcome to EduNav AI! I'm your career guidance strategist. To kick things off, tell me a bit about what subjects or activities make time fly by for you?";

export default async function NewChatPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user) redirect("/login");

  const counselingSession = await prisma.counselingSession.create({
    data: {
      userId: session.user.id,
      messages: {
        create: { sender: "ASSISTANT", content: WELCOME_MESSAGE },
      },
    },
  });

  redirect(`/chat/${counselingSession.id}`);
}
