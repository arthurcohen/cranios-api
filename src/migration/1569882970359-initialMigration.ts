import {MigrationInterface, QueryRunner} from "typeorm";

export class initialMigration1569882970359 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "user" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "username" varchar NOT NULL, "email" varchar NOT NULL, "name" varchar NOT NULL, "picture" varchar NOT NULL, "city" varchar NOT NULL, "participation" integer NOT NULL, "password" varchar NOT NULL, "admin" boolean NOT NULL)`);
        await queryRunner.query(`CREATE TABLE "transaction" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "value" integer NOT NULL, "type" integer NOT NULL, "userId" integer)`);
        await queryRunner.query(`CREATE TABLE "receipt" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "image" varchar NOT NULL, "observation" varchar NOT NULL, "status" integer NOT NULL, "transactionId" integer, CONSTRAINT "REL_02f14371c4e1087a220b14a65c" UNIQUE ("transactionId"))`);
        await queryRunner.query(`CREATE TABLE "temporary_transaction" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "value" integer NOT NULL, "type" integer NOT NULL, "userId" integer, CONSTRAINT "FK_605baeb040ff0fae995404cea37" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_transaction"("id", "value", "type", "userId") SELECT "id", "value", "type", "userId" FROM "transaction"`);
        await queryRunner.query(`DROP TABLE "transaction"`);
        await queryRunner.query(`ALTER TABLE "temporary_transaction" RENAME TO "transaction"`);
        await queryRunner.query(`CREATE TABLE "temporary_receipt" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "image" varchar NOT NULL, "observation" varchar NOT NULL, "status" integer NOT NULL, "transactionId" integer, CONSTRAINT "REL_02f14371c4e1087a220b14a65c" UNIQUE ("transactionId"), CONSTRAINT "FK_02f14371c4e1087a220b14a65c3" FOREIGN KEY ("transactionId") REFERENCES "transaction" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_receipt"("id", "image", "observation", "status", "transactionId") SELECT "id", "image", "observation", "status", "transactionId" FROM "receipt"`);
        await queryRunner.query(`DROP TABLE "receipt"`);
        await queryRunner.query(`ALTER TABLE "temporary_receipt" RENAME TO "receipt"`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "receipt" RENAME TO "temporary_receipt"`);
        await queryRunner.query(`CREATE TABLE "receipt" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "image" varchar NOT NULL, "observation" varchar NOT NULL, "status" integer NOT NULL, "transactionId" integer, CONSTRAINT "REL_02f14371c4e1087a220b14a65c" UNIQUE ("transactionId"))`);
        await queryRunner.query(`INSERT INTO "receipt"("id", "image", "observation", "status", "transactionId") SELECT "id", "image", "observation", "status", "transactionId" FROM "temporary_receipt"`);
        await queryRunner.query(`DROP TABLE "temporary_receipt"`);
        await queryRunner.query(`ALTER TABLE "transaction" RENAME TO "temporary_transaction"`);
        await queryRunner.query(`CREATE TABLE "transaction" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "value" integer NOT NULL, "type" integer NOT NULL, "userId" integer)`);
        await queryRunner.query(`INSERT INTO "transaction"("id", "value", "type", "userId") SELECT "id", "value", "type", "userId" FROM "temporary_transaction"`);
        await queryRunner.query(`DROP TABLE "temporary_transaction"`);
        await queryRunner.query(`DROP TABLE "receipt"`);
        await queryRunner.query(`DROP TABLE "transaction"`);
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
