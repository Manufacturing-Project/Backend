/* eslint-disable prettier/prettier */
import { IsString } from 'class-validator';


export class CreateUnitDto {
  @IsString()
  readonly unitName: string;
}
