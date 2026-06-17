# TEN Platform Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build TEN, a bilingual (DE/EN) entrepreneurship platform with feed, communities, Q&A, investor area, and private chat.

**Architecture:** Next.js 14 App Router frontend with Supabase as the backend (PostgreSQL, Auth, Realtime). Features are organized into route groups: `(auth)` for login/register, `(main)` for all authenticated pages.

**Tech Stack:** Next.js 14, Tailwind CSS, shadcn/ui, Supabase (Auth + DB + Realtime), next-intl, Vitest (unit tests), Playwright (E2E), Vercel (hosting)

---

## File Structure

```
TEN/
├── app/
│   ├── (auth)/
│   │   ├── auth/page.tsx          # Login/Register page
│   │   └── auth/callback/route.ts # OAuth callback
│   ├── (main)/
│   │   ├── layout.tsx             # Authenticated layout with Navbar + Sidebar
│   │   ├── feed/page.tsx
│   │   ├── communities/page.tsx
│   │   ├── communities/[slug]/page.tsx
│   │   ├── communities/[slug]/[group]/page.tsx
│   │   ├── qa/page.tsx
│   │   ├── qa/[room]/page.tsx
│   │   ├── investors/page.tsx
│   │   ├── investors/[id]/page.tsx
│   │   ├── pitch/new/page.tsx
│   │   ├── pitch/[id]/page.tsx
│   │   ├── chat/page.tsx
│   │   ├── chat/[conversationId]/page.tsx
│   │   ├── profile/[username]/page.tsx
│   │   └── settings/page.tsx
│   ├── layout.tsx                 # Root layout (fonts, providers)
│   └── page.tsx                   # Landing page
├── components/
│   ├── ui/                        # shadcn/ui components
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   ├── Sidebar.tsx
│   │   └── LanguageSwitcher.tsx
│   ├── auth/
│   │   └── AuthForm.tsx
│   ├── feed/
│   │   ├── PostCard.tsx
│   │   ├── PostForm.tsx
│   │   └── FeedList.tsx
│   ├── communities/
│   │   ├── CommunityCard.tsx
│   │   ├── CommunityForm.tsx
│   │   └── MemberList.tsx
│   ├── qa/
│   │   ├── RoomCard.tsx
│   │   ├── QuestionCard.tsx
│   │   ├── QuestionForm.tsx
│   │   └── AnswerCard.tsx
│   ├── investors/
│   │   ├── InvestorCard.tsx
│   │   ├── PitchCard.tsx
│   │   └── PitchForm.tsx
│   ├── chat/
│   │   ├── ConversationList.tsx
│   │   ├── MessageBubble.tsx
│   │   └── ChatInput.tsx
│   └── profile/
│       └── ProfileHeader.tsx
├── lib/
│   ├── supabase/
│   │   ├── client.ts              # Browser client
│   │   ├── server.ts              # Server client (RSC/actions)
│   │   └── types.ts               # Generated DB types
│   └── utils.ts
├── messages/
│   ├── de.json
│   └── en.json
├── middleware.ts                  # Auth + i18n routing
├── supabase/
│   └── migrations/
│       ├── 001_profiles.sql
│       ├── 002_posts.sql
│       ├── 003_communities.sql
│       ├── 004_qa.sql
│       ├── 005_investors.sql
│       └── 006_chat.sql
└── tests/
    ├── unit/
    └── e2e/
```

---

## Phase 1: Project Setup, Auth, Profile, Layout, i18n

### Task 1: Initialize Next.js project

**Files:**
- Create: `package.json`, `next.config.ts`, `tailwind.config.ts`, `tsconfig.json`

- [ ] **Step 1: Create Next.js app**

```bash
cd /Users/andreaspechtl/TEN
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir=false --import-alias="@/*"
```

Expected: Project scaffolded with App Router.

- [ ] **Step 2: Install dependencies**

```bash
npm install @supabase/supabase-js @supabase/ssr next-intl
npm install -D vitest @vitejs/plugin-react @playwright/test
npx shadcn@latest init
```

When shadcn asks: style=Default, base color=Slate, CSS variables=yes.

- [ ] **Step 3: Install shadcn components needed for Phase 1**

```bash
npx shadcn@latest add button input label card avatar dropdown-menu separator
```

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "chore: initialize Next.js project with Supabase and shadcn"
```

---

### Task 2: Supabase setup and database migrations

**Files:**
- Create: `supabase/migrations/001_profiles.sql`
- Create: `lib/supabase/client.ts`
- Create: `lib/supabase/server.ts`
- Create: `.env.local` (not committed)
- Create: `.env.example`

- [ ] **Step 1: Create Supabase project**

Go to https://supabase.com → New project → name: "ten-platform"
Copy: Project URL and anon key.

- [ ] **Step 2: Create `.env.local`**

```bash
cat > .env.local << 'EOF'
NEXT_PUBLIC_SUPABASE_URL=your_project_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
EOF
```

- [ ] **Step 3: Create `.env.example`**

```bash
cat > .env.example << 'EOF'
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
EOF
```

- [ ] **Step 4: Create Supabase browser client**

Create `lib/supabase/client.ts`:

```typescript
import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}
```

- [ ] **Step 5: Create Supabase server client**

Create `lib/supabase/server.ts`:

```typescript
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export async function createClient() {
  const cookieStore = await cookies()
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() { return cookieStore.getAll() },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          } catch {}
        },
      },
    }
  )
}
```

- [ ] **Step 6: Create profiles migration**

Create `supabase/migrations/001_profiles.sql`:

```sql
create type user_role as enum ('member', 'experienced', 'investor', 'admin');

create table profiles (
  id uuid references auth.users on delete cascade primary key,
  username text unique not null,
  full_name text,
  avatar_url text,
  bio text,
  role user_role not null default 'member',
  created_at timestamptz not null default now()
);

alter table profiles enable row level security;

create policy "Public profiles are viewable by everyone"
  on profiles for select using (true);

create policy "Users can update their own profile"
  on profiles for update using (auth.uid() = id);

create function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = ''
as $$
begin
  insert into public.profiles (id, username, full_name, avatar_url)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'preferred_username', split_part(new.email, '@', 1)),
    new.raw_user_meta_data->>'full_name',
    new.raw_user_meta_data->>'avatar_url'
  );
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
```

- [ ] **Step 7: Run migration in Supabase SQL editor**

Go to Supabase Dashboard → SQL Editor → paste content of `001_profiles.sql` → Run.

- [ ] **Step 8: Commit**

```bash
git add supabase/ lib/ .env.example
git commit -m "feat: add Supabase clients and profiles migration"
```

---

### Task 3: Authentication middleware and OAuth callback

**Files:**
- Create: `middleware.ts`
- Create: `app/(auth)/auth/callback/route.ts`

- [ ] **Step 1: Create middleware**

Create `middleware.ts`:

```typescript
import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() { return request.cookies.getAll() },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({ request })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  const { data: { user } } = await supabase.auth.getUser()

  const isAuthPage = request.nextUrl.pathname.startsWith('/auth')
  const isPublicPage = ['/', '/investors', '/qa'].some(p =>
    request.nextUrl.pathname === p || request.nextUrl.pathname.startsWith(p + '/')
  )

  if (!user && !isAuthPage && !isPublicPage) {
    return NextResponse.redirect(new URL('/auth', request.url))
  }

  if (user && isAuthPage) {
    return NextResponse.redirect(new URL('/feed', request.url))
  }

  return supabaseResponse
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)'],
}
```

- [ ] **Step 2: Create OAuth callback route**

Create `app/(auth)/auth/callback/route.ts`:

```typescript
import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  const next = searchParams.get('next') ?? '/feed'

  if (code) {
    const supabase = await createClient()
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    if (!error) {
      return NextResponse.redirect(`${origin}${next}`)
    }
  }

  return NextResponse.redirect(`${origin}/auth?error=auth_failed`)
}
```

- [ ] **Step 3: Enable Google OAuth in Supabase**

Go to Supabase Dashboard → Authentication → Providers → Google → Enable.
Add callback URL: `https://your-project.supabase.co/auth/v1/callback`
Configure Google OAuth app at console.cloud.google.com (credentials → OAuth 2.0).

- [ ] **Step 4: Commit**

```bash
git add middleware.ts app/
git commit -m "feat: add auth middleware and OAuth callback"
```

---

### Task 4: Auth page (Login/Register UI)

**Files:**
- Create: `app/(auth)/auth/page.tsx`
- Create: `components/auth/AuthForm.tsx`

- [ ] **Step 1: Create AuthForm component**

Create `components/auth/AuthForm.tsx`:

