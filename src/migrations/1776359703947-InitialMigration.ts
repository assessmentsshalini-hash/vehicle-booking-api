import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialMigration1776359703947 implements MigrationInterface {
  name = 'InitialMigration1776359703947';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."booking_pricing_mode_enum" AS ENUM('hourly', 'daily')`,
    );
    await queryRunner.query(
      `CREATE TABLE "booking" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "pickup_date_time" TIMESTAMP NOT NULL, "return_date_time" TIMESTAMP NOT NULL, "pricing_mode" "public"."booking_pricing_mode_enum" NOT NULL, "total_amount" integer NOT NULL, "vehicle_id" integer NOT NULL, "vehicleId" integer, CONSTRAINT "PK_49171efc69702ed84c812f33540" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."vehicle_status_enum" AS ENUM('active', 'inactive')`,
    );
    await queryRunner.query(
      `CREATE TABLE "vehicle" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "title" character varying NOT NULL, "hourly_rate" integer NOT NULL, "daily_rate" integer NOT NULL, "status" "public"."vehicle_status_enum" NOT NULL, CONSTRAINT "PK_187fa17ba39d367e5604b3d1ec9" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "booking" ADD CONSTRAINT "FK_dc9f6a94644e45d49872c1e2f10" FOREIGN KEY ("vehicleId") REFERENCES "vehicle"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "booking" DROP CONSTRAINT "FK_dc9f6a94644e45d49872c1e2f10"`,
    );
    await queryRunner.query(`DROP TABLE "vehicle"`);
    await queryRunner.query(`DROP TYPE "public"."vehicle_status_enum"`);
    await queryRunner.query(`DROP TABLE "booking"`);
    await queryRunner.query(`DROP TYPE "public"."booking_pricing_mode_enum"`);
  }
}
