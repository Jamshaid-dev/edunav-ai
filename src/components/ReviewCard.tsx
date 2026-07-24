import { Star } from "lucide-react";

export default function ReviewCard({
  name,
  role,
  quote,
  avatarSeed,
}: {
  name: string;
  role: string;
  quote: string;
  avatarSeed: string;
}) {
  return (
    <div className="flex h-full flex-col justify-between rounded-2xl border border-slate-800 bg-surface/60 p-6 shadow-lg">
      <div>
        <div className="mb-3 flex gap-0.5 text-glow">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className="h-4 w-4 fill-current" />
          ))}
        </div>
        <p className="text-sm leading-relaxed text-slate-300">"{quote}"</p>
      </div>
      <div className="mt-6 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-tr from-brand to-glow text-sm font-semibold text-white">
          {avatarSeed}
        </div>
        <div>
          <p className="text-sm font-semibold text-white">{name}</p>
          <p className="text-xs text-slate-400">{role}</p>
        </div>
      </div>
    </div>
  );
}