```typescript
'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

type Mode = 'login' | 'register'

export function AuthForm() {
  const [mode, setMode] = useState<Mode>('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const supabase = createClient()

  async function handleEmailAuth(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setMessage('')

    const { error } = mode === 'login'
      ? await supabase.auth.signInWithPassword({ email, password })
      : await supabase.auth.signUp({ email, password })

    if (error) {
      setMessage(error.message)
    } else if (mode === 'register') {
      setMessage('Check your email to confirm your account.')
    }
    setLoading(false)
  }

  async function handleGoogleAuth() {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: `${window.location.origin}/auth/callback` },
    })
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>{mode === 'login' ? 'Anmelden' : 'Registrieren'}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Button onClick={handleGoogleAuth} variant="outline" className="w-full">
          Mit Google fortfahren
        </Button>
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">oder</span>
          </div>
        </div>
        <form onSubmit={handleEmailAuth} className="space-y-3">
          <div>
            <Label htmlFor="email">E-Mail</Label>
            <Input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} required />
          </div>
          <div>
            <Label htmlFor="password">Passwort</Label>
            <Input id="password" type="password" value={password} onChange={e => setPassword(e.target.value)} required />
          </div>
          {message && <p className="text-sm text-muted-foreground">{message}</p>}
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? 'Lädt...' : mode === 'login' ? 'Anmelden' : 'Registrieren'}
          </Button>
        </form>
        <button
          onClick={() => setMode(mode === 'login' ? 'register' : 'login')}
          className="text-sm text-primary hover:underline w-full text-center"
        >
          {mode === 'login' ? 'Noch kein Konto? Registrieren' : 'Bereits Mitglied? Anmelden'}
        </button>
      </CardContent>
    </Card>
  )
}
```

- [ ] **Step 2: Create auth page**

Create `app/(auth)/auth/page.tsx`:

```typescript
import { AuthForm } from '@/components/auth/AuthForm'

export default function AuthPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold">TEN</h1>
          <p className="text-muted-foreground mt-1">Die Plattform für Unternehmer</p>
        </div>
        <AuthForm />
      </div>
    </div>
  )
}
```

- [ ] **Step 3: Run dev server and test auth**

```bash
npm run dev
```

Open http://localhost:3000/auth — verify login form appears, Google button works, email auth works.

- [ ] **Step 4: Commit**

```bash
git add components/auth/ app/\(auth\)/
git commit -m "feat: add auth page with Google and email login"
```

---

### Task 5: i18n setup (DE/EN)

**Files:**
- Create: `messages/de.json`
- Create: `messages/en.json`
- Create: `i18n/routing.ts`
- Create: `i18n/request.ts`
- Modify: `app/layout.tsx`
- Modify: `next.config.ts`

- [ ] **Step 1: Configure next-intl**

Create `i18n/routing.ts`:

```typescript
import { defineRouting } from 'next-intl/routing'

export const routing = defineRouting({
  locales: ['de', 'en'],
  defaultLocale: 'de',
})
```

Create `i18n/request.ts`:

```typescript
import { getRequestConfig } from 'next-intl/server'
import { routing } from './routing'

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale
  if (!locale || !routing.locales.includes(locale as 'de' | 'en')) {
    locale = routing.defaultLocale
  }
  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  }
})
```

- [ ] **Step 2: Create translation files**

Create `messages/de.json`:

```json
{
  "nav": {
    "feed": "Feed",
    "communities": "Communities",
    "qa": "Fragen & Antworten",
    "investors": "Investoren",
    "chat": "Nachrichten",
    "profile": "Profil",
    "settings": "Einstellungen",
    "logout": "Abmelden"
  },
  "auth": {
    "login": "Anmelden",
    "register": "Registrieren",
    "email": "E-Mail",
    "password": "Passwort",
    "continueWithGoogle": "Mit Google fortfahren",
    "or": "oder",
    "noAccount": "Noch kein Konto? Registrieren",
    "hasAccount": "Bereits Mitglied? Anmelden",
    "tagline": "Die Plattform für Unternehmer"
  },
  "feed": {
    "title": "Feed",
    "placeholder": "Was denkst du gerade?",
    "post": "Posten"
  },
  "communities": {
    "title": "Communities",
    "create": "Community erstellen",
    "join": "Beitreten",
    "leave": "Verlassen"
  },
  "qa": {
    "title": "Fragen & Antworten",
    "askQuestion": "Frage stellen",
    "answer": "Antworten"
  },
  "investors": {
    "title": "Investor-Bereich",
    "submitPitch": "Projekt einreichen",
    "applyToInvestor": "Bewerben"
  },
  "chat": {
    "title": "Nachrichten",
    "placeholder": "Nachricht schreiben..."
  }
}
```

Create `messages/en.json`:

```json
{
  "nav": {
    "feed": "Feed",
    "communities": "Communities",
    "qa": "Q&A",
    "investors": "Investors",
    "chat": "Messages",
    "profile": "Profile",
    "settings": "Settings",
    "logout": "Sign out"
  },
  "auth": {
    "login": "Sign in",
    "register": "Register",
    "email": "Email",
    "password": "Password",
    "continueWithGoogle": "Continue with Google",
    "or": "or",
    "noAccount": "No account yet? Register",
    "hasAccount": "Already a member? Sign in",
    "tagline": "The platform for entrepreneurs"
  },
  "feed": {
    "title": "Feed",
    "placeholder": "What's on your mind?",
    "post": "Post"
  },
  "communities": {
    "title": "Communities",
    "create": "Create community",
    "join": "Join",
    "leave": "Leave"
  },
  "qa": {
    "title": "Q&A",
    "askQuestion": "Ask a question",
    "answer": "Answer"
  },
  "investors": {
    "title": "Investor Area",
    "submitPitch": "Submit pitch",
    "applyToInvestor": "Apply"
  },
  "chat": {
    "title": "Messages",
    "placeholder": "Write a message..."
  }
}
```

- [ ] **Step 3: Update next.config.ts**

```typescript
import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin('./i18n/request.ts')

const nextConfig = {}

export default withNextIntl(nextConfig)
```

- [ ] **Step 4: Commit**

```bash
git add i18n/ messages/ next.config.ts
git commit -m "feat: add DE/EN i18n with next-intl"
```

---

### Task 6: Main layout with Navbar and Sidebar

**Files:**
- Create: `app/(main)/layout.tsx`
- Create: `components/layout/Navbar.tsx`
- Create: `components/layout/Sidebar.tsx`
- Create: `components/layout/LanguageSwitcher.tsx`

- [ ] **Step 1: Create Sidebar**

Create `components/layout/Sidebar.tsx`:

```typescript
'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, Users, MessageSquare, TrendingUp, MessageCircle, User } from 'lucide-react'
import { cn } from '@/lib/utils'

const navItems = [
  { href: '/feed', icon: Home, label: 'Feed' },
  { href: '/communities', icon: Users, label: 'Communities' },
  { href: '/qa', icon: MessageSquare, label: 'Q&A' },
  { href: '/investors', icon: TrendingUp, label: 'Investoren' },
  { href: '/chat', icon: MessageCircle, label: 'Nachrichten' },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="fixed left-0 top-16 h-[calc(100vh-4rem)] w-56 border-r bg-background p-4 hidden md:block">
      <nav className="space-y-1">
        {navItems.map(({ href, icon: Icon, label }) => (
          <Link
            key={href}
            href={href}
            className={cn(
              'flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent',
              pathname.startsWith(href) ? 'bg-accent text-accent-foreground' : 'text-muted-foreground'
            )}
          >
            <Icon className="h-4 w-4" />
            {label}
          </Link>
        ))}
      </nav>
    </aside>
  )
}
```

- [ ] **Step 2: Create Navbar**

Create `components/layout/Navbar.tsx`:

```typescript
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem,
  DropdownMenuSeparator, DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { LogOut, Settings, User } from 'lucide-react'

async function signOut() {
  'use server'
  const { createClient: createServerClient } = await import('@/lib/supabase/server')
  const supabase = await createServerClient()
  await supabase.auth.signOut()
}

export async function Navbar() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  const { data: profile } = user
    ? await supabase.from('profiles').select('username, avatar_url, full_name').eq('id', user.id).single()
    : { data: null }

  return (
    <header className="fixed top-0 left-0 right-0 h-16 border-b bg-background z-50 flex items-center px-4 justify-between">
      <Link href="/feed" className="font-bold text-xl">TEN</Link>
      {profile && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-8 w-8 rounded-full">
              <Avatar className="h-8 w-8">
                <AvatarImage src={profile.avatar_url ?? undefined} />
                <AvatarFallback>{profile.full_name?.[0] ?? profile.username[0]}</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem asChild>
              <Link href={`/profile/${profile.username}`}><User className="mr-2 h-4 w-4" />Profil</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/settings"><Settings className="mr-2 h-4 w-4" />Einstellungen</Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <form action={signOut}>
                <button type="submit" className="flex items-center w-full">
                  <LogOut className="mr-2 h-4 w-4" />Abmelden
                </button>
              </form>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </header>
  )
}
```

- [ ] **Step 3: Create main layout**

Create `app/(main)/layout.tsx`:

```typescript
import { Navbar } from '@/components/layout/Navbar'
import { Sidebar } from '@/components/layout/Sidebar'

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <div className="flex pt-16">
        <Sidebar />
        <main className="flex-1 md:ml-56 p-6 max-w-4xl">
          {children}
        </main>
      </div>
    </>
  )
}
```

- [ ] **Step 4: Test layout**

```bash
npm run dev
```

Log in → verify Navbar shows at top, Sidebar shows on desktop, user avatar in top-right.

- [ ] **Step 5: Commit**

```bash
git add components/layout/ app/\(main\)/layout.tsx
git commit -m "feat: add main layout with Navbar and Sidebar"
```

---

## Phase 2: Feed

### Task 7: Posts database migration

**Files:**
- Create: `supabase/migrations/002_posts.sql`

- [ ] **Step 1: Create posts migration**

Create `supabase/migrations/002_posts.sql`:

