import { MeasureTypes } from "../@types/EnumMeasureTypes";

export default class Measure {
  id!: number;
  customerCode!: string;
  measureTime!: Date;
  measureType!: MeasureTypes;
  measureValue!: number | null;
  imageUrl!: string | null;
  hasConfirmed: boolean = false;
}
