# Migration `20201115081721-game-background-url`

This migration has been generated by Krzysztof Szot at 11/15/2020, 9:17:21 AM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
ALTER TABLE "Game" ADD COLUMN     "backgroundUrl" TEXT
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20200818081347-username-unique..20201115081721-game-background-url
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
@@ -19,13 +19,14 @@
   games      Game[]  @relation(name: "Players", references: [id])
 }
 model Game {
-  id           Int     @id @default(autoincrement())
-  owner        User    @relation(name: "OwnedGames", fields: [ownerId], references: [id])
-  ownerId      Int
-  name         String
-  description  String?
-  lastGameDate String?
-  nextGameDate String?
-  players      User[]  @relation(name: "Players", references: [id])
+  id            Int     @id @default(autoincrement())
+  owner         User    @relation(name: "OwnedGames", fields: [ownerId], references: [id])
+  ownerId       Int
+  name          String
+  description   String?
+  lastGameDate  String?
+  nextGameDate  String?
+  players       User[]  @relation(name: "Players", references: [id])
+  backgroundUrl String?
 }
```