```sql
create table posts (
  id uuid primary key default gen_random_uuid(),
  author_id uuid references profiles(id) on delete cascade not null,
  content text not null,
  image_url text,
  community_id uuid,
  created_at timestamptz not null default now()
);

create table post_likes (
  post_id uuid references posts(id) on delete cascade,
  user_id uuid references profiles(id) on delete cascade,
  primary key (post_id, user_id)
);

create table post_comments (
  id uuid primary key default gen_random_uuid(),
  post_id uuid references posts(id) on delete cascade not null,
  author_id uuid references profiles(id) on delete cascade not null,
  content text not null,
  created_at timestamptz not null default now()
);

alter table posts enable row level security;
alter table post_likes enable row level security;
alter table post_comments enable row level security;

create policy "Posts are viewable by everyone" on posts for select using (true);
create policy "Authenticated users can create posts" on posts for insert with check (auth.uid() = author_id);
create policy "Authors can delete their own posts" on posts for delete using (auth.uid() = author_id);

create policy "Likes viewable by everyone" on post_likes for select using (true);
create policy "Authenticated users can like" on post_likes for insert with check (auth.uid() = user_id);
create policy "Users can unlike" on post_likes for delete using (auth.uid() = user_id);

create policy "Comments viewable by everyone" on post_comments for select using (true);
create policy "Authenticated users can comment" on post_comments for insert with check (auth.uid() = author_id);
create policy "Authors can delete comments" on post_comments for delete using (auth.uid() = author_id);
```

- [ ] **Step 2: Run migration in Supabase SQL editor**

Paste `002_posts.sql` content → Run.

- [ ] **Step 3: Commit**

```bash
git add supabase/
git commit -m "feat: add posts, likes, comments migration"
```

---

### Task 8: Feed page and PostForm

**Files:**
- Create: `app/(main)/feed/page.tsx`
- Create: `components/feed/PostForm.tsx`
- Create: `components/feed/PostCard.tsx`
- Create: `components/feed/FeedList.tsx`

- [ ] **Step 1: Install additional shadcn components**

```bash
npx shadcn@latest add textarea
```

- [ ] **Step 2: Create PostForm**

Create `components/feed/PostForm.tsx`:

```typescript
'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { useRouter } from 'next/navigation'

export function PostForm({ communityId }: { communityId?: string }) {
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!content.trim()) return
    setLoading(true)

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return

    await supabase.from('posts').insert({
      content: content.trim(),
      author_id: user.id,
      community_id: communityId ?? null,
    })

    setContent('')
    setLoading(false)
    router.refresh()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3 border rounded-lg p-4 bg-card">
      <Textarea
        placeholder="Was denkst du gerade?"
        value={content}
        onChange={e => setContent(e.target.value)}
        rows={3}
      />
      <div className="flex justify-end">
        <Button type="submit" disabled={loading || !content.trim()}>
          {loading ? 'Lädt...' : 'Posten'}
        </Button>
      </div>
    </form>
  )
}
```

- [ ] **Step 3: Create PostCard**

Create `components/feed/PostCard.tsx`:

```typescript
'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Heart, MessageCircle } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { formatDistanceToNow } from 'date-fns'
import { de } from 'date-fns/locale'

type Post = {
  id: string
  content: string
  created_at: string
  author: { username: string; avatar_url: string | null; full_name: string | null }
  likes_count: number
  comments_count: number
  user_has_liked: boolean
}

export function PostCard({ post, currentUserId }: { post: Post; currentUserId: string | null }) {
  const [liked, setLiked] = useState(post.user_has_liked)
  const [likesCount, setLikesCount] = useState(post.likes_count)
  const supabase = createClient()

  async function toggleLike() {
    if (!currentUserId) return
    if (liked) {
      await supabase.from('post_likes').delete().eq('post_id', post.id).eq('user_id', currentUserId)
      setLikesCount(c => c - 1)
    } else {
      await supabase.from('post_likes').insert({ post_id: post.id, user_id: currentUserId })
      setLikesCount(c => c + 1)
    }
    setLiked(l => !l)
  }

  return (
    <div className="border rounded-lg p-4 bg-card space-y-3">
      <div className="flex items-center gap-3">
        <Link href={`/profile/${post.author.username}`}>
          <Avatar className="h-9 w-9">
            <AvatarImage src={post.author.avatar_url ?? undefined} />
            <AvatarFallback>{(post.author.full_name ?? post.author.username)[0]}</AvatarFallback>
          </Avatar>
        </Link>
        <div>
          <Link href={`/profile/${post.author.username}`} className="font-medium text-sm hover:underline">
            {post.author.full_name ?? post.author.username}
          </Link>
          <p className="text-xs text-muted-foreground">
            {formatDistanceToNow(new Date(post.created_at), { addSuffix: true, locale: de })}
          </p>
        </div>
      </div>
      <p className="text-sm whitespace-pre-wrap">{post.content}</p>
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" onClick={toggleLike} className={liked ? 'text-red-500' : ''}>
          <Heart className="h-4 w-4 mr-1" fill={liked ? 'currentColor' : 'none'} />
          {likesCount}
        </Button>
        <Button variant="ghost" size="sm">
          <MessageCircle className="h-4 w-4 mr-1" />
          {post.comments_count}
        </Button>
      </div>
    </div>
  )
}
```

- [ ] **Step 4: Create feed page**

Create `app/(main)/feed/page.tsx`:

```typescript
import { createClient } from '@/lib/supabase/server'
import { PostForm } from '@/components/feed/PostForm'
import { PostCard } from '@/components/feed/PostCard'

export default async function FeedPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const { data: posts } = await supabase
    .from('posts')
    .select(`
      id, content, created_at,
      author:profiles!author_id(username, avatar_url, full_name),
      post_likes(user_id),
      post_comments(id)
    `)
    .is('community_id', null)
    .order('created_at', { ascending: false })
    .limit(50)

  const enrichedPosts = (posts ?? []).map(post => ({
    ...post,
    author: Array.isArray(post.author) ? post.author[0] : post.author,
    likes_count: post.post_likes?.length ?? 0,
    comments_count: post.post_comments?.length ?? 0,
    user_has_liked: post.post_likes?.some((l: { user_id: string }) => l.user_id === user?.id) ?? false,
  }))

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Feed</h1>
      {user && <PostForm />}
      <div className="space-y-3">
        {enrichedPosts.map(post => (
          <PostCard key={post.id} post={post} currentUserId={user?.id ?? null} />
        ))}
      </div>
    </div>
  )
}
```

- [ ] **Step 5: Install date-fns**

```bash
npm install date-fns
```

- [ ] **Step 6: Test feed**

```bash
npm run dev
```

Create a post → verify it appears. Click like → verify count updates.

- [ ] **Step 7: Commit**

```bash
git add components/feed/ app/\(main\)/feed/
git commit -m "feat: add feed with posts, likes, and comments"
```

---

## Phase 3: Communities & Groups

### Task 9: Communities database migration

**Files:**
- Create: `supabase/migrations/003_communities.sql`

- [ ] **Step 1: Create communities migration**

Create `supabase/migrations/003_communities.sql`:

```sql
create table communities (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text unique not null,
  description text,
  creator_id uuid references profiles(id) on delete cascade not null,
  is_private boolean not null default false,
  avatar_url text,
  created_at timestamptz not null default now()
);

create table community_members (
  community_id uuid references communities(id) on delete cascade,
  user_id uuid references profiles(id) on delete cascade,
  role text not null default 'member' check (role in ('member', 'moderator', 'admin')),
  joined_at timestamptz not null default now(),
  primary key (community_id, user_id)
);

create table groups (
  id uuid primary key default gen_random_uuid(),
  community_id uuid references communities(id) on delete cascade not null,
  name text not null,
  description text,
  created_at timestamptz not null default now()
);

alter table posts add column community_id uuid references communities(id) on delete cascade;

alter table communities enable row level security;
alter table community_members enable row level security;
alter table groups enable row level security;

create policy "Public communities viewable by all" on communities for select using (not is_private or id in (
  select community_id from community_members where user_id = auth.uid()
));
create policy "Anyone can create communities" on communities for insert with check (auth.uid() = creator_id);
create policy "Admins can update community" on communities for update using (
  id in (select community_id from community_members where user_id = auth.uid() and role = 'admin')
);

create policy "Members viewable by community members" on community_members for select using (true);
create policy "Users can join communities" on community_members for insert with check (auth.uid() = user_id);
create policy "Users can leave communities" on community_members for delete using (auth.uid() = user_id);

create policy "Groups viewable by community members" on groups for select using (true);
```

- [ ] **Step 2: Run migration in Supabase SQL editor**

- [ ] **Step 3: Commit**

```bash
git add supabase/
git commit -m "feat: add communities and groups migration"
```

---

### Task 10: Communities pages

**Files:**
- Create: `app/(main)/communities/page.tsx`
- Create: `app/(main)/communities/[slug]/page.tsx`
- Create: `components/communities/CommunityCard.tsx`
- Create: `components/communities/CommunityForm.tsx`

- [ ] **Step 1: Install dialog component**

```bash
npx shadcn@latest add dialog
```

- [ ] **Step 2: Create CommunityForm**

Create `components/communities/CommunityForm.tsx`:

