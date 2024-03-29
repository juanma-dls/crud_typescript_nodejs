import {MigrationInterface, QueryRunner} from "typeorm";

export class newFieldsUsers11659400675516 implements MigrationInterface {
    name = 'newFieldsUsers11659400675516'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "products" ("id" varchar PRIMARY KEY NOT NULL, "productname" varchar NOT NULL, "price" integer NOT NULL, "type" varchar NOT NULL, "categoryId" varchar NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')))`);
        await queryRunner.query(`CREATE TABLE "category" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')))`);
        await queryRunner.query(`CREATE TABLE "temporary_users" ("id" varchar PRIMARY KEY NOT NULL, "username" varchar NOT NULL, "email" varchar NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "password" varchar NOT NULL, "phone" varchar NOT NULL, "name" varchar NOT NULL, "lastname" varchar NOT NULL, "rol" varchar NOT NULL)`);
        await queryRunner.query(`INSERT INTO "temporary_users"("id", "username", "email", "created_at", "updated_at", "password", "phone", "name", "lastname") SELECT "id", "username", "email", "created_at", "updated_at", "password", "phone", "name", "lastname" FROM "users"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`ALTER TABLE "temporary_users" RENAME TO "users"`);
        await queryRunner.query(`CREATE TABLE "temporary_users" ("id" varchar PRIMARY KEY NOT NULL, "username" varchar NOT NULL, "email" varchar NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "password" varchar NOT NULL, "phone" varchar NOT NULL, "name" varchar NOT NULL, "lastname" varchar NOT NULL, "rol" varchar NOT NULL)`);
        await queryRunner.query(`INSERT INTO "temporary_users"("id", "username", "email", "created_at", "updated_at", "password", "phone", "name", "lastname") SELECT "id", "username", "email", "created_at", "updated_at", "password", "phone", "name", "lastname" FROM "users"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`ALTER TABLE "temporary_users" RENAME TO "users"`);
        await queryRunner.query(`CREATE TABLE "temporary_products" ("id" varchar PRIMARY KEY NOT NULL, "productname" varchar NOT NULL, "price" integer NOT NULL, "type" varchar NOT NULL, "categoryId" varchar NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), CONSTRAINT "FK_ff56834e735fa78a15d0cf21926" FOREIGN KEY ("categoryId") REFERENCES "category" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_products"("id", "productname", "price", "type", "categoryId", "created_at", "updated_at") SELECT "id", "productname", "price", "type", "categoryId", "created_at", "updated_at" FROM "products"`);
        await queryRunner.query(`DROP TABLE "products"`);
        await queryRunner.query(`ALTER TABLE "temporary_products" RENAME TO "products"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" RENAME TO "temporary_products"`);
        await queryRunner.query(`CREATE TABLE "products" ("id" varchar PRIMARY KEY NOT NULL, "productname" varchar NOT NULL, "price" integer NOT NULL, "type" varchar NOT NULL, "categoryId" varchar NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')))`);
        await queryRunner.query(`INSERT INTO "products"("id", "productname", "price", "type", "categoryId", "created_at", "updated_at") SELECT "id", "productname", "price", "type", "categoryId", "created_at", "updated_at" FROM "temporary_products"`);
        await queryRunner.query(`DROP TABLE "temporary_products"`);
        await queryRunner.query(`ALTER TABLE "users" RENAME TO "temporary_users"`);
        await queryRunner.query(`CREATE TABLE "users" ("id" varchar PRIMARY KEY NOT NULL, "username" varchar NOT NULL, "email" varchar NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "password" varchar NOT NULL, "phone" varchar NOT NULL, "name" varchar NOT NULL, "lastname" varchar NOT NULL, "rol" varchar NOT NULL)`);
        await queryRunner.query(`INSERT INTO "users"("id", "username", "email", "created_at", "updated_at", "password", "phone", "name", "lastname") SELECT "id", "username", "email", "created_at", "updated_at", "password", "phone", "name", "lastname" FROM "temporary_users"`);
        await queryRunner.query(`DROP TABLE "temporary_users"`);
        await queryRunner.query(`ALTER TABLE "users" RENAME TO "temporary_users"`);
        await queryRunner.query(`CREATE TABLE "users" ("id" varchar PRIMARY KEY NOT NULL, "username" varchar NOT NULL, "email" varchar NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "password" varchar NOT NULL, "phone" varchar NOT NULL,  "name" varchar NOT NULL, "lastname" varchar NOT NULL, "rol" varchar NOT NULL)`);
        await queryRunner.query(`INSERT INTO "users"("id", "username", "email", "created_at", "updated_at", "password", "phone", "name", "lastname") SELECT "id", "username", "email", "created_at", "updated_at", "password", "phone", "name", "lastname" FROM "temporary_users"`);
        await queryRunner.query(`DROP TABLE "temporary_users"`);
        await queryRunner.query(`DROP TABLE "category"`);
        await queryRunner.query(`DROP TABLE "products"`);
    }

}
