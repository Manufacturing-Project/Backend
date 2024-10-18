/* eslint-disable prettier/prettier */
import {  IsString, IsNumber, IsBoolean } from 'class-validator';

export class CreateRawMaterialDto {

    @IsString()
    readonly materialName: string;

    @IsString()
    readonly materialCode: string;

    @IsString()
    readonly category: string;
    
    @IsString()
    readonly unitOfMeasure: string;

    @IsNumber()  
    readonly reorderLevel: number;
    
    @IsString()
    readonly description?: string;
    
    @IsBoolean() 
    readonly hasVariants: boolean;

}