```typescript
'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { useRouter } from 'next/navigation'

export function CommunityForm() {
  const [open, setOpen] = useState(false)
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  function toSlug(text: string) {
    return text.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return

    const slug = toSlug(name)
    const { data, error } = await supabase.from('communities').insert({
      name, slug, description, creator_id: user.id,
    }).select('slug').single()

    if (!error && data) {
      await supabase.from('community_members').insert({
        community_id: data.slug,
        user_id: user.id,
        role: 'admin',
      })
      setOpen(false)
      router.push(`/communities/${data.slug}`)
    }
    setLoading(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Community erstellen</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Neue Community</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label>Name</Label>
            <Input value={name} onChange={e => setName(e.target.value)} required />
          </div>
          <div>
            <Label>Beschreibung</Label>
            <Textarea value={description} onChange={e => setDescription(e.target.value)} />
          </div>
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? 'Erstellt...' : 'Erstellen'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
```

- [ ] **Step 3: Create CommunityCard**

Create `components/communities/CommunityCard.tsx`:

```typescript
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Users } from 'lucide-react'

type Community = {
  id: string
  name: string
  slug: string
  description: string | null
  member_count: number
}

export function CommunityCard({ community }: { community: Community }) {
  return (
    <Link href={`/communities/${community.slug}`}>
      <Card className="hover:bg-accent transition-colors cursor-pointer">
        <CardHeader className="pb-2">
          <CardTitle className="text-base">{community.name}</CardTitle>
        </CardHeader>
        <CardContent>
          {community.description && (
            <p className="text-sm text-muted-foreground mb-2 line-clamp-2">{community.description}</p>
          )}
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Users className="h-3 w-3" />
            {community.member_count} Mitglieder
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
```

- [ ] **Step 4: Create communities list page**

Create `app/(main)/communities/page.tsx`:

```typescript
import { createClient } from '@/lib/supabase/server'
import { CommunityCard } from '@/components/communities/CommunityCard'
import { CommunityForm } from '@/components/communities/CommunityForm'

export default async function CommunitiesPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const { data: communities } = await supabase
    .from('communities')
    .select('id, name, slug, description, community_members(count)')
    .order('created_at', { ascending: false })

  const enriched = (communities ?? []).map(c => ({
    ...c,
    member_count: (c.community_members as unknown as { count: number }[])[0]?.count ?? 0,
  }))

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Communities</h1>
        {user && <CommunityForm />}
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        {enriched.map(c => <CommunityCard key={c.id} community={c} />)}
      </div>
    </div>
  )
}
```

- [ ] **Step 5: Create community detail page**

Create `app/(main)/communities/[slug]/page.tsx`:

```typescript
import { createClient } from '@/lib/supabase/server'
import { PostForm } from '@/components/feed/PostForm'
import { PostCard } from '@/components/feed/PostCard'
import { notFound } from 'next/navigation'
import { Button } from '@/components/ui/button'

export default async function CommunityPage({ params }: { params: { slug: string } }) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const { data: community } = await supabase
    .from('communities')
    .select('id, name, description, community_members(user_id, role)')
    .eq('slug', params.slug)
    .single()

  if (!community) notFound()

  const isMember = community.community_members?.some(
    (m: { user_id: string }) => m.user_id === user?.id
  )

  const { data: posts } = await supabase
    .from('posts')
    .select(`
      id, content, created_at,
      author:profiles!author_id(username, avatar_url, full_name),
      post_likes(user_id),
      post_comments(id)
    `)
    .eq('community_id', community.id)
    .order('created_at', { ascending: false })

  const enrichedPosts = (posts ?? []).map(post => ({
    ...post,
    author: Array.isArray(post.author) ? post.author[0] : post.author,
    likes_count: post.post_likes?.length ?? 0,
    comments_count: post.post_comments?.length ?? 0,
    user_has_liked: post.post_likes?.some((l: { user_id: string }) => l.user_id === user?.id) ?? false,
  }))

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">{community.name}</h1>
          {community.description && <p className="text-muted-foreground">{community.description}</p>}
        </div>
        {user && !isMember && (
          <form action={async () => {
            'use server'
            const { createClient: sc } = await import('@/lib/supabase/server')
            const s = await sc()
            const { data: { user: u } } = await s.auth.getUser()
            if (u) await s.from('community_members').insert({ community_id: community.id, user_id: u.id })
          }}>
            <Button type="submit">Beitreten</Button>
          </form>
        )}
      </div>
      {isMember && <PostForm communityId={community.id} />}
      <div className="space-y-3">
        {enrichedPosts.map(post => (
          <PostCard key={post.id} post={post} currentUserId={user?.id ?? null} />
        ))}
      </div>
    </div>
  )
}
```

- [ ] **Step 6: Test communities**

```bash
npm run dev
```

Create a community → verify it appears in list → open it → post in it → verify post appears in community feed but not main feed.

- [ ] **Step 7: Commit**

```bash
git add components/communities/ app/\(main\)/communities/
git commit -m "feat: add communities with posts and membership"
```

---

## Phase 4: Q&A Rooms

### Task 11: Q&A database migration

**Files:**
- Create: `supabase/migrations/004_qa.sql`

- [ ] **Step 1: Create Q&A migration**

Create `supabase/migrations/004_qa.sql`:

```sql
create table qa_rooms (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text unique not null,
  description text,
  created_at timestamptz not null default now()
);

create table qa_questions (
  id uuid primary key default gen_random_uuid(),
  room_id uuid references qa_rooms(id) on delete cascade not null,
  author_id uuid references profiles(id) on delete cascade not null,
  title text not null,
  content text not null,
  upvotes int not null default 0,
  created_at timestamptz not null default now()
);

create table qa_answers (
  id uuid primary key default gen_random_uuid(),
  question_id uuid references qa_questions(id) on delete cascade not null,
  author_id uuid references profiles(id) on delete cascade not null,
  content text not null,
  upvotes int not null default 0,
  is_accepted boolean not null default false,
  created_at timestamptz not null default now()
);

alter table qa_rooms enable row level security;
alter table qa_questions enable row level security;
alter table qa_answers enable row level security;

create policy "QA rooms viewable by all" on qa_rooms for select using (true);
create policy "Questions viewable by all" on qa_questions for select using (true);
create policy "Authenticated users can ask" on qa_questions for insert with check (auth.uid() = author_id);
create policy "Answers viewable by all" on qa_answers for select using (true);
create policy "Authenticated users can answer" on qa_answers for insert with check (auth.uid() = author_id);

-- Seed initial rooms
insert into qa_rooms (name, slug, description) values
  ('Gründung', 'gruendung', 'Fragen rund ums Unternehmen gründen'),
  ('Steuern & Finanzen', 'steuern-finanzen', 'Steuerliche und finanzielle Fragen'),
  ('Marketing', 'marketing', 'Marketing, Social Media, Werbung'),
  ('Recht', 'recht', 'Rechtliche Fragen für Unternehmer'),
  ('Team & HR', 'team-hr', 'Mitarbeiter, Verträge, Personalfragen'),
  ('Technologie', 'technologie', 'Tech, Software, Digitalisierung');
```

- [ ] **Step 2: Run migration in Supabase SQL editor**

- [ ] **Step 3: Commit**

```bash
git add supabase/
git commit -m "feat: add Q&A rooms, questions, answers migration with seed rooms"
```

---

### Task 12: Q&A pages

**Files:**
- Create: `app/(main)/qa/page.tsx`
- Create: `app/(main)/qa/[room]/page.tsx`
- Create: `components/qa/RoomCard.tsx`
- Create: `components/qa/QuestionCard.tsx`
- Create: `components/qa/QuestionForm.tsx`
- Create: `components/qa/AnswerCard.tsx`

- [ ] **Step 1: Create RoomCard**

Create `components/qa/RoomCard.tsx`:

```typescript
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { MessageSquare } from 'lucide-react'

export function RoomCard({ room }: { room: { name: string; slug: string; description: string | null; question_count: number } }) {
  return (
    <Link href={`/qa/${room.slug}`}>
      <Card className="hover:bg-accent cursor-pointer transition-colors">
        <CardHeader className="pb-2">
          <CardTitle className="text-base">{room.name}</CardTitle>
        </CardHeader>
        <CardContent>
          {room.description && <p className="text-sm text-muted-foreground mb-2">{room.description}</p>}
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <MessageSquare className="h-3 w-3" />
            {room.question_count} Fragen
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
```

- [ ] **Step 2: Create QuestionForm**

Create `components/qa/QuestionForm.tsx`:

```typescript
'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { useRouter } from 'next/navigation'

export function QuestionForm({ roomId }: { roomId: string }) {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return
    await supabase.from('qa_questions').insert({ room_id: roomId, author_id: user.id, title, content })
    setTitle('')
    setContent('')
    setLoading(false)
    router.refresh()
  }

  return (
    <form onSubmit={handleSubmit} className="border rounded-lg p-4 space-y-3 bg-card">
      <h3 className="font-medium">Frage stellen</h3>
      <div>
        <Label>Titel</Label>
        <Input value={title} onChange={e => setTitle(e.target.value)} placeholder="Kurze, klare Frage" required />
      </div>
      <div>
        <Label>Details</Label>
        <Textarea value={content} onChange={e => setContent(e.target.value)} placeholder="Mehr Details zu deiner Frage..." rows={4} required />
      </div>
      <Button type="submit" disabled={loading}>{loading ? 'Sendet...' : 'Frage stellen'}</Button>
    </form>
  )
}
```

- [ ] **Step 3: Create AnswerCard**

Create `components/qa/AnswerCard.tsx`:

