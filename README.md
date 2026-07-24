# EduNav AI

AI-powered career counselling platform — Next.js 14 (App Router) + React + PostgreSQL
(Prisma) + Claude chatbot + NextAuth login/signup + Admin panel.

## Kya kya bana hua hai

- **Landing page** — hero, 6-image gallery, features, 4-phase process, student reviews, CTA.
- **Signup / Login** — email + password (NextAuth, bcrypt-hashed passwords).
- **Student dashboard** — past sessions, "New session" button.
- **AI Chatbot** (`/chat/[sessionId]`) — 4-phase adaptive counselling engine (Discovery →
  Deep Probing → Skill & Work-Style → Synthesis) powered by Claude, saves every message to
  PostgreSQL, and generates a structured career report (scores, matched careers, majors,
  roadmap) once the conversation is deep enough.
- **Admin panel** (`/admin`) — every registered student, their sessions, and their top
  career match. Only accounts with role `ADMIN` can open this page.

## 1. Zaroori cheezein (prerequisites)

- Node.js 18.18 or newer — [nodejs.org](https://nodejs.org)
- A PostgreSQL database — sabse aasan free option: [neon.tech](https://neon.tech) ya
  [supabase.com](https://supabase.com) (dono ka free tier hai, sign up kar k connection
  string mil jaati hai)
- Ek Anthropic (Claude) API key — [console.anthropic.com](https://console.anthropic.com)
  se bana sakte hain

## 2. Project download / extract karain

Is zip ko extract karain, phir terminal us folder mein open karain:

```bash
cd edunav-ai
```

## 3. Dependencies install karain

```bash
npm install
```

## 4. Environment variables set karain

`.env.example` ko copy kar k `.env` bana lein:

```bash
cp .env.example .env
```

Phir `.env` file open kar k yeh values bharein:

- `DATABASE_URL` → apni Postgres connection string (Neon/Supabase se milegi)
- `NEXTAUTH_SECRET` → koi bhi random secret string. Generate karne ke liye:
  ```bash
  openssl rand -base64 32
  ```
- `ANTHROPIC_API_KEY` → apni Claude API key
- `SEED_ADMIN_EMAIL` / `SEED_ADMIN_PASSWORD` → apna admin login (baad mein change kar
  sakte hain)

## 5. Database schema push karain

```bash
npx prisma db push
```

## 6. Pehla admin account bana lein

```bash
npm run db:seed
```

Terminal mein jo email/password print hoga, wahi apka admin login hai — usi se
`/login` par login kar k `/admin` panel dekh sakte hain.

## 7. Website chalayein (local development)

```bash
npm run dev
```

Browser mein kholain: **http://localhost:3000**

## 8. Production ke liye deploy karna

Sabse aasan tareeqa:

1. Yeh code GitHub par push karain.
2. [vercel.com](https://vercel.com) par jaa kar us GitHub repo ko import karain.
3. Vercel ke project settings mein wohi environment variables (jo `.env` mein hain)
   add kar dein.
4. Deploy dabate hi live website mil jayegi. Database Neon/Supabase par already live
   hai to alag se kuch nahi karna.

## Notes

- Chatbot ka system prompt aur 4-phase logic `src/app/api/chat/route.ts` mein hai —
  yahan se tone, phases, ya JSON schema adjust kar sakte hain.
- Gallery ki 6 photos `src/app/page.tsx` ke `gallery` array mein hain — apni khud ki
  photos lagani hon to bas un URLs ko replace kar dein (ya `/public` folder mein image
  daal kar path change kar dein).
- Reviews `src/app/page.tsx` ke `reviews` array mein hain — real student reviews aane
  ke baad wahan update kar dein.
- Roles teen hain: `STUDENT`, `ADMIN`, `COUNSELOR`. Kisi user ko admin banane ke liye
  Prisma Studio (`npm run db:studio`) khol kar us user ki `role` field `ADMIN` kar dein.
