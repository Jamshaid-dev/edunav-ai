import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import Navbar from "@/components/Navbar";
import { Users, MessagesSquare, CheckCircle2 } from "lucide-react";

export default async function AdminPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user || session.user.role !== "ADMIN") redirect("/dashboard");

  const students = await prisma.user.findMany({
    where: { role: "STUDENT" },
    orderBy: { createdAt: "desc" },
    include: {
      sessions: {
        select: {
          id: true,
          status: true,
          createdAt: true,
          recommendation: { select: { careerTitle: true, matchPercentage: true } },
        },
        orderBy: { createdAt: "desc" },
      },
    },
  });

  const totalSessions = students.reduce((sum, s) => sum + s.sessions.length, 0);
  const completedSessions = students.reduce(
    (sum, s) => sum + s.sessions.filter((sess) => sess.status === "COMPLETED").length,
    0
  );

  return (
    <div className="min-h-screen bg-base bg-grid-glow">
      <Navbar />
      <div className="mx-auto max-w-6xl px-6 py-12">
        <h1 className="font-display text-3xl font-bold text-white">Admin Panel</h1>
        <p className="mt-1 text-slate-400">Registered students and their counseling activity.</p>

        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <StatCard icon={Users} label="Total students" value={students.length} />
          <StatCard icon={MessagesSquare} label="Total sessions" value={totalSessions} />
          <StatCard
            icon={CheckCircle2}
            label="Completed reports"
            value={completedSessions}
          />
        </div>

        <div className="mt-10 overflow-hidden rounded-2xl border border-slate-800">
          <table className="w-full text-left text-sm">
            <thead className="bg-surface/80 text-xs uppercase tracking-wide text-slate-400">
              <tr>
                <th className="px-5 py-3">Student</th>
                <th className="px-5 py-3">Email</th>
                <th className="px-5 py-3">Level</th>
                <th className="px-5 py-3">Sessions</th>
                <th className="px-5 py-3">Top recommendation</th>
                <th className="px-5 py-3">Joined</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {students.map((s) => {
                const topRec = s.sessions
                  .flatMap((sess) => sess.recommendation)
                  .sort((a, b) => b.matchPercentage - a.matchPercentage)[0];
                return (
                  <tr key={s.id} className="bg-base/40 hover:bg-surface/40">
                    <td className="px-5 py-4 font-medium text-white">{s.fullName}</td>
                    <td className="px-5 py-4 text-slate-400">{s.email}</td>
                    <td className="px-5 py-4 text-slate-400">{s.academicLevel || "—"}</td>
                    <td className="px-5 py-4 text-slate-400">{s.sessions.length}</td>
                    <td className="px-5 py-4 text-slate-400">
                      {topRec
                        ? `${topRec.careerTitle} (${Math.round(topRec.matchPercentage)}%)`
                        : "—"}
                    </td>
                    <td className="px-5 py-4 text-slate-500">
                      {new Date(s.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                );
              })}
              {students.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-5 py-8 text-center text-slate-500">
                    No students have signed up yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function StatCard({
  icon: Icon,
  label,
  value,
}: {
  icon: any;
  label: string;
  value: number;
}) {
  return (
    <div className="flex items-center gap-4 rounded-2xl border border-slate-800 bg-surface/50 p-5">
      <div className="rounded-xl bg-gradient-to-tr from-brand/20 to-glow/20 p-3">
        <Icon className="h-5 w-5 text-glow" />
      </div>
      <div>
        <p className="text-2xl font-bold text-white">{value}</p>
        <p className="text-xs text-slate-400">{label}</p>
      </div>
    </div>
  );
}