```typescript
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { formatDistanceToNow } from 'date-fns'
import { de } from 'date-fns/locale'

type Answer = {
  id: string
  content: string
  created_at: string
  is_accepted: boolean
  author: { username: string; avatar_url: string | null; full_name: string | null; role: string }
}

export function AnswerCard({ answer }: { answer: Answer }) {
  return (
    <div className={`border rounded-lg p-4 space-y-3 ${answer.is_accepted ? 'border-green-500 bg-green-50 dark:bg-green-950/20' : 'bg-card'}`}>
      <div className="flex items-center gap-3">
        <Avatar className="h-8 w-8">
          <AvatarImage src={answer.author.avatar_url ?? undefined} />
          <AvatarFallback>{(answer.author.full_name ?? answer.author.username)[0]}</AvatarFallback>
        </Avatar>
        <div className="flex items-center gap-2">
          <span className="font-medium text-sm">{answer.author.full_name ?? answer.author.username}</span>
          {answer.author.role === 'experienced' && (
            <Badge variant="secondary" className="text-xs">Erfahren</Badge>
          )}
          {answer.is_accepted && <Badge className="text-xs bg-green-500">Akzeptiert</Badge>}
        </div>
        <span className="text-xs text-muted-foreground ml-auto">
          {formatDistanceToNow(new Date(answer.created_at), { addSuffix: true, locale: de })}
        </span>
      </div>
      <p className="text-sm whitespace-pre-wrap">{answer.content}</p>
    </div>
  )
}
```

- [ ] **Step 4: Install badge component**

```bash
npx shadcn@latest add badge
```

- [ ] **Step 5: Create QuestionCard**

Create `components/qa/QuestionCard.tsx`:

```typescript
import Link from 'next/link'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { formatDistanceToNow } from 'date-fns'
import { de } from 'date-fns/locale'
import { MessageSquare } from 'lucide-react'

type Question = {
  id: string
  title: string
  content: string
  created_at: string
  answer_count: number
  author: { username: string; avatar_url: string | null; full_name: string | null }
  room_slug: string
}

export function QuestionCard({ question }: { question: Question }) {
  return (
    <Link href={`/qa/${question.room_slug}/${question.id}`}>
      <div className="border rounded-lg p-4 hover:bg-accent cursor-pointer transition-colors space-y-2">
        <h3 className="font-medium">{question.title}</h3>
        <p className="text-sm text-muted-foreground line-clamp-2">{question.content}</p>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Avatar className="h-5 w-5">
              <AvatarImage src={question.author.avatar_url ?? undefined} />
              <AvatarFallback>{(question.author.full_name ?? question.author.username)[0]}</AvatarFallback>
            </Avatar>
            {question.author.full_name ?? question.author.username}
            <span>·</span>
            {formatDistanceToNow(new Date(question.created_at), { addSuffix: true, locale: de })}
          </div>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <MessageSquare className="h-3 w-3" />
            {question.answer_count}
          </div>
        </div>
      </div>
    </Link>
  )
}
```

- [ ] **Step 6: Create Q&A overview page**

Create `app/(main)/qa/page.tsx`:

```typescript
import { createClient } from '@/lib/supabase/server'
import { RoomCard } from '@/components/qa/RoomCard'

export default async function QAPage() {
  const supabase = await createClient()

  const { data: rooms } = await supabase
    .from('qa_rooms')
    .select('id, name, slug, description, qa_questions(count)')
    .order('name')

  const enriched = (rooms ?? []).map(r => ({
    ...r,
    question_count: (r.qa_questions as unknown as { count: number }[])[0]?.count ?? 0,
  }))

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Fragen & Antworten</h1>
      <p className="text-muted-foreground">Stell Fragen als Neuling und lerne von erfahrenen Unternehmern.</p>
      <div className="grid gap-3 sm:grid-cols-2">
        {enriched.map(r => <RoomCard key={r.id} room={r} />)}
      </div>
    </div>
  )
}
```

- [ ] **Step 7: Create Q&A room page**

Create `app/(main)/qa/[room]/page.tsx`:

```typescript
import { createClient } from '@/lib/supabase/server'
import { QuestionCard } from '@/components/qa/QuestionCard'
import { QuestionForm } from '@/components/qa/QuestionForm'
import { notFound } from 'next/navigation'

export default async function QARoomPage({ params }: { params: { room: string } }) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const { data: room } = await supabase
    .from('qa_rooms')
    .select('id, name, description')
    .eq('slug', params.room)
    .single()

  if (!room) notFound()

  const { data: questions } = await supabase
    .from('qa_questions')
    .select('id, title, content, created_at, author:profiles!author_id(username, avatar_url, full_name), qa_answers(count)')
    .eq('room_id', room.id)
    .order('created_at', { ascending: false })

  const enriched = (questions ?? []).map(q => ({
    ...q,
    author: Array.isArray(q.author) ? q.author[0] : q.author,
    answer_count: (q.qa_answers as unknown as { count: number }[])[0]?.count ?? 0,
    room_slug: params.room,
  }))

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-bold">{room.name}</h1>
        {room.description && <p className="text-muted-foreground">{room.description}</p>}
      </div>
      {user && <QuestionForm roomId={room.id} />}
      <div className="space-y-3">
        {enriched.map(q => <QuestionCard key={q.id} question={q} />)}
      </div>
    </div>
  )
}
```

- [ ] **Step 8: Create Q&A question detail page**

Create `app/(main)/qa/[room]/[questionId]/page.tsx`:

```typescript
import { createClient } from '@/lib/supabase/server'
import { AnswerCard } from '@/components/qa/AnswerCard'
import { notFound } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'

export default async function QuestionDetailPage({ params }: { params: { questionId: string; room: string } }) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const { data: question } = await supabase
    .from('qa_questions')
    .select('id, title, content, created_at, author:profiles!author_id(username, avatar_url, full_name)')
    .eq('id', params.questionId)
    .single()

  if (!question) notFound()

  const { data: answers } = await supabase
    .from('qa_answers')
    .select('id, content, created_at, is_accepted, author:profiles!author_id(username, avatar_url, full_name, role)')
    .eq('question_id', question.id)
    .order('is_accepted', { ascending: false })
    .order('upvotes', { ascending: false })

  const enrichedAnswers = (answers ?? []).map(a => ({
    ...a,
    author: Array.isArray(a.author) ? a.author[0] : a.author,
  }))

  async function submitAnswer(formData: FormData) {
    'use server'
    const content = formData.get('content') as string
    if (!content?.trim()) return
    const { createClient: sc } = await import('@/lib/supabase/server')
    const s = await sc()
    const { data: { user: u } } = await s.auth.getUser()
    if (!u) return
    await s.from('qa_answers').insert({ question_id: params.questionId, author_id: u.id, content })
  }

  return (
    <div className="space-y-6">
      <div className="border rounded-lg p-4 bg-card space-y-2">
        <h1 className="text-xl font-bold">{question.title}</h1>
        <p className="text-sm whitespace-pre-wrap">{question.content}</p>
      </div>
      <div className="space-y-3">
        <h2 className="font-semibold">{enrichedAnswers.length} Antworten</h2>
        {enrichedAnswers.map(a => <AnswerCard key={a.id} answer={a} />)}
      </div>
      {user && (
        <form action={submitAnswer} className="space-y-3 border rounded-lg p-4">
          <h3 className="font-medium">Deine Antwort</h3>
          <Textarea name="content" placeholder="Schreibe deine Antwort..." rows={5} required />
          <Button type="submit">Antwort senden</Button>
        </form>
      )}
    </div>
  )
}
```

- [ ] **Step 9: Test Q&A**

```bash
npm run dev
```

Go to /qa → select a room → ask a question → answer it → verify answer appears with role badge.

- [ ] **Step 10: Commit**

```bash
git add components/qa/ app/\(main\)/qa/
git commit -m "feat: add Q&A rooms with questions and answers"
```

---

## Phase 5: Investor Area & Pitches

### Task 13: Investor database migration

**Files:**
- Create: `supabase/migrations/005_investors.sql`

- [ ] **Step 1: Create investor migration**

Create `supabase/migrations/005_investors.sql`:

```sql
create table investor_profiles (
  id uuid references profiles(id) on delete cascade primary key,
  sectors text[] not null default '{}',
  investment_min int,
  investment_max int,
  bio text,
  website text,
  created_at timestamptz not null default now()
);

create table pitches (
  id uuid primary key default gen_random_uuid(),
  author_id uuid references profiles(id) on delete cascade not null,
  title text not null,
  description text not null,
  stage text not null check (stage in ('idea', 'mvp', 'growth', 'scaling')),
  funding_needed int,
  deck_url text,
  created_at timestamptz not null default now()
);

create table pitch_applications (
  id uuid primary key default gen_random_uuid(),
  pitch_id uuid references pitches(id) on delete cascade not null,
  investor_id uuid references profiles(id) on delete cascade not null,
  status text not null default 'pending' check (status in ('pending', 'accepted', 'rejected')),
  message text,
  created_at timestamptz not null default now(),
  unique(pitch_id, investor_id)
);

alter table investor_profiles enable row level security;
alter table pitches enable row level security;
alter table pitch_applications enable row level security;

create policy "Investor profiles viewable by all" on investor_profiles for select using (true);
create policy "Users can create investor profile" on investor_profiles for insert with check (auth.uid() = id);
create policy "Investors can update their profile" on investor_profiles for update using (auth.uid() = id);

create policy "Pitches viewable by all" on pitches for select using (true);
create policy "Authenticated users can create pitches" on pitches for insert with check (auth.uid() = author_id);
create policy "Authors can update pitches" on pitches for update using (auth.uid() = author_id);

create policy "Applications viewable by involved parties" on pitch_applications for select using (
  auth.uid() = investor_id or auth.uid() = (select author_id from pitches where id = pitch_id)
);
create policy "Investors can apply" on pitch_applications for insert with check (auth.uid() = investor_id);
create policy "Investors can update status" on pitch_applications for update using (auth.uid() = investor_id);
```

