import { getServerSession } from "next-auth";
import Link from "next/link";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import Navbar from "@/components/Navbar";
import { MessageCirclePlus, ChevronRight } from "lucide-react";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  const sessions = await prisma.counselingSession.findMany({
    where: { userId: session!.user.id },
    orderBy: { createdAt: "desc" },
    include: { recommendation: true },
  });

  return (
    <div className="min-h-screen bg-base bg-grid-glow">
      <Navbar />
      <div className="mx-auto max-w-5xl px-6 py-12">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="font-display text-3xl font-bold text-white">
              Welcome back, {session!.user.name?.split(" ")[0]}
            </h1>
            <p className="mt-1 text-slate-400">
              Continue a past session or start a brand new counseling conversation.
            </p>
          </div>
          <NewSessionButton />
        </div>

        {sessions.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-800 p-12 text-center">
            <p className="text-slate-400">
              You haven't started a counseling session yet. Your first conversation usually
              takes about 10 minutes.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {sessions.map((s) => (
              <Link
                key={s.id}
                href={`/chat/${s.id}`}
                className="flex items-center justify-between rounded-xl border border-slate-800 bg-surface/50 p-5 transition-colors hover:border-brand-light/50"
              >
                <div>
                  <p className="font-medium text-white">{s.title}</p>
                  <p className="mt-1 text-xs text-slate-400">
                    {new Date(s.createdAt).toLocaleDateString()} ·{" "}
                    <span
                      className={
                        s.status === "COMPLETED" ? "text-emerald-400" : "text-glow"
                      }
                    >
                      {s.status.replace("_", " ")}
                    </span>
                    {s.recommendation[0] &&
                      ` · Top match: ${s.recommendation[0].careerTitle}`}
                  </p>
                </div>
                <ChevronRight className="h-5 w-5 text-slate-500" />
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function NewSessionButton() {
  return (
    <Link
      href="/chat"
      className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-brand to-accent px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-brand/30 hover:opacity-90"
    >
      <MessageCirclePlus className="h-4 w-4" />
      New session
    </Link>
  );
}
