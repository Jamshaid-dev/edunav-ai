import Link from "next/link";
import { Compass } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-surface/40">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-4">
          <div>
            <div className="flex items-center gap-2">
              <div className="rounded-lg bg-gradient-to-tr from-brand to-glow p-1.5">
                <Compass className="h-5 w-5 text-white" />
              </div>
              <span className="font-display text-lg font-semibold text-white">EduNav AI</span>
            </div>
            <p className="mt-3 text-sm text-slate-400">
              A 24/7 AI career strategist for students choosing what to study and where to go
              next.
            </p>
          </div>

          <div>
            <h4 className="mb-3 text-sm font-semibold text-white">Product</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><Link href="/#features" className="hover:text-white">Features</Link></li>
              <li><Link href="/#how-it-works" className="hover:text-white">How it works</Link></li>
              <li><Link href="/#reviews" className="hover:text-white">Student reviews</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-3 text-sm font-semibold text-white">Account</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><Link href="/signup" className="hover:text-white">Create account</Link></li>
              <li><Link href="/login" className="hover:text-white">Log in</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-3 text-sm font-semibold text-white">Contact</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>support@edunav.ai</li>
              <li>Mon – Fri, 9am – 6pm</li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-white/5 pt-6 text-center text-xs text-slate-500">
          © {new Date().getFullYear()} EduNav AI. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
