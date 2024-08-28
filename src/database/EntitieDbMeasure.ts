
/*
@Entity("measures")
export default class Measure {
    @PrimaryColumn({ name: "uuid", type: "uuid"})
    uuid!: string

    @Column({ name: "customer_code", type: "varchar", nullable: false, length: 50 })
    customerCode!: string

    @Column({ name: "measure_datetime", type: "time with time zone", nullable: false})
    measureTime!: Date

    @Column({ name: "measure_type", type: "varchar", nullable: false, length: 10 })
    measureType!: string

    @CreateDateColumn({ name: "created_at", type: "timestamp", nullable: false })
    createdAt!: Date

    @CreateDateColumn({ name: "last_login_at", type: "timestamp", nullable: false })
    lastLoginAt!: Date

    idToken: string = ""

    refreshToken: string = ""
}
*/
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export default class DbMeasure {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 50, nullable: false })
  customer_code!: string;

  @Column({ type: 'timestamptz', nullable: false })
  measure_datetime!: Date;

  @Column({ type: 'enum', enum: ['WATER', 'GAS'], nullable: false })
  measure_type!: 'WATER' | 'GAS';

  @Column({ type: 'int', nullable: true })
  measure_value!: number | null;

  @Column({ type: 'text', nullable: true })
  image_url!: string | null;

  @Column({ type: 'boolean', default: false })
  has_confirmed!: boolean;
}