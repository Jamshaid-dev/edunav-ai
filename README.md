# EduNav AI

AI-powered career counselling platform — Next.js 14 (App Router) + React + PostgreSQL
(Prisma) + Claude chatbot + NextAuth login/signup + Admin panel.

## what we made

- **Landing page** — hero, 6-image gallery, features, 4-phase process, student reviews, CTA.
- **Signup / Login** — email + password (NextAuth, bcrypt-hashed passwords).
- **Student dashboard** — past sessions, "New session" button.
- **AI Chatbot** (`/chat/[sessionId]`) — 4-phase adaptive counselling engine (Discovery →
  Deep Probing → Skill & Work-Style → Synthesis) powered by Claude, saves every message to
  PostgreSQL, and generates a structured career report (scores, matched careers, majors,
  roadmap) once the conversation is deep enough.
- **Admin panel** (`/admin`) — every registered student, their sessions, and their top
  career match. Only accounts with role `ADMIN` can open this page.

 prerequisites 

- Node.js 18.18 or newer — [nodejs.org](https://nodejs.org)
- A PostgreSQL database — sabse aasan free option: [neon.tech](https://neon.tech) ya
  [supabase.com](https://supabase.com) (dono ka free tier hai, sign up kar k connection
  string mil jaati hai)
- Ek Anthropic (Claude) API key — [console.anthropic.com](https://console.anthropic.com)
 

- Roles teen hain: `STUDENT`, `ADMIN`, `COUNSELOR`. Kisi user ko admin banane ke liye
  Prisma Studio (`npm run db:studio`) khol kar us user ki `role` field `ADMIN` kar dein.
