# Migration `20200818081347-username-unique`

This migration has been generated at 8/18/2020, 10:13:47 AM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
PRAGMA foreign_keys=OFF;

CREATE UNIQUE INDEX "User.username_unique" ON "User"("username")

PRAGMA foreign_key_check;

PRAGMA foreign_keys=ON;
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20200818081146-user-username-mandatory-and-unique..20200818081347-username-unique
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
-  username   String
+  username   String  @unique
   ownedGames Game[]  @relation(name: "OwnedGames")
   games      Game[]  @relation(name: "Players", references: [id])
 }
```


