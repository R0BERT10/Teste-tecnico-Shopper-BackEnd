import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';
import { MeasureTypes } from '../@types/EnumMeasureTypes';

export interface MeasureDTO {
  customer_code: string
  measure_datetime: Date
  measure_type: MeasureTypes
  measure_value: number | null
  image_url?: string | null
  has_confirmed: boolean
}

@Entity()
export default class Measure implements MeasureDTO {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ length: 50, nullable: false })
  customer_code!: string;

  @Column({ type: 'timestamp', nullable: false })
  measure_datetime!: Date;

  @Column({ type: 'enum', enum: ['WATER', 'GAS'], nullable: false })
  measure_type!: MeasureTypes//'WATER' | 'GAS';

  @Column({ type: 'int', nullable: true })
  measure_value!: number | null;

  @Column({ type: 'text', nullable: true })
  image_url!: string | null;

  @Column({ type: 'boolean', default: false })
  has_confirmed!: boolean;

  @CreateDateColumn({type: "timestamp", nullable: false})
  created_at!: Date
}
