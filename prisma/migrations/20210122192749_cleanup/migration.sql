/*
  Warnings:

  - You are about to drop the column `backgroundFileName` on the `Game` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Game" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "ownerId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "lastGameDate" TEXT,
    "nextGameDate" TEXT,
    "backgroundUrl" TEXT,
    FOREIGN KEY ("ownerId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Game" ("id", "ownerId", "name", "description", "lastGameDate", "nextGameDate", "backgroundUrl") SELECT "id", "ownerId", "name", "description", "lastGameDate", "nextGameDate", "backgroundUrl" FROM "Game";
DROP TABLE "Game";
ALTER TABLE "new_Game" RENAME TO "Game";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
