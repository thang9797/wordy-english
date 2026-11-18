# Wordy: learn English for TOEIC & IELTS

A web app for Vietnamese learners preparing for TOEIC and IELTS. Built with **Next.js 16 (App Router, TypeScript)**, **PostgreSQL** (via Prisma 7) and **Better Auth**.

## Features

- **Vocabulary with spaced repetition (SM-2)**: 41 decks and about 890 words: **B2** (140 words) and **C1** (79 words) general English, TOEIC by score band (550–990), IELTS topics and everyday English. Each word has IPA, an English definition, a Vietnamese meaning and bilingual examples. B2/C1 words also have synonyms, opposites, collocations, word family, an extra example and sometimes a memory trick.
- **Different ways to review a word**: a new word is shown as a flip card; after that it comes back as *choose the meaning*, then *fill the blank in a sentence*, then *listen and spell it*. A wrong answer is always "Again"; a correct one lets you choose Hard / Good / Easy. The mode comes from how well the card is known (`src/lib/review-modes.ts`).
- **My notes**: write your own example or memory trick for any word (on the card and in the deck list).
- **Quizzes**: TOEIC Part 5–style grammar and vocabulary, IELTS collocations and Task 1 trend language, a grammar set, and a listening set. Answers are graded on the server and every result has explanations in English and Vietnamese.
- **Listening (dictation)**: hear a sentence (normal or slow, US or UK voice), type it, and get word-by-word feedback.
- **Speaking (shadowing)**: say the sentence out loud. The browser transcribes it and you get a score and a word diff. This needs Chrome or Edge.
- **Accounts, streaks and a dashboard**: per-user progress, daily streaks (in Vietnam time), due cards and recent scores.

All quiz and vocabulary content is original, written in the *style* of TOEIC and IELTS. It is not taken from official ETS, IDP or British Council materials.

## Requirements

- Node.js **20.19+, 22.12+ or 24+** (Prisma 7 does not support Node 23)
- Docker (for PostgreSQL), or any PostgreSQL 15+ server

## Getting started

```bash
npm install                 # also runs `prisma generate`
cp .env.example .env        # then set BETTER_AUTH_SECRET (command is in the file)
npm run db:up               # start PostgreSQL in Docker (port 5432)
npm run db:migrate          # create the tables
npm run db:seed             # load decks, quizzes and practice sentences
npm run dev                 # http://localhost:3000
```

## Scripts

| Script | What it does |
|---|---|
| `npm run dev` | Development server |
| `npm run build` / `npm start` | Production build / server |
| `npm test` | Unit tests (Vitest): SM-2, text diff, streaks, grading |
| `npx playwright test` | End-to-end tests (sign-up flow, and every review mode) against a production build on port 3100. Run `npm run build` first |
| `npm run lint` / `npm run typecheck` | ESLint / TypeScript |
| `npm run db:up` | Start PostgreSQL (Docker Compose) |
| `npm run db:migrate` | Apply / create Prisma migrations |
| `npm run db:seed` | Load or refresh content. Safe to re-run: it upserts and keeps user progress |
| `npm run db:studio` | Browse the database in Prisma Studio |

## Project layout

```
prisma/
  schema.prisma        data model (auth tables, decks/words, quizzes, progress)
  seed.ts, data/       seed script and content (edit these to add words/questions)
src/
  app/(auth)/          sign-in, sign-up
  app/(app)/           dashboard, decks, study, quizzes, practice (signed-in area)
  app/api/auth/        Better Auth endpoint
  proxy.ts             redirects signed-out visitors (optimistic cookie check)
  actions/             server actions: submitReview, submitQuiz, savePractice
  lib/                 db, auth, session, queries, srs, text-compare, grading, streak
  hooks/               Web Speech API: text-to-speech and speech recognition
  components/app/      app UI (study session, quiz player, practice runner, …)
tests/                 Vitest unit tests
e2e/                   Playwright smoke test
```

## Adding content

Add words to `prisma/data/*-decks.ts` (use `wx()` instead of `w()` to attach synonyms, collocations, word family, an extra example and a memory trick), questions to `prisma/data/quizzes.ts` and sentences to `prisma/data/sentences.ts`, then run `npm run db:seed`.

- For a fill-in-the-blank question, separate accepted alternatives with `|` (for example `"conserve|save|preserve"`).
- For listening questions, put the script in `audioText`. Lines starting with `M:` or `W:` are read by two different voices.

## Notes

- **Unused content**: `prisma/data/toeic-quizzes-*.ts` (TOEIC Part 5/6–7/Listening sets with passages) are written but not seeded or shown yet.
- **Spaced repetition**: Again brings the card back in 10 minutes. Good on a new card schedules it for 1 day, then 6 days, then interval × ease. Learners get up to 20 new cards a day (10 per session). These constants are in `src/lib/srs.ts` and `src/lib/queries.ts`.
- **Time zone**: streak days roll over at midnight in `APP_TIME_ZONE`, which defaults to `Asia/Ho_Chi_Minh`.
- **Speech** runs entirely in the browser through the Web Speech API: it's free and needs no API keys. Voice quality depends on the browser and operating system.

## Deploying for free (Vercel + Neon)

1. **Database (Neon):** create a free project at neon.tech. Pick the region closest to your users (Singapore for Vietnam). Copy the connection string (it ends with `?sslmode=require`).
2. **Create the tables and load the words** from your own machine, pointing at Neon (use PowerShell or Git Bash):
   ```bash
   DATABASE_URL="<your Neon connection string>" npm run db:deploy
   DATABASE_URL="<your Neon connection string>" npm run db:seed
   ```
3. **Code on GitHub:** create an empty repository and push this project. `.env` is git-ignored, so no secrets are uploaded.
4. **Vercel:** import the GitHub repository at vercel.com/new and add these environment variables before the first deploy:

   | Name | Value |
   |---|---|
   | `DATABASE_URL` | the Neon connection string (needed at build time too) |
   | `BETTER_AUTH_SECRET` | a new random string: `node -e "console.log(require('crypto').randomBytes(32).toString('base64url'))"` |
   | `BETTER_AUTH_URL` | `https://<your-project>.vercel.app` (after the first deploy shows the real address, set it and redeploy) |

   Set the function region to Singapore (`sin1`) under Settings -> Functions so it sits next to the database.
5. Open the `.vercel.app` address, sign up, and study a deck.

When you add words later, re-run step 2's `db:seed` command. It is safe to repeat and keeps learners' progress.

### Updating the live site

Deployed from this folder with the Vercel CLI (no GitHub needed):

```bash
npx vercel deploy --prod          # publish the current code
DATABASE_URL="<Neon direct string>" npm run db:deploy   # only after a schema change
DATABASE_URL="<Neon direct string>" npm run db:seed     # only after changing words
```

The Neon strings are in your Neon dashboard (Connect). Live site: https://wordy-english.vercel.app
