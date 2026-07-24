"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { Compass, Loader2 } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      setError("Invalid email or password.");
      setLoading(false);
      return;
    }

    router.push("/dashboard");
    router.refresh();
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-base bg-grid-glow px-6 py-12">
      <div className="w-full max-w-md rounded-2xl border border-slate-800 bg-surface/70 p-8 shadow-2xl backdrop-blur">
        <Link href="/" className="mb-6 flex items-center justify-center gap-2">
          <div className="rounded-lg bg-gradient-to-tr from-brand to-glow p-1.5">
            <Compass className="h-5 w-5 text-white" />
          </div>
          <span className="font-display text-lg font-semibold text-white">EduNav AI</span>
        </Link>

        <h1 className="mb-1 text-center font-display text-2xl font-bold text-white">
          Welcome back
        </h1>
        <p className="mb-6 text-center text-sm text-slate-400">
          Log in to continue your counseling session.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1.5 block text-xs font-medium text-slate-400">Email</label>
            <input
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl border border-slate-800 bg-base px-4 py-3 text-sm text-white placeholder-slate-500 focus:border-brand-light focus:outline-none focus:ring-1 focus:ring-brand-light"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-medium text-slate-400">Password</label>
            <input
              required
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-xl border border-slate-800 bg-base px-4 py-3 text-sm text-white placeholder-slate-500 focus:border-brand-light focus:outline-none focus:ring-1 focus:ring-brand-light"
              placeholder="••••••••"
            />
          </div>

          {error && <p className="text-sm text-red-400">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-brand to-accent px-4 py-3.5 text-sm font-semibold text-white shadow-lg shadow-brand/30 transition-opacity hover:opacity-90 disabled:opacity-60"
          >
            {loading && <Loader2 className="h-4 w-4 animate-spin" />}
            Log in
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-400">
          Don't have an account?{" "}
          <Link href="/signup" className="text-glow hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
