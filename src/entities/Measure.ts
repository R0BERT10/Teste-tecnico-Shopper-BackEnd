import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { MeasureTypes } from '../@types/EnumMeasureTypes';

export interface EssencialMeasure {
  customer_code: string
  measure_datetime: Date
  measure_type: MeasureTypes
}

@Entity()
export default class Measure implements EssencialMeasure {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ length: 50, nullable: false })
  customer_code!: string;

  @Column({ type: 'timestamptz', nullable: false })
  measure_datetime!: Date;

  @Column({ type: 'enum', enum: ['WATER', 'GAS'], nullable: false })
  measure_type!: MeasureTypes//'WATER' | 'GAS';

  @Column({ type: 'int', nullable: true })
  measure_value!: number | null;

  @Column({ type: 'text', nullable: true })
  image_url!: string | null;

  @Column({ type: 'boolean', default: false })
  has_confirmed!: boolean;
}
