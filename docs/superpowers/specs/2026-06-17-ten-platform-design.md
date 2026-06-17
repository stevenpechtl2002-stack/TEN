# TEN Platform — Design Spec

**Date:** 2026-06-17
**Status:** Approved

## Overview

TEN is a bilingual (DE/EN) web platform for entrepreneurs and aspiring entrepreneurs. It provides a space to connect, learn, pitch ideas to investors, and build communities.

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js 14 (App Router) |
| Styling | Tailwind CSS + shadcn/ui |
| Backend & DB | Supabase (PostgreSQL) |
| Auth | Supabase Auth (Google + Email/Password) |
| Realtime Chat | Supabase Realtime |
| Internationalization | next-intl (DE + EN) |
| Hosting | Vercel + Supabase Cloud |

## User Roles

- **Member** — default role; can read, post, join groups and communities
- **Experienced** — verified experienced entrepreneur; answers in Q&A receive a badge
- **Investor** — has investor profile visible in the investor section
- **Admin** — platform management

## Features

### 1. Feed
- Posts with text, images, videos
- Likes and comments
- Chronological and trending sort

### 2. Communities & Groups
- Any member can create a community (public or private)
- Communities can contain sub-groups
- Each community has its own feed
- Members can join/leave communities

### 3. Q&A Rooms
- Topic-based rooms (e.g. "Taxes", "Marketing", "Founding")
- Any member can post questions
- Experienced members' answers are visually highlighted
- All content publicly readable (no login required to read)
- Upvoting for questions and answers

### 4. Investor Area
- Investors create a profile (sector focus, investment range, bio)
- Entrepreneurs submit project pitches (description, stage, funding need)
- Entrepreneurs can apply to investors
- Investors can contact entrepreneurs
- Application status tracking (pending, accepted, rejected)

### 5. Private Chat
- 1:1 messaging between any members
- Realtime via Supabase Realtime
- Unread message indicators

### 6. User Profile
- Avatar, bio, role badge
- Activity history (posts, answers, communities)
- Public profile page

## Database Schema

### Core Tables

```
profiles
  id (uuid, FK auth.users)
  username
  full_name
  avatar_url
  bio
  role (member | experienced | investor | admin)
  created_at

posts
  id, author_id, content, image_url, video_url
  community_id (nullable — null = main feed)
  created_at

post_likes
  post_id, user_id

post_comments
  id, post_id, author_id, content, created_at

communities
  id, name, slug, description, creator_id
  is_private, avatar_url, created_at

community_members
  community_id, user_id, role (member | moderator | admin)

groups
  id, community_id, name, description, created_at

qa_rooms
  id, name, slug, description, created_at

qa_questions
  id, room_id, author_id, title, content
  upvotes, created_at

qa_answers
  id, question_id, author_id, content
  upvotes, is_accepted, created_at

investor_profiles
  id (FK profiles), sectors[], investment_range_min, investment_range_max
  bio, website, created_at

pitches
  id, author_id, title, description, stage
  funding_needed, deck_url, created_at

pitch_applications
  id, pitch_id, investor_id, status (pending|accepted|rejected)
  message, created_at

conversations
  id, participant_1_id, participant_2_id, created_at

messages
  id, conversation_id, sender_id, content
  read_at, created_at
```

## Pages & Routing

```
/                        Landing Page
/auth                    Login / Register
/feed                    Main Feed
/communities             All Communities
/communities/[slug]      Community Page
/communities/[slug]/[group]  Group Page
/qa                      Q&A Overview
/qa/[room]               Q&A Room
/investors               Investor Directory
/investors/[id]          Investor Profile
/pitch/new               Submit Pitch
/pitch/[id]              Pitch Detail
/chat                    Messages Overview
/chat/[conversationId]   Conversation
/profile/[username]      User Profile
/settings                Account Settings
```

## Build Phases

| Phase | Scope |
|---|---|
| 1 | Project setup, Auth, Profile, Layout, Navigation, i18n |
| 2 | Feed (posts, likes, comments) |
| 3 | Communities & Groups |
| 4 | Q&A Rooms |
| 5 | Investor Area & Pitches |
| 6 | Private Chat (Realtime) |
| 7 | Polish, DE/EN translations, Deployment to Vercel |

## Success Criteria

- Users can register and log in with Google or Email
- Users can post, like, comment in the main feed
- Users can create and join communities with their own feeds
- Users can ask and answer questions in topic rooms
- Investors and entrepreneurs can connect through the investor area
- Members can chat privately in realtime
- Platform is available in German and English
