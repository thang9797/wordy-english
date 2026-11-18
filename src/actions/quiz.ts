"use server";

import { redirect } from "next/navigation";
import { z } from "zod";
import { db } from "@/lib/db";
import { recordActivity } from "@/lib/activity";
import { isCorrectAnswer } from "@/lib/grading";
import { requireUser } from "@/lib/session";

const submitSchema = z.object({
  quizId: z.string().min(1),
  answers: z.record(z.string(), z.string().max(200)),
});

/** Grades a quiz on the server (the client never sends a score) and opens the results page. */
export async function submitQuiz(input: { quizId: string; answers: Record<string, string> }) {
  const user = await requireUser();
  const { quizId, answers } = submitSchema.parse(input);

  const quiz = await db.quiz.findUnique({
    where: { id: quizId },
    include: { questions: { select: { id: true, type: true, correctAnswer: true } } },
  });
  if (!quiz) throw new Error("Quiz not found");

  const graded = quiz.questions.map((q) => {
    const answer = answers[q.id] ?? "";
    const forgiveTypos = q.type === "FILL_BLANK";
    return { questionId: q.id, answer, isCorrect: isCorrectAnswer(answer, q.correctAnswer, { forgiveTypos }) };
  });
  const score = graded.filter((g) => g.isCorrect).length;

  const attempt = await db.quizAttempt.create({
    data: {
      userId: user.id,
      quizId: quiz.id,
      score,
      total: graded.length,
      answers: { create: graded },
    },
    select: { id: true },
  });
  await recordActivity(user.id, "quizzes");

  redirect(`/quizzes/${quiz.slug}/results/${attempt.id}`);
}
