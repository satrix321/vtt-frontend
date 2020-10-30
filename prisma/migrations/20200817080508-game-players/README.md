# Migration `20200817080508-game-players`

This migration has been generated at 8/17/2020, 10:05:08 AM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
PRAGMA foreign_keys=OFF;

CREATE TABLE "_Players" (
"A" INTEGER NOT NULL,
"B" INTEGER NOT NULL,
FOREIGN KEY ("A") REFERENCES "Game"("id") ON DELETE CASCADE ON UPDATE CASCADE,

FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE
)

CREATE UNIQUE INDEX "_Players_AB_unique" ON "_Players"("A","B")

CREATE  INDEX "_Players_B_index" ON "_Players"("B")

PRAGMA foreign_key_check;

PRAGMA foreign_keys=ON;
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20200816122343-game-model-init..20200817080508-game-players
--- datamodel.dml
+++ datamodel.dml
@@ -2,9 +2,9 @@
 // learn more about it in the docs: https://pris.ly/d/prisma-schema
 datasource db {
   provider = "sqlite"
-  url = "***"
+  url = "***"
 }
 generator client {
   provider = "prisma-client-js"
@@ -14,16 +14,18 @@
   id         Int     @id @default(autoincrement())
   email      String  @unique
   password   String
   username   String?
-  ownedGames Game[]
+  ownedGames Game[]  @relation(name: "OwnedGames")
+  games      Game[]  @relation(name: "Players", references: [id])
 }
 model Game {
   id           Int     @id @default(autoincrement())
-  owner        User    @relation(fields: [ownerId], references: [id])
+  owner        User    @relation(name: "OwnedGames", fields: [ownerId], references: [id])
   ownerId      Int
   name         String
   description  String?
   lastGameDate String?
   nextGameDate String?
+  players      User[]  @relation(name: "Players", references: [id])
 }
```


