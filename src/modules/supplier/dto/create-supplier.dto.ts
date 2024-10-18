/* eslint-disable prettier/prettier */
import {IsString, IsNumber } from 'class-validator';

export class CreateSupplierDto{

    @IsString()
    readonly supplierName: string;

    @IsString()
    readonly description    : string;

    @IsNumber()
    readonly supplierContactNumber: number;

    @IsString()
    readonly email: string;

    @IsString()
    readonly address: string;

}