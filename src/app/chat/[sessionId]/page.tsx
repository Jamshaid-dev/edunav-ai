import { getServerSession } from "next-auth";
import { notFound, redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import Navbar from "@/components/Navbar";
import ChatWindow from "@/components/ChatWindow";
import CareerReport from "@/components/CareerReport";

export default async function ChatSessionPage({
  params,
}: {
  params: { sessionId: string };
}) {
  const session = await getServerSession(authOptions);
  if (!session?.user) redirect("/login");

  const counselingSession = await prisma.counselingSession.findFirst({
    where: { id: params.sessionId, userId: session.user.id },
    include: {
      messages: { orderBy: { createdAt: "asc" } },
      recommendation: true,
      profile: true,
    },
  });

  if (!counselingSession) notFound();

  return (
    <div className="flex h-screen flex-col bg-base bg-grid-glow">
      <Navbar />
      <div className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-6 px-4 py-6 md:flex-row md:px-6">
        <div className="flex-1 md:max-w-2xl">
          <ChatWindow
            sessionId={counselingSession.id}
            initialMessages={counselingSession.messages.map((m) => ({
              id: m.id,
              sender: m.sender === "USER" ? "user" : "assistant",
              text: m.content,
              timestamp: m.createdAt.toISOString(),
            }))}
            isCompleted={counselingSession.status === "COMPLETED"}
          />
        </div>
        {counselingSession.recommendation.length > 0 && (
          <div className="md:w-80 md:shrink-0">
            <CareerReport
              profile={counselingSession.profile}
              recommendations={counselingSession.recommendation}
            />
          </div>
        )}
      </div>
    </div>
  );
}
