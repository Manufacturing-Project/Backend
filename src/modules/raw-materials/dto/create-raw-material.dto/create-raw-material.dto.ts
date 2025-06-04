/* eslint-disable prettier/prettier */
import {  IsString, IsNumber, IsBoolean } from 'class-validator';

export class CreateRawMaterialDto {

    @IsString()
     materialName: string;

    @IsString()
     materialCode: string;

    @IsString()
     category: string;
    
    @IsString()
     unitOfMeasure: string;

   @IsNumber()
    reorderLevel: number;

    @IsString()
     description: string;
    
    @IsBoolean() 
     hasVariants: boolean;

}