- [ ] **Step 2: Run migration in Supabase SQL editor**

- [ ] **Step 3: Commit**

```bash
git add supabase/
git commit -m "feat: add investor profiles, pitches, and applications migration"
```

---

### Task 14: Investor pages

**Files:**
- Create: `app/(main)/investors/page.tsx`
- Create: `app/(main)/investors/[id]/page.tsx`
- Create: `app/(main)/pitch/new/page.tsx`
- Create: `app/(main)/pitch/[id]/page.tsx`
- Create: `components/investors/InvestorCard.tsx`
- Create: `components/investors/PitchCard.tsx`
- Create: `components/investors/PitchForm.tsx`

- [ ] **Step 1: Install select component**

```bash
npx shadcn@latest add select
```

- [ ] **Step 2: Create InvestorCard**

Create `components/investors/InvestorCard.tsx`:

```typescript
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

type Investor = {
  id: string
  sectors: string[]
  investment_min: number | null
  investment_max: number | null
  bio: string | null
  profile: { username: string; full_name: string | null; avatar_url: string | null }
}

export function InvestorCard({ investor }: { investor: Investor }) {
  return (
    <Link href={`/investors/${investor.id}`}>
      <Card className="hover:bg-accent cursor-pointer transition-colors">
        <CardHeader className="pb-2">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src={investor.profile.avatar_url ?? undefined} />
              <AvatarFallback>{(investor.profile.full_name ?? investor.profile.username)[0]}</AvatarFallback>
            </Avatar>
            <CardTitle className="text-base">{investor.profile.full_name ?? investor.profile.username}</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-2">
          {investor.bio && <p className="text-sm text-muted-foreground line-clamp-2">{investor.bio}</p>}
          <div className="flex flex-wrap gap-1">
            {investor.sectors.map(s => <Badge key={s} variant="secondary" className="text-xs">{s}</Badge>)}
          </div>
          {(investor.investment_min || investor.investment_max) && (
            <p className="text-xs text-muted-foreground">
              {investor.investment_min ? `€${investor.investment_min.toLocaleString()}` : ''}
              {investor.investment_min && investor.investment_max ? ' – ' : ''}
              {investor.investment_max ? `€${investor.investment_max.toLocaleString()}` : ''}
            </p>
          )}
        </CardContent>
      </Card>
    </Link>
  )
}
```

- [ ] **Step 3: Create PitchCard**

Create `components/investors/PitchCard.tsx`:

```typescript
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

const stageLabels: Record<string, string> = {
  idea: 'Idee',
  mvp: 'MVP',
  growth: 'Wachstum',
  scaling: 'Skalierung',
}

type Pitch = {
  id: string
  title: string
  description: string
  stage: string
  funding_needed: number | null
  author: { username: string; full_name: string | null }
}

export function PitchCard({ pitch }: { pitch: Pitch }) {
  return (
    <Link href={`/pitch/${pitch.id}`}>
      <Card className="hover:bg-accent cursor-pointer transition-colors">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base">{pitch.title}</CardTitle>
            <Badge variant="outline">{stageLabels[pitch.stage] ?? pitch.stage}</Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-2">
          <p className="text-sm text-muted-foreground line-clamp-2">{pitch.description}</p>
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>{pitch.author.full_name ?? pitch.author.username}</span>
            {pitch.funding_needed && <span>€{pitch.funding_needed.toLocaleString()} gesucht</span>}
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
```

- [ ] **Step 4: Create investors overview page**

Create `app/(main)/investors/page.tsx`:

```typescript
import { createClient } from '@/lib/supabase/server'
import { InvestorCard } from '@/components/investors/InvestorCard'
import { PitchCard } from '@/components/investors/PitchCard'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default async function InvestorsPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const { data: investors } = await supabase
    .from('investor_profiles')
    .select('id, sectors, investment_min, investment_max, bio, profile:profiles!id(username, full_name, avatar_url)')

  const { data: pitches } = await supabase
    .from('pitches')
    .select('id, title, description, stage, funding_needed, author:profiles!author_id(username, full_name)')
    .order('created_at', { ascending: false })
    .limit(20)

  const enrichedInvestors = (investors ?? []).map(i => ({
    ...i,
    profile: Array.isArray(i.profile) ? i.profile[0] : i.profile,
  }))

  const enrichedPitches = (pitches ?? []).map(p => ({
    ...p,
    author: Array.isArray(p.author) ? p.author[0] : p.author,
  }))

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Investor-Bereich</h1>
        {user && (
          <Button asChild>
            <Link href="/pitch/new">Projekt einreichen</Link>
          </Button>
        )}
      </div>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold">Investoren</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {enrichedInvestors.map(i => <InvestorCard key={i.id} investor={i} />)}
          {enrichedInvestors.length === 0 && <p className="text-muted-foreground text-sm">Noch keine Investoren registriert.</p>}
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold">Projekt-Pitches</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {enrichedPitches.map(p => <PitchCard key={p.id} pitch={p} />)}
          {enrichedPitches.length === 0 && <p className="text-muted-foreground text-sm">Noch keine Pitches eingereicht.</p>}
        </div>
      </section>
    </div>
  )
}
```

- [ ] **Step 5: Create PitchForm**

Create `components/investors/PitchForm.tsx`:

```typescript
'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useRouter } from 'next/navigation'

export function PitchForm() {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [stage, setStage] = useState('')
  const [fundingNeeded, setFundingNeeded] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return

    const { data, error } = await supabase.from('pitches').insert({
      title, description, stage,
      funding_needed: fundingNeeded ? parseInt(fundingNeeded) : null,
      author_id: user.id,
    }).select('id').single()

    if (!error && data) {
      router.push(`/pitch/${data.id}`)
    }
    setLoading(false)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-xl">
      <div>
        <Label>Titel des Projekts</Label>
        <Input value={title} onChange={e => setTitle(e.target.value)} required />
      </div>
      <div>
        <Label>Beschreibung</Label>
        <Textarea value={description} onChange={e => setDescription(e.target.value)} rows={6} required />
      </div>
      <div>
        <Label>Phase</Label>
        <Select onValueChange={setStage} required>
          <SelectTrigger>
            <SelectValue placeholder="Phase auswählen" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="idea">Idee</SelectItem>
            <SelectItem value="mvp">MVP</SelectItem>
            <SelectItem value="growth">Wachstum</SelectItem>
            <SelectItem value="scaling">Skalierung</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label>Gesuchtes Investment (€)</Label>
        <Input type="number" value={fundingNeeded} onChange={e => setFundingNeeded(e.target.value)} placeholder="z.B. 50000" />
      </div>
      <Button type="submit" disabled={loading || !stage}>
        {loading ? 'Wird eingereicht...' : 'Pitch einreichen'}
      </Button>
    </form>
  )
}
```

- [ ] **Step 6: Create pitch submission page**

Create `app/(main)/pitch/new/page.tsx`:

```typescript
import { PitchForm } from '@/components/investors/PitchForm'

export default function NewPitchPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Projekt einreichen</h1>
      <p className="text-muted-foreground">Stelle dein Projekt vor und finde den richtigen Investor.</p>
      <PitchForm />
    </div>
  )
}
```

- [ ] **Step 7: Create pitch detail page**

Create `app/(main)/pitch/[id]/page.tsx`:

```typescript
import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

const stageLabels: Record<string, string> = {
  idea: 'Idee', mvp: 'MVP', growth: 'Wachstum', scaling: 'Skalierung',
}

export default async function PitchDetailPage({ params }: { params: { id: string } }) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const { data: pitch } = await supabase
    .from('pitches')
    .select('*, author:profiles!author_id(username, full_name, avatar_url)')
    .eq('id', params.id)
    .single()

  if (!pitch) notFound()

  const author = Array.isArray(pitch.author) ? pitch.author[0] : pitch.author

  const { data: investorProfile } = user
    ? await supabase.from('investor_profiles').select('id').eq('id', user.id).single()
    : { data: null }

  async function applyToPitch(formData: FormData) {
    'use server'
    const message = formData.get('message') as string
    const { createClient: sc } = await import('@/lib/supabase/server')
    const s = await sc()
    const { data: { user: u } } = await s.auth.getUser()
    if (!u) return
    await s.from('pitch_applications').insert({ pitch_id: params.id, investor_id: u.id, message })
  }

  return (
    <div className="space-y-6 max-w-2xl">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">{pitch.title}</h1>
          <Badge variant="outline">{stageLabels[pitch.stage] ?? pitch.stage}</Badge>
        </div>
        <p className="text-muted-foreground">von {author?.full_name ?? author?.username}</p>
        {pitch.funding_needed && (
          <p className="font-medium">Gesuchtes Investment: €{pitch.funding_needed.toLocaleString()}</p>
        )}
      </div>
      <p className="whitespace-pre-wrap">{pitch.description}</p>

      {investorProfile && user?.id !== pitch.author_id && (
        <form action={applyToPitch} className="border rounded-lg p-4 space-y-3">
          <h3 className="font-medium">Als Investor bewerben</h3>
          <textarea name="message" className="w-full border rounded p-2 text-sm" rows={4} placeholder="Kurze Nachricht an den Gründer..." />
          <Button type="submit">Bewerbung senden</Button>
        </form>
      )}
    </div>
  )
}
```

