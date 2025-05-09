-- CreateTable
CREATE TABLE "Friendship" (
    "id" TEXT NOT NULL,
    "userId1" TEXT NOT NULL,
    "userId2" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "blockedBy" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Friendship_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Friendship_userId1_userId2_idx" ON "Friendship"("userId1", "userId2");

-- CreateIndex
CREATE INDEX "Friendship_userId2_userId1_idx" ON "Friendship"("userId2", "userId1");

-- CreateIndex
CREATE UNIQUE INDEX "Friendship_userId1_userId2_key" ON "Friendship"("userId1", "userId2");

-- AddForeignKey
ALTER TABLE "Friendship" ADD CONSTRAINT "Friendship_userId1_fkey" FOREIGN KEY ("userId1") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Friendship" ADD CONSTRAINT "Friendship_userId2_fkey" FOREIGN KEY ("userId2") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
