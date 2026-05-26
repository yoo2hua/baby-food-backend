-- CreateTable
CREATE TABLE "FeedingRecord" (
    "id" TEXT NOT NULL,
    "foodName" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "reaction" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "babyId" TEXT NOT NULL,

    CONSTRAINT "FeedingRecord_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "FeedingRecord" ADD CONSTRAINT "FeedingRecord_babyId_fkey" FOREIGN KEY ("babyId") REFERENCES "Baby"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
