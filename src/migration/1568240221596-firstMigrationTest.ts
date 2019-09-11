import {MigrationInterface, QueryRunner} from "typeorm";

export class firstMigrationTest1568240221596 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "receipt" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "image" varchar NOT NULL, "observation" varchar NOT NULL, "status" integer NOT NULL)`);
        await queryRunner.query(`CREATE TABLE "user" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "username" varchar NOT NULL, "email" varchar NOT NULL, "name" varchar NOT NULL, "picture" varchar NOT NULL, "city" varchar NOT NULL, "participation" integer NOT NULL, "password" varchar NOT NULL)`);
        await queryRunner.query(`CREATE TABLE "transaction" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "value" integer NOT NULL, "type" integer NOT NULL, "userId" integer)`);
        await queryRunner.query(`CREATE TABLE "temporary_transaction" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "value" integer NOT NULL, "type" integer NOT NULL, "userId" integer, CONSTRAINT "FK_605baeb040ff0fae995404cea37" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_transaction"("id", "value", "type", "userId") SELECT "id", "value", "type", "userId" FROM "transaction"`);
        await queryRunner.query(`DROP TABLE "transaction"`);
        await queryRunner.query(`ALTER TABLE "temporary_transaction" RENAME TO "transaction"`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "transaction" RENAME TO "temporary_transaction"`);
        await queryRunner.query(`CREATE TABLE "transaction" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "value" integer NOT NULL, "type" integer NOT NULL, "userId" integer)`);
        await queryRunner.query(`INSERT INTO "transaction"("id", "value", "type", "userId") SELECT "id", "value", "type", "userId" FROM "temporary_transaction"`);
        await queryRunner.query(`DROP TABLE "temporary_transaction"`);
        await queryRunner.query(`DROP TABLE "transaction"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "receipt"`);
    }

}
