
🗳️  Polling App

A full-stack polling application built with Next.js 14, Supabase, Shadcn UI, and Tailwind CSS.
Users can create polls, vote on polls, share them via links or QR codes, and view real-time results.

---

## 🚀 Features

* 🔑 User Authentication – Login & registration via Supabase Auth.
* 🗳️ Poll Management – Create, view, edit, and delete polls.
* 📊 Vote Tracking – Vote on polls and view real-time results.
* 🔗 Shareable Poll Links – Unique URLs for every poll.
* 📱 QR Code Generation– Instantly generate a QR code to share your poll.
* 🎨 Modern UI – Built with [Shadcn UI](https://ui.shadcn.com/) & Tailwind CSS.
* ☁️ Deployed on Vercel for blazing-fast performance.

---


## 🤖 Built with AI 
<p align="left"> <img src="https://img.shields.io/badge/AI%20Code%20Review-CodeRabbit-blue?style=for-the-badge" alt="CodeRabbit" /> <img src="https://img.shields.io/badge/AI%20IDE-Cursor-purple?style=for-the-badge" alt="Cursor" /> <img src="https://img.shields.io/badge/AI%20Assistant-ChatGPT-green?style=for-the-badge" alt="ChatGPT" /> <img src="https://img.shields.io/badge/AI%20Pair%20Programming-GitHub%20Copilot-black?style=for-the-badge" alt="GitHub Copilot" /> </p>


## 🛠️ Tech Stack
<p>
  <img src="https://img.shields.io/badge/Next.js-Framework-black?style=flat-square" alt="Next.js" />
  <img src="https://img.shields.io/badge/TypeScript-Language-blue?style=flat-square" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Supabase-DB%20%26%20Auth-22c55e?style=flat-square" alt="Supabase" />
  <img src="https://img.shields.io/badge/Tailwind%20CSS-Styling-06b6d4?style=flat-square" alt="Tailwind" />
  <img src="https://img.shields.io/badge/shadcn--ui-Components-0ea5e9?style=flat-square" alt="shadcn/ui" />
  <img src="https://img.shields.io/badge/Vercel-Hosting-000000?style=flat-square" alt="Vercel" />
</p>
  
---

> Note: AI suggestions were reviewed by a human before merge. See `rules.md` for the project’s AI usage rule 
>This project was developed  for ALX "AI for Developers"  and was built entirely with AI-powered assistance tools.


## 📂 Project Structure

```
polling-app/
├── app/
│   ├── page.tsx                  # Home page
│   ├── auth/
│   │   └── layout.tsx            # Auth layout
│   ├── poll/
│   │   └── [id]/                 # Dynamic poll route
│   │       └── page.tsx         # Individual poll view
│
├── components/
│   ├── polls/
│   │   ├── Poll.tsx              # Poll display and voting
│   │   ├── PollShare.tsx         # QR code generator for sharing
│   │   └── PollResultChart.tsx   # Chart.js results visualization
│
├── lib/
│   ├── polls.ts                  # Poll creation logic
│   ├── supabaseClient.ts         # Supabase client setup
│   └── utils/
│       └── generateQrCode.ts     # QR code generation utility
│
├── styles/
│   └── globals.css               # Global styles (Tailwind, etc.)
│
├── __tests__/
│   ├── polls.test.ts             # Unit tests for createPoll
│   └── Poll.test.tsx             # Component tests for Poll UI
│
├── public/                       # Static assets
│
├── jest.config.js                # Jest configuration
├── jest.env.js                   # Custom test environment setup
├── tsconfig.json                 # TypeScript config with path aliases
├── .coderabbit/                  # AI-powered review + release notes
│   └── config.yaml
├── .env                          # Runtime environment variables
├── .env.test                     # Test environment variables
├── package.json                  # Scripts, dependencies

```
🧩 Project Rules

📜 Read  Project Rules
 to understand coding patterns, folder structure, and Supabase integration guidelines.

---

## ⚡ Getting Started

### 1. Clone the Repository

```bash
git clone 
cd polling-app
```

---

### 2. Install Dependencies

```bash
npm install
```

---
### 3. Set Up Environment Variables

Create a `.env.local` file in the root directory and add your Supabase credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

```


---

## 4. Initialize Shadcn UI

If you haven't already initialized Shadcn:

```bash
npx shadcn@latest init
```

Then add the components we use:

```bash
npx shadcn@latest add button card input form
```

---

### 5. Run the Development Server

```bash
npm run dev
```

Now visit:
🔗 [http://localhost:3000](http://localhost:3000) → You’ll be automatically redirected to `/polls`.

---

### 6. Build for Production

```bash
npm run dev
```

---

## 🌐 Deployment

Deploy easily to Vercel:

```bash
npm install -g vercel
vercel
```

---

## 🧪 Usage Examples

### ✅ Creating a Poll
1. Navigate to `/polls/create`
2. Enter your question and options
3. Submit to generate a shareable poll link

### 🗳️ Voting on a Poll
1. Visit `/polls/[poll-id]`
2. Select your preferred option
3. Submit your vote to see real-time results

### 🔗 Sharing a Poll
- Copy the poll URL or scan the QR code
- Share with friends or embed in your site


This project is licensed under the MIT License.

---
