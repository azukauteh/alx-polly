
Polling App with QR Code Sharing

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

## 🛠️ Tech Stack

| Technology       | Purpose                      |
| ---------------- | ---------------------------- |
| Next.js 14       | Full-stack React framework   |
| Supabase         | Database & Authentication    |
| Shadcn UI        | Reusable UI components       |
| Tailwind CSS      Styling & responsive layouts |
| QRCode.react     | QR code generation           |
| ypeScript        | Type safety                  |
| Vercel           | Deployment                   |

---

## 📂 Project Structure

```
polling-app/
├── app/

│   ├── layout.tsx   # Root layout with Navbar
         
│   ├── page.tsx  # Redirects to /polls
            
│   ├── polls/

│   │   ├── page.tsx   # Dashboard page (lists polls)
        
│   │   ├── create/page.tsx  # Create a new poll
   
│   │   └── [id]/page.tsx  # Poll details & voting page
   
│   ├── auth/

│   │   ├── login/page.tsx    # Login page


│   │   └── register/page.tsx # Registration page
│
├── components/

│   ├── navbar.tsx    # Navigation bar
        
│   └── ui/                   # Shadcn UI components
│
├── lib/
│   ├── supabase.ts   # Supabase client
        
│   ├── utils.ts              # Helper functions
│
├── public/    # Static assets
               
├── styles/   # Global styles
                
├── .env.example    # Environment variables template
         
├── package.json

├── tsconfig.json

└── README.md

```

---

## ⚡ Getting Started

### 1. Clone the Repository**

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

🤖 Built 100% with AI Assistance

This project was developed as part of the "AI for Developers" program and was built entirely with AI-powered assistance using tools like:

| 🛠️ Tool            | 💡 Purpose   Contribution                                                                                              |
| ------------------- | --------------------------------------------------------------------------------------------------------------------- |
| ChatGPT (GPT-5)   | 🧠 Acted as my AI coding partner — helped plan architecture, debug issues, and write scalable Next.js components. |

| Shadcn UI       | 🎨 Assisted in generating beautiful, responsive UI components quickly with minimal manual tweaking.               |

| Supabase AI     | 🗄️ Handled database modeling, authentication, and API
 integration with AI-generated SQL and setup guidance.      |
 
| Cursor AI       | ⚡ Provided real-time AI-powered coding suggestions, refactoring, and context-aware completions.                   |

| Vercel AI       | 🚀 Guided the automated deployment process to ensure smooth hosting and CI/CD setup.                              |


## 📜 License

This project is licensed under the MIT License.

---
