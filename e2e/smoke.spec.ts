import { expect, test } from "@playwright/test";

test("sign up, review a flashcard, take a quiz and do a dictation", async ({ page }) => {
  // Signed-out visitors are sent to sign-in.
  await page.goto("/dashboard");
  await expect(page).toHaveURL(/\/sign-in\?next=%2Fdashboard/);

  // Sign up.
  const email = `e2e-${Date.now()}@example.com`;
  await page.goto("/sign-up");
  await page.getByLabel("Name").fill("Playwright Learner");
  await page.getByLabel("Email").fill(email);
  await page.getByLabel("Password").fill("password123");
  await page.getByRole("button", { name: "Create account" }).click();
  await expect(page).toHaveURL(/\/dashboard/);
  await expect(page.getByRole("heading", { name: /Hi Playwright/ })).toBeVisible();

  // Study one card: flip it, rate it Good, and move to card 2.
  await page.goto("/decks/toeic-office-admin/study");
  await expect(page.getByText("1/10")).toBeVisible();
  await page.getByRole("button", { name: "Show answer" }).click();
  await expect(page.getByText("🇻🇳 chương trình nghị sự", { exact: true })).toBeVisible();
  await page.getByRole("button", { name: /Good/ }).click();
  await expect(page.getByText("2/10")).toBeVisible();

  // The deck page now shows the word as "Learning".
  await page.goto("/decks/toeic-office-admin");
  await expect(page.getByText("Learning").first()).toBeVisible();

  // Take the grammar quiz: answer the first question correctly and leave the rest.
  await page.goto("/quizzes/toeic-part5-grammar-1");
  await page.getByRole("radio", { name: /diligently/ }).click();
  for (let i = 0; i < 9; i++) await page.getByRole("button", { name: /Next/ }).click();
  await page.getByRole("button", { name: /Submit/ }).click();
  await expect(page).toHaveURL(/\/quizzes\/toeic-part5-grammar-1\/results\//);
  await expect(page.getByRole("heading", { name: /1\/10 correct/ })).toBeVisible();
  await expect(page.getByText("Cần một trạng từ để bổ nghĩa").first()).toBeVisible();

  // Dictation: reveal the sentence, type it with one word wrong, and get a word diff.
  await page.goto("/practice/listening");
  await page.getByRole("button", { name: "Show sentence" }).click();
  const sentence = (await page.locator("p.font-heading").first().textContent()) ?? "";
  expect(sentence.length).toBeGreaterThan(10);
  const words = sentence.replace(/[.?!]$/, "").split(" ");
  words[1] = "banana";
  await page.getByPlaceholder("Type what you hear…").fill(words.join(" "));
  await page.getByRole("button", { name: "Check" }).click();
  await expect(page.getByText(/words matched/)).toBeVisible();
  await expect(page.getByTitle("Extra or wrong word you wrote")).toHaveText("banana");

  // The dashboard reflects today's activity.
  await page.goto("/dashboard");
  await expect(page.getByText("words started")).toBeVisible();
  await expect(page.getByText(/^1$/).first()).toBeVisible();
});
