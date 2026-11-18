-- AlterEnum
ALTER TYPE "QuizSkill" ADD VALUE 'READING';

-- AlterTable
ALTER TABLE "Deck" ADD COLUMN     "toeicBand" INTEGER;

-- AlterTable
ALTER TABLE "Question" ADD COLUMN     "passageId" TEXT;

-- AlterTable
ALTER TABLE "Quiz" ADD COLUMN     "toeicBand" INTEGER,
ADD COLUMN     "toeicPart" TEXT;

-- CreateTable
CREATE TABLE "Passage" (
    "id" TEXT NOT NULL,
    "quizId" TEXT NOT NULL,
    "order" INTEGER NOT NULL,
    "kind" TEXT NOT NULL,
    "title" TEXT,
    "content" TEXT,
    "audioText" TEXT,

    CONSTRAINT "Passage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LearnerProfile" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "toeicTarget" INTEGER,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "LearnerProfile_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Passage_quizId_order_key" ON "Passage"("quizId", "order");

-- CreateIndex
CREATE UNIQUE INDEX "LearnerProfile_userId_key" ON "LearnerProfile"("userId");

-- CreateIndex
CREATE INDEX "Deck_toeicBand_idx" ON "Deck"("toeicBand");

-- CreateIndex
CREATE INDEX "Quiz_toeicBand_idx" ON "Quiz"("toeicBand");

-- AddForeignKey
ALTER TABLE "Passage" ADD CONSTRAINT "Passage_quizId_fkey" FOREIGN KEY ("quizId") REFERENCES "Quiz"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Question" ADD CONSTRAINT "Question_passageId_fkey" FOREIGN KEY ("passageId") REFERENCES "Passage"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LearnerProfile" ADD CONSTRAINT "LearnerProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
