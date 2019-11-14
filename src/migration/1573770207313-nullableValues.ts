import {MigrationInterface, QueryRunner} from "typeorm";

export class nullableValues1573770207313 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "temporary_receipt" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "image" varchar NOT NULL, "observation" varchar NOT NULL, "status" integer NOT NULL, "transactionId" integer, CONSTRAINT "UQ_02f14371c4e1087a220b14a65c3" UNIQUE ("transactionId"), CONSTRAINT "FK_02f14371c4e1087a220b14a65c3" FOREIGN KEY ("transactionId") REFERENCES "transaction" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_receipt"("id", "image", "observation", "status", "transactionId") SELECT "id", "image", "observation", "status", "transactionId" FROM "receipt"`);
        await queryRunner.query(`DROP TABLE "receipt"`);
        await queryRunner.query(`ALTER TABLE "temporary_receipt" RENAME TO "receipt"`);
        await queryRunner.query(`CREATE TABLE "temporary_receipt" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "image" varchar NOT NULL, "observation" varchar, "status" integer NOT NULL, "transactionId" integer, CONSTRAINT "UQ_02f14371c4e1087a220b14a65c3" UNIQUE ("transactionId"), CONSTRAINT "FK_02f14371c4e1087a220b14a65c3" FOREIGN KEY ("transactionId") REFERENCES "transaction" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_receipt"("id", "image", "observation", "status", "transactionId") SELECT "id", "image", "observation", "status", "transactionId" FROM "receipt"`);
        await queryRunner.query(`DROP TABLE "receipt"`);
        await queryRunner.query(`ALTER TABLE "temporary_receipt" RENAME TO "receipt"`);
        await queryRunner.query(`CREATE TABLE "temporary_user" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "username" varchar NOT NULL, "email" varchar NOT NULL, "name" varchar NOT NULL, "picture" varchar, "city" varchar, "participation" integer NOT NULL, "password" varchar NOT NULL, "admin" boolean NOT NULL DEFAULT (0))`);
        await queryRunner.query(`INSERT INTO "temporary_user"("id", "username", "email", "name", "picture", "city", "participation", "password", "admin") SELECT "id", "username", "email", "name", "picture", "city", "participation", "password", "admin" FROM "user"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`ALTER TABLE "temporary_user" RENAME TO "user"`);
        await queryRunner.query(`CREATE TABLE "temporary_news" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "header" varchar NOT NULL, "body" varchar NOT NULL, "image" varchar, "headerImage" varchar NOT NULL, "createdAt" datetime NOT NULL DEFAULT (1573770207731), "userId" integer, CONSTRAINT "FK_9198b86c4c22bf6852c43f3b44e" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_news"("id", "header", "body", "image", "headerImage", "createdAt", "userId") SELECT "id", "header", "body", "image", "headerImage", "createdAt", "userId" FROM "news"`);
        await queryRunner.query(`DROP TABLE "news"`);
        await queryRunner.query(`ALTER TABLE "temporary_news" RENAME TO "news"`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "news" RENAME TO "temporary_news"`);
        await queryRunner.query(`CREATE TABLE "news" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "header" varchar NOT NULL, "body" varchar NOT NULL, "image" varchar, "headerImage" varchar NOT NULL, "createdAt" datetime NOT NULL DEFAULT (1573769826859), "userId" integer, CONSTRAINT "FK_9198b86c4c22bf6852c43f3b44e" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "news"("id", "header", "body", "image", "headerImage", "createdAt", "userId") SELECT "id", "header", "body", "image", "headerImage", "createdAt", "userId" FROM "temporary_news"`);
        await queryRunner.query(`DROP TABLE "temporary_news"`);
        await queryRunner.query(`ALTER TABLE "user" RENAME TO "temporary_user"`);
        await queryRunner.query(`CREATE TABLE "user" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "username" varchar NOT NULL, "email" varchar NOT NULL, "name" varchar NOT NULL, "picture" varchar NOT NULL, "city" varchar NOT NULL, "participation" integer NOT NULL, "password" varchar NOT NULL, "admin" boolean NOT NULL)`);
        await queryRunner.query(`INSERT INTO "user"("id", "username", "email", "name", "picture", "city", "participation", "password", "admin") SELECT "id", "username", "email", "name", "picture", "city", "participation", "password", "admin" FROM "temporary_user"`);
        await queryRunner.query(`DROP TABLE "temporary_user"`);
        await queryRunner.query(`ALTER TABLE "receipt" RENAME TO "temporary_receipt"`);
        await queryRunner.query(`CREATE TABLE "receipt" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "image" varchar NOT NULL, "observation" varchar NOT NULL, "status" integer NOT NULL, "transactionId" integer, CONSTRAINT "UQ_02f14371c4e1087a220b14a65c3" UNIQUE ("transactionId"), CONSTRAINT "FK_02f14371c4e1087a220b14a65c3" FOREIGN KEY ("transactionId") REFERENCES "transaction" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "receipt"("id", "image", "observation", "status", "transactionId") SELECT "id", "image", "observation", "status", "transactionId" FROM "temporary_receipt"`);
        await queryRunner.query(`DROP TABLE "temporary_receipt"`);
        await queryRunner.query(`ALTER TABLE "receipt" RENAME TO "temporary_receipt"`);
        await queryRunner.query(`CREATE TABLE "receipt" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "image" varchar NOT NULL, "observation" varchar NOT NULL, "status" integer NOT NULL, "transactionId" integer, CONSTRAINT "UQ_02f14371c4e1087a220b14a65c3" UNIQUE ("transactionId"), CONSTRAINT "FK_02f14371c4e1087a220b14a65c3" FOREIGN KEY ("transactionId") REFERENCES "transaction" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "receipt"("id", "image", "observation", "status", "transactionId") SELECT "id", "image", "observation", "status", "transactionId" FROM "temporary_receipt"`);
        await queryRunner.query(`DROP TABLE "temporary_receipt"`);
    }

}
