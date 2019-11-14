import {MigrationInterface, QueryRunner} from "typeorm";

export class removingUnneededParameter1573771442913 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "temporary_news" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "header" varchar NOT NULL, "body" varchar NOT NULL, "image" varchar, "headerImage" varchar NOT NULL, "userId" integer, CONSTRAINT "FK_9198b86c4c22bf6852c43f3b44e" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_news"("id", "header", "body", "image", "headerImage", "userId") SELECT "id", "header", "body", "image", "headerImage", "userId" FROM "news"`);
        await queryRunner.query(`DROP TABLE "news"`);
        await queryRunner.query(`ALTER TABLE "temporary_news" RENAME TO "news"`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "news" RENAME TO "temporary_news"`);
        await queryRunner.query(`CREATE TABLE "news" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "header" varchar NOT NULL, "body" varchar NOT NULL, "image" varchar, "headerImage" varchar NOT NULL, "createdAt" datetime NOT NULL DEFAULT (1573770207731), "userId" integer, CONSTRAINT "FK_9198b86c4c22bf6852c43f3b44e" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "news"("id", "header", "body", "image", "headerImage", "userId") SELECT "id", "header", "body", "image", "headerImage", "userId" FROM "temporary_news"`);
        await queryRunner.query(`DROP TABLE "temporary_news"`);
    }

}