- [ ] **Step 8: Test investor area**

```bash
npm run dev
```

Submit a pitch → verify it appears in /investors → open pitch detail → verify info is correct.

- [ ] **Step 9: Commit**

```bash
git add components/investors/ app/\(main\)/investors/ app/\(main\)/pitch/
git commit -m "feat: add investor area with pitches and applications"
```

---

## Phase 6: Private Chat (Realtime)

### Task 15: Chat database migration

**Files:**
- Create: `supabase/migrations/006_chat.sql`

- [ ] **Step 1: Create chat migration**

Create `supabase/migrations/006_chat.sql`:

```sql
create table conversations (
  id uuid primary key default gen_random_uuid(),
  participant_1_id uuid references profiles(id) on delete cascade not null,
  participant_2_id uuid references profiles(id) on delete cascade not null,
  created_at timestamptz not null default now(),
  unique(participant_1_id, participant_2_id)
);

create table messages (
  id uuid primary key default gen_random_uuid(),
  conversation_id uuid references conversations(id) on delete cascade not null,
  sender_id uuid references profiles(id) on delete cascade not null,
  content text not null,
  read_at timestamptz,
  created_at timestamptz not null default now()
);

alter table conversations enable row level security;
alter table messages enable row level security;

create policy "Users see their own conversations" on conversations for select using (
  auth.uid() = participant_1_id or auth.uid() = participant_2_id
);
create policy "Authenticated users can start conversations" on conversations for insert with check (
  auth.uid() = participant_1_id or auth.uid() = participant_2_id
);

create policy "Participants see messages" on messages for select using (
  exists (
    select 1 from conversations
    where id = conversation_id
    and (participant_1_id = auth.uid() or participant_2_id = auth.uid())
  )
);
create policy "Participants can send messages" on messages for insert with check (
  auth.uid() = sender_id and exists (
    select 1 from conversations
    where id = conversation_id
    and (participant_1_id = auth.uid() or participant_2_id = auth.uid())
  )
);
```

- [ ] **Step 2: Run migration in Supabase SQL editor**

Enable Realtime for the `messages` table: Supabase Dashboard → Database → Replication → check `messages`.

- [ ] **Step 3: Commit**

```bash
git add supabase/
git commit -m "feat: add conversations and messages migration with realtime"
```

---

### Task 16: Chat UI with realtime

**Files:**
- Create: `app/(main)/chat/page.tsx`
- Create: `app/(main)/chat/[conversationId]/page.tsx`
- Create: `components/chat/ConversationList.tsx`
- Create: `components/chat/ChatWindow.tsx`
- Create: `components/chat/ChatInput.tsx`

- [ ] **Step 1: Create ChatInput**

Create `components/chat/ChatInput.tsx`:

```typescript
'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Send } from 'lucide-react'

export function ChatInput({ conversationId, senderId }: { conversationId: string; senderId: string }) {
  const [content, setContent] = useState('')
  const supabase = createClient()

  async function sendMessage(e: React.FormEvent) {
    e.preventDefault()
    if (!content.trim()) return
    await supabase.from('messages').insert({ conversation_id: conversationId, sender_id: senderId, content: content.trim() })
    setContent('')
  }

  return (
    <form onSubmit={sendMessage} className="flex gap-2 border-t p-4">
      <Input
        value={content}
        onChange={e => setContent(e.target.value)}
        placeholder="Nachricht schreiben..."
        className="flex-1"
      />
      <Button type="submit" size="icon" disabled={!content.trim()}>
        <Send className="h-4 w-4" />
      </Button>
    </form>
  )
}
```

- [ ] **Step 2: Create realtime ChatWindow**

Create `components/chat/ChatWindow.tsx`:

```typescript
'use client'

import { useEffect, useRef, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { cn } from '@/lib/utils'

type Message = {
  id: string
  content: string
  sender_id: string
  created_at: string
}

export function ChatWindow({
  conversationId,
  currentUserId,
  initialMessages,
}: {
  conversationId: string
  currentUserId: string
  initialMessages: Message[]
}) {
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const bottomRef = useRef<HTMLDivElement>(null)
  const supabase = createClient()

  useEffect(() => {
    const channel = supabase
      .channel(`chat:${conversationId}`)
      .on('postgres_changes', {
        event: 'INSERT',
        schema: 'public',
        table: 'messages',
        filter: `conversation_id=eq.${conversationId}`,
      }, (payload) => {
        setMessages(prev => [...prev, payload.new as Message])
      })
      .subscribe()

    return () => { supabase.removeChannel(channel) }
  }, [conversationId, supabase])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-3">
      {messages.map(msg => (
        <div key={msg.id} className={cn('flex', msg.sender_id === currentUserId ? 'justify-end' : 'justify-start')}>
          <div className={cn(
            'max-w-xs rounded-lg px-3 py-2 text-sm',
            msg.sender_id === currentUserId ? 'bg-primary text-primary-foreground' : 'bg-muted'
          )}>
            {msg.content}
          </div>
        </div>
      ))}
      <div ref={bottomRef} />
    </div>
  )
}
```

- [ ] **Step 3: Create chat overview page**

Create `app/(main)/chat/page.tsx`:

```typescript
import { createClient } from '@/lib/supabase/server'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import Link from 'next/link'

export default async function ChatPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return null

  const { data: conversations } = await supabase
    .from('conversations')
    .select('id, participant_1_id, participant_2_id, p1:profiles!participant_1_id(username, full_name, avatar_url), p2:profiles!participant_2_id(username, full_name, avatar_url)')
    .or(`participant_1_id.eq.${user.id},participant_2_id.eq.${user.id}`)
    .order('created_at', { ascending: false })

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Nachrichten</h1>
      <div className="divide-y border rounded-lg">
        {(conversations ?? []).map(conv => {
          const other = conv.participant_1_id === user.id
            ? (Array.isArray(conv.p2) ? conv.p2[0] : conv.p2)
            : (Array.isArray(conv.p1) ? conv.p1[0] : conv.p1)
          return (
            <Link key={conv.id} href={`/chat/${conv.id}`} className="flex items-center gap-3 p-4 hover:bg-accent transition-colors">
              <Avatar className="h-10 w-10">
                <AvatarImage src={other?.avatar_url ?? undefined} />
                <AvatarFallback>{(other?.full_name ?? other?.username ?? '?')[0]}</AvatarFallback>
              </Avatar>
              <span className="font-medium">{other?.full_name ?? other?.username}</span>
            </Link>
          )
        })}
        {(conversations ?? []).length === 0 && (
          <p className="text-muted-foreground text-sm p-4">Noch keine Gespräche. Besuche ein Profil um zu schreiben.</p>
        )}
      </div>
    </div>
  )
}
```

- [ ] **Step 4: Create conversation page**

Create `app/(main)/chat/[conversationId]/page.tsx`:

```typescript
import { createClient } from '@/lib/supabase/server'
import { ChatWindow } from '@/components/chat/ChatWindow'
import { ChatInput } from '@/components/chat/ChatInput'
import { notFound } from 'next/navigation'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

export default async function ConversationPage({ params }: { params: { conversationId: string } }) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return null

  const { data: conv } = await supabase
    .from('conversations')
    .select('id, participant_1_id, participant_2_id, p1:profiles!participant_1_id(username, full_name, avatar_url), p2:profiles!participant_2_id(username, full_name, avatar_url)')
    .eq('id', params.conversationId)
    .single()

  if (!conv) notFound()

  const other = conv.participant_1_id === user.id
    ? (Array.isArray(conv.p2) ? conv.p2[0] : conv.p2)
    : (Array.isArray(conv.p1) ? conv.p1[0] : conv.p1)

  const { data: messages } = await supabase
    .from('messages')
    .select('id, content, sender_id, created_at')
    .eq('conversation_id', params.conversationId)
    .order('created_at')

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)] border rounded-lg">
      <div className="flex items-center gap-3 p-4 border-b">
        <Avatar className="h-8 w-8">
          <AvatarImage src={other?.avatar_url ?? undefined} />
          <AvatarFallback>{(other?.full_name ?? other?.username ?? '?')[0]}</AvatarFallback>
        </Avatar>
        <span className="font-medium">{other?.full_name ?? other?.username}</span>
      </div>
      <ChatWindow conversationId={params.conversationId} currentUserId={user.id} initialMessages={messages ?? []} />
      <ChatInput conversationId={params.conversationId} senderId={user.id} />
    </div>
  )
}
```

- [ ] **Step 5: Add "Message" button to profile pages**

In `app/(main)/profile/[username]/page.tsx` (see Task 17), add a button that creates/opens a conversation:

```typescript
// This will be wired in Task 17 when profile page is created
```

- [ ] **Step 6: Test chat**

```bash
npm run dev
```

Open two browser tabs with different users. Send a message from one tab → verify it appears in real time in the other tab.

- [ ] **Step 7: Commit**

```bash
git add components/chat/ app/\(main\)/chat/
git commit -m "feat: add realtime private chat"
```

---

## Phase 7: Profile Page, Landing Page, Polish

### Task 17: User profile page

