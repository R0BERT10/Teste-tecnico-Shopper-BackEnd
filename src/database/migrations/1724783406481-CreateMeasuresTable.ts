import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateMeasuresTable1724783406481 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE EXTENSION IF NOT EXISTS "pgcrypto";
            
            CREATE TABLE measures (
                id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
                customer_code VARCHAR(50) NOT NULL,
                measure_datetime TIMESTAMP WITH TIME ZONE NOT NULL,
                measure_type VARCHAR(10) NOT NULL CHECK (measure_type IN ('WATER', 'GAS')),
                measure_value INTEGER,
                image_url TEXT,
                has_confirmed BOOLEAN DEFAULT FALSE
            );
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE measures;`);
    }

}
