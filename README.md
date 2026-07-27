# EduNav AI — Smart AI-Powered Career Counseling Platform

EduNav AI is a modern, full-stack web application designed to provide interactive, personalized academic and career counseling for students. By leveraging AI language models, the platform analyzes user goals, educational backgrounds, and interests to generate structured career roadmaps and real-time guidance.

---

## Key Features

- **Interactive AI Counseling:** Real-time conversational interface tailored to student queries across technology, medical, business, and creative disciplines.
- **3D Hero Visualizations:** Interactive 3D graphics built using Three.js to deliver a modern visual experience.
- **Scroll Reveal Animations:** Smooth micro-interactions and scroll-triggered animations powered by Framer Motion.
- **Structured Roadmaps:** Automated career pathway generation aligned with industry trends.
- **Fully Responsive & Dark-Themed:** Optimized for seamless performance across desktop, tablet, and mobile browsers.

---

## Tech Stack

- **Framework:** [Next.js](https://nextjs.org/) (App Router, React 18/19)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **3D & Graphics:** [Three.js](https://threejs.org/)
- **Animations:** [Framer Motion](https://www.framer.com/motion/)
- **AI Integration:** OpenAI API Integration

---

## Project Structure

```text
edunav-ai/
├── public/                # Static assets and media files
├── src/
│   ├── app/               # Next.js App Router pages and layouts
│   │   ├── chat/          # AI Counseling session route
│   │   ├── page.tsx       # Main landing page with 3D canvas and animations
│   │   └── layout.tsx     # Global layout configuration
│   └── components/        # Reusable UI components
│       └── Hero3DCanvas.tsx # Three.js 3D model component
├── .gitignore             # Ignored files and environment variables
├── package.json           # Project dependencies and scripts
└── README.md              # Project documentation