**Files:**
- Create: `app/(main)/profile/[username]/page.tsx`
- Create: `components/profile/ProfileHeader.tsx`

- [ ] **Step 1: Create ProfileHeader**

Create `components/profile/ProfileHeader.tsx`:

```typescript
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

const roleLabels: Record<string, string> = {
  member: 'Mitglied',
  experienced: 'Erfahrener Unternehmer',
  investor: 'Investor',
  admin: 'Admin',
}

type Profile = {
  id: string
  username: string
  full_name: string | null
  avatar_url: string | null
  bio: string | null
  role: string
}

export function ProfileHeader({ profile, isOwnProfile, conversationId }: {
  profile: Profile
  isOwnProfile: boolean
  conversationId: string | null
}) {
  return (
    <div className="flex items-start gap-4">
      <Avatar className="h-20 w-20">
        <AvatarImage src={profile.avatar_url ?? undefined} />
        <AvatarFallback className="text-2xl">{(profile.full_name ?? profile.username)[0]}</AvatarFallback>
      </Avatar>
      <div className="flex-1 space-y-2">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold">{profile.full_name ?? profile.username}</h1>
            <p className="text-sm text-muted-foreground">@{profile.username}</p>
          </div>
          {!isOwnProfile && (
            <Button asChild variant="outline">
              <Link href={conversationId ? `/chat/${conversationId}` : `/chat/new?user=${profile.username}`}>
                Nachricht
              </Link>
            </Button>
          )}
          {isOwnProfile && (
            <Button asChild variant="outline">
              <Link href="/settings">Profil bearbeiten</Link>
            </Button>
          )}
        </div>
        <Badge variant="secondary">{roleLabels[profile.role] ?? profile.role}</Badge>
        {profile.bio && <p className="text-sm">{profile.bio}</p>}
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Create profile page**

Create `app/(main)/profile/[username]/page.tsx`:

```typescript
import { createClient } from '@/lib/supabase/server'
import { ProfileHeader } from '@/components/profile/ProfileHeader'
import { PostCard } from '@/components/feed/PostCard'
import { notFound } from 'next/navigation'

export default async function ProfilePage({ params }: { params: { username: string } }) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const { data: profile } = await supabase
    .from('profiles')
    .select('id, username, full_name, avatar_url, bio, role')
    .eq('username', params.username)
    .single()

  if (!profile) notFound()

  const isOwnProfile = user?.id === profile.id

  let conversationId: string | null = null
  if (user && !isOwnProfile) {
    const { data: conv } = await supabase
      .from('conversations')
      .select('id')
      .or(`and(participant_1_id.eq.${user.id},participant_2_id.eq.${profile.id}),and(participant_1_id.eq.${profile.id},participant_2_id.eq.${user.id})`)
      .single()
    conversationId = conv?.id ?? null
  }

  const { data: posts } = await supabase
    .from('posts')
    .select('id, content, created_at, post_likes(user_id), post_comments(id)')
    .eq('author_id', profile.id)
    .order('created_at', { ascending: false })
    .limit(20)

  const enrichedPosts = (posts ?? []).map(post => ({
    ...post,
    author: { username: profile.username, avatar_url: profile.avatar_url, full_name: profile.full_name },
    likes_count: post.post_likes?.length ?? 0,
    comments_count: post.post_comments?.length ?? 0,
    user_has_liked: post.post_likes?.some((l: { user_id: string }) => l.user_id === user?.id) ?? false,
  }))

  return (
    <div className="space-y-6">
      <ProfileHeader profile={profile} isOwnProfile={isOwnProfile} conversationId={conversationId} />
      <div className="space-y-3">
        <h2 className="font-semibold">Beiträge</h2>
        {enrichedPosts.map(post => (
          <PostCard key={post.id} post={post} currentUserId={user?.id ?? null} />
        ))}
        {enrichedPosts.length === 0 && <p className="text-muted-foreground text-sm">Noch keine Beiträge.</p>}
      </div>
    </div>
  )
}
```

- [ ] **Step 3: Commit**

```bash
git add components/profile/ app/\(main\)/profile/
git commit -m "feat: add user profile page with posts and message button"
```

---

### Task 18: Landing page

**Files:**
- Modify: `app/page.tsx`

- [ ] **Step 1: Create landing page**

Create `app/page.tsx`:

```typescript
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Users, MessageSquare, TrendingUp, MessageCircle } from 'lucide-react'

const features = [
  { icon: Users, title: 'Communities', description: 'Erstelle und tritt Unternehmer-Communities bei.' },
  { icon: MessageSquare, title: 'Q&A', description: 'Stell Fragen und lerne von erfahrenen Unternehmern.' },
  { icon: TrendingUp, title: 'Investoren', description: 'Pitch dein Projekt und finde den richtigen Investor.' },
  { icon: MessageCircle, title: 'Vernetzung', description: 'Chatte direkt mit anderen Unternehmern.' },
]

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b px-6 py-4 flex items-center justify-between">
        <span className="font-bold text-xl">TEN</span>
        <div className="flex gap-3">
          <Button variant="ghost" asChild><Link href="/auth">Anmelden</Link></Button>
          <Button asChild><Link href="/auth">Registrieren</Link></Button>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-20 space-y-20">
        <section className="text-center space-y-6">
          <h1 className="text-5xl font-bold tracking-tight">Die Plattform für Unternehmer</h1>
          <p className="text-xl text-muted-foreground max-w-xl mx-auto">
            Verbinde dich mit Unternehmern, stelle Fragen, finde Investoren und baue echte Beziehungen auf.
          </p>
          <Button size="lg" asChild>
            <Link href="/auth">Jetzt kostenlos starten</Link>
          </Button>
        </section>

        <section className="grid sm:grid-cols-2 gap-6">
          {features.map(({ icon: Icon, title, description }) => (
            <div key={title} className="border rounded-lg p-6 space-y-3">
              <Icon className="h-8 w-8 text-primary" />
              <h3 className="font-semibold text-lg">{title}</h3>
              <p className="text-muted-foreground">{description}</p>
            </div>
          ))}
        </section>
      </main>
    </div>
  )
}
```

- [ ] **Step 2: Test landing page**

```bash
npm run dev
```

Open http://localhost:3000 → verify landing page looks good, buttons link to /auth.

- [ ] **Step 3: Commit**

```bash
git add app/page.tsx
git commit -m "feat: add landing page"
```

---

### Task 19: Settings page

**Files:**
- Create: `app/(main)/settings/page.tsx`

- [ ] **Step 1: Create settings page**

Create `app/(main)/settings/page.tsx`:

```typescript
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

export default async function SettingsPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/auth')

  const { data: profile } = await supabase
    .from('profiles')
    .select('username, full_name, bio, avatar_url')
    .eq('id', user.id)
    .single()

  async function updateProfile(formData: FormData) {
    'use server'
    const full_name = formData.get('full_name') as string
    const bio = formData.get('bio') as string
    const { createClient: sc } = await import('@/lib/supabase/server')
    const s = await sc()
    const { data: { user: u } } = await s.auth.getUser()
    if (!u) return
    await s.from('profiles').update({ full_name, bio }).eq('id', u.id)
    redirect(`/profile/${profile?.username}`)
  }

  return (
    <div className="space-y-6 max-w-lg">
      <h1 className="text-2xl font-bold">Einstellungen</h1>
      <form action={updateProfile} className="space-y-4">
        <div>
          <Label>Name</Label>
          <Input name="full_name" defaultValue={profile?.full_name ?? ''} />
        </div>
        <div>
          <Label>Bio</Label>
          <Textarea name="bio" defaultValue={profile?.bio ?? ''} rows={4} />
        </div>
        <Button type="submit">Speichern</Button>
      </form>
    </div>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add app/\(main\)/settings/
git commit -m "feat: add settings page for profile editing"
```

---

### Task 20: Deploy to Vercel

- [ ] **Step 1: Push to GitHub**

```bash
git remote add origin https://github.com/stevenpechtl2002-stack/TEN.git
git push -u origin main
```

- [ ] **Step 2: Deploy to Vercel**

Go to https://vercel.com → New Project → Import from GitHub → select `TEN`.

Add environment variables:
- `NEXT_PUBLIC_SUPABASE_URL` = your Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` = your Supabase anon key

Click Deploy.

- [ ] **Step 3: Update Supabase OAuth callback URL**

In Supabase Dashboard → Authentication → URL Configuration:
- Site URL: `https://your-vercel-domain.vercel.app`
- Redirect URL: `https://your-vercel-domain.vercel.app/auth/callback`

In Google Cloud Console → OAuth 2.0 credentials → Authorized redirect URIs:
- Add: `https://your-project.supabase.co/auth/v1/callback`

- [ ] **Step 4: Smoke test production**

Open your Vercel URL → register a new account → create a post → create a community → ask a Q&A question → verify all features work.

- [ ] **Step 5: Commit final**

```bash
git add -A
git commit -m "chore: final cleanup before launch"
git push
```

---

## Summary

| Phase | Tasks | Features |
|---|---|---|
| 1 | 1–6 | Setup, Auth, Layout, i18n |
| 2 | 7–8 | Feed, Posts, Likes |
| 3 | 9–10 | Communities & Groups |
| 4 | 11–12 | Q&A Rooms |
| 5 | 13–14 | Investor Area & Pitches |
| 6 | 15–16 | Realtime Chat |
| 7 | 17–20 | Profiles, Landing, Deploy |
