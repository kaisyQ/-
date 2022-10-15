-- CreateTable
CREATE TABLE "Chats" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "text" TEXT
);

-- CreateTable
CREATE TABLE "ChatsWithProfiles" (
    "profileId" INTEGER NOT NULL,
    "chatId" INTEGER NOT NULL,

    PRIMARY KEY ("profileId", "chatId"),
    CONSTRAINT "ChatsWithProfiles_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profile" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ChatsWithProfiles_chatId_fkey" FOREIGN KEY ("chatId") REFERENCES "Chats" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
