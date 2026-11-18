-- AlterTable
ALTER TABLE "Word" ADD COLUMN     "antonyms" TEXT[],
ADD COLUMN     "collocations" TEXT[],
ADD COLUMN     "mnemonicVi" TEXT,
ADD COLUMN     "moreExamples" JSONB,
ADD COLUMN     "synonyms" TEXT[],
ADD COLUMN     "wordFamily" TEXT[];

-- CreateTable
CREATE TABLE "WordNote" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "wordId" TEXT NOT NULL,
    "note" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "WordNote_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "WordNote_userId_wordId_key" ON "WordNote"("userId", "wordId");

-- AddForeignKey
ALTER TABLE "WordNote" ADD CONSTRAINT "WordNote_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WordNote" ADD CONSTRAINT "WordNote_wordId_fkey" FOREIGN KEY ("wordId") REFERENCES "Word"("id") ON DELETE CASCADE ON UPDATE CASCADE;
