# Migration `20200818081146-user-username-mandatory-and-unique`

This migration has been generated at 8/18/2020, 10:11:46 AM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
PRAGMA foreign_keys=OFF;

CREATE TABLE "new_User" (
"id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
"email" TEXT NOT NULL,
"password" TEXT NOT NULL,
"username" TEXT NOT NULL)

INSERT INTO "new_User" ("id", "email", "password", "username") SELECT "id", "email", "password", "username" FROM "User"

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
migration 20200817080508-game-players..20200818081146-user-username-mandatory-and-unique
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
@@ -13,9 +13,9 @@
 model User {
   id         Int     @id @default(autoincrement())
   email      String  @unique
   password   String
-  username   String?
+  username   String
   ownedGames Game[]  @relation(name: "OwnedGames")
   games      Game[]  @relation(name: "Players", references: [id])
 }
```


