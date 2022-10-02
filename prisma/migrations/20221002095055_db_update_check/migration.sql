-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Links" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "vk" TEXT,
    "twitter" TEXT,
    "facebook" TEXT,
    "profileId" INTEGER NOT NULL,
    CONSTRAINT "Links_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profile" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Links" ("facebook", "id", "profileId", "twitter", "vk") SELECT "facebook", "id", "profileId", "twitter", "vk" FROM "Links";
DROP TABLE "Links";
ALTER TABLE "new_Links" RENAME TO "Links";
CREATE UNIQUE INDEX "Links_profileId_key" ON "Links"("profileId");
CREATE TABLE "new_Profile" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "status" TEXT,
    "aboutMe" TEXT,
    "aboutMyJob" TEXT,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "Profile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Profile" ("aboutMe", "aboutMyJob", "id", "status", "userId") SELECT "aboutMe", "aboutMyJob", "id", "status", "userId" FROM "Profile";
DROP TABLE "Profile";
ALTER TABLE "new_Profile" RENAME TO "Profile";
CREATE UNIQUE INDEX "Profile_userId_key" ON "Profile"("userId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
