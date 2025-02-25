/* eslint-disable prettier/prettier */
import { IsString, IsArray, IsNotEmpty } from 'class-validator';

export class AddVariantDto {
  @IsString()
  @IsNotEmpty()
  readonly variant: string;

  @IsArray()
  @IsString({ each: true })
  @IsNotEmpty()
  readonly values: string[];
}