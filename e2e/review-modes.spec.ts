import "dotenv/config";
import { expect, test } from "@playwright/test";
import { Client } from "pg";

// Walks one B2 word through every review mode by moving its SRS state in the database.
test("a word is reviewed in different ways as it is learned, and notes are saved", async ({ page }) => {
  const db = new Client({ connectionString: process.env.DATABASE_URL });
  await db.connect();
  const email = `modes-${Date.now()}@example.com`;

  const setState = (repetitions: number) =>
    db.query(
      `update "CardProgress" set repetitions = $2, "dueAt" = now() - interval '1 hour'
       where "userId" = (select id from "user" where email = $1)`,
      [email, repetitions],
    );
  type Progress = { repetitions: number; lapses: number; term: string; meaningVi: string };
  const progress = async () =>
    (
      await db.query(
        `select cp.repetitions, cp.lapses, w.term, w."meaningVi"
         from "CardProgress" cp join "user" u on u.id = cp."userId" join "Word" w on w.id = cp."wordId"
         where u.email = $1`,
        [email],
      )
    ).rows[0] as Progress | undefined;
  // Server actions finish after the click returns, so wait for the database to catch up.
  const waitForProgress = async (check: (p: Progress) => boolean) => {
    await expect.poll(async () => {
      const p = await progress();
      return p ? check(p) : false;
    }).toBe(true);
    return (await progress())!;
  };

  try {
    await page.goto("/sign-up");
    await page.getByLabel("Name").fill("Modes Learner");
    await page.getByLabel("Email").fill(email);
    await page.getByLabel("Password").fill("password123");
    await page.getByRole("button", { name: "Create account" }).click();
    await expect(page).toHaveURL(/\/dashboard/);

    // 1. A new word is introduced with a flip card, including its context.
    await page.goto("/decks/b2-work-careers/study");
    await expect(page.getByText("New word").first()).toBeVisible();
    await page.getByRole("button", { name: "Show answer" }).first().click();
    await expect(page.getByText("Synonyms")).toBeVisible();
    await expect(page.getByText("Goes with")).toBeVisible();
    await page.getByRole("button", { name: /Good/ }).click();
    await waitForProgress((p) => p.repetitions === 1);

    // 2. Seen once or twice: pick the meaning (multiple choice).
    await setState(1);
    await page.goto("/decks/b2-work-careers/study");
    await expect(page.getByText("Recognise")).toBeVisible();
    const { meaningVi } = (await progress())!;
    await page.getByRole("radio", { name: meaningVi, exact: true }).click();
    await expect(page.getByRole("button", { name: /Good/ })).toBeVisible();
    await expect(page.getByRole("button", { name: /Again/ })).toHaveCount(0); // correct answer: no "Again"
    await page.getByRole("button", { name: /Good/ }).click();
    await waitForProgress((p) => p.repetitions === 2);

    // 3. Seen 3-4 times: complete the sentence. A wrong answer is "Again" and keeps a personal note.
    await setState(3);
    await page.goto("/decks/b2-work-careers/study");
    await expect(page.getByText("In context")).toBeVisible();
    await page.getByPlaceholder("Type the missing word…").fill("zzzz");
    await page.getByRole("button", { name: "Check" }).click();
    await expect(page.getByText(/Not quite/)).toBeVisible();
    await page.getByPlaceholder("Write your own example or memory trick…").fill("Nghĩ tới sếp: tham vọng!");
    await page.getByPlaceholder("Write your own example or memory trick…").blur();
    await expect(page.getByText("Saved")).toBeVisible();
    await page.getByRole("button", { name: /Continue/ }).click();
    const lapsed = await waitForProgress((p) => p.lapses === 1);
    expect(lapsed.repetitions).toBe(0);
    const note = await db.query(`select note from "WordNote" where "wordId" = (select id from "Word" where term = $1 limit 1)`, [lapsed.term]);
    expect(note.rows[0]?.note).toBe("Nghĩ tới sếp: tham vọng!");

    // The note is also shown on the deck page.
    await page.goto("/decks/b2-work-careers");
    await page.getByText("More: context, examples & my note").first().click();
    await expect(page.locator("textarea").first()).toHaveValue("Nghĩ tới sếp: tham vọng!");

    // 4. Well known (5+): listen and spell the word; a one-letter slip is forgiven.
    await setState(5);
    await page.goto("/decks/b2-work-careers/study");
    await expect(page.getByText("Listen & spell")).toBeVisible();
    const { term } = (await progress())!;
    await page.getByPlaceholder("Type what you hear…").fill(term.slice(0, -1)); // typo
    await page.getByRole("button", { name: "Check" }).click();
    await expect(page.getByText("Correct!")).toBeVisible();
    await page.getByRole("button", { name: /Easy/ }).click();
    await waitForProgress((p) => p.repetitions === 6);
  } finally {
    await db.query(`delete from "user" where email = $1`, [email]);
    await db.end();
  }
});
