# Migration `20200816122343-game-model-init`

This migration has been generated at 8/16/2020, 2:23:43 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
PRAGMA foreign_keys=OFF;

CREATE TABLE "Game" (
"id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
"ownerId" INTEGER NOT NULL,
"name" TEXT NOT NULL,
"description" TEXT ,
"lastGameDate" TEXT ,
"nextGameDate" TEXT ,
FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE
)

CREATE TABLE "new_User" (
"id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
"email" TEXT NOT NULL,
"password" TEXT NOT NULL,
"username" TEXT )

INSERT INTO "new_User" ("email", "id", "password", "username") SELECT "email", "id", "password", "username" FROM "User"

PRAGMA foreign_keys=off;
DROP TABLE "User";;
PRAGMA foreign_keys=on

ALTER TABLE "new_User" RENAME TO "User";

CREATE UNIQUE INDEX "User.email_unique" ON "User"("email")

PRAGMA foreign_key_check;

PRAGMA foreign_keys=ON;
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20200501220033-init..20200816122343-game-model-init
--- datamodel.dml
+++ datamodel.dml
@@ -2,17 +2,28 @@
 // learn more about it in the docs: https://pris.ly/d/prisma-schema
 datasource db {
   provider = "sqlite"
-  url = "***"
+  url = "***"
 }
 generator client {
   provider = "prisma-client-js"
 }
 model User {
-  id       Int     @id @default(autoincrement())
-  email    String  @unique
-  password String
-  username String?
+  id         Int     @id @default(autoincrement())
+  email      String  @unique
+  password   String
+  username   String?
+  ownedGames Game[]
+}
+
+model Game {
+  id           Int     @id @default(autoincrement())
+  owner        User    @relation(fields: [ownerId], references: [id])
+  ownerId      Int
+  name         String
+  description  String?
+  lastGameDate String?
+  nextGameDate String?
 }
```


