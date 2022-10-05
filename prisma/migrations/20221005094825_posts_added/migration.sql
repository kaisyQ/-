-- CreateTable
CREATE TABLE "Posts" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "text" TEXT,
    "likeCount" INTEGER NOT NULL DEFAULT 0,
    "profileId" INTEGER NOT NULL,
    CONSTRAINT "Posts_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profile" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Posts_profileId_key" ON "Posts"("profileId");
