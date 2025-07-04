/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, Post, Put,  } from '@nestjs/common';
import { RawMaterialsService  } from './raw-materials.service';
import { RawMaterial } from './schemas/raw-material.schema';
import { CreateRawMaterialDto } from './dto/create-raw-material.dto/create-raw-material.dto';
import { AddVariantDto } from './dto/create-raw-material.dto/variants-of-material.dto';
@Controller('materials')
export class RawMaterialsController {
  constructor(private readonly rawMaterialsService: RawMaterialsService) {}

  @Post()
  async create(@Body() rawMaterialDto: CreateRawMaterialDto): Promise<RawMaterial> {
    return await this.rawMaterialsService.create(rawMaterialDto); 
  } 
 
  @Get() 
  async findAll(): Promise<RawMaterial[]> { 
    const result = await this.rawMaterialsService.findAll();
    return result;

  }
  @Delete(':id')
  async delete(@Param('id') id: string): Promise<{ message: string }> {
    this.rawMaterialsService.deleteMaterial(id);
    return { message: 'Raw material deleted successfully' };
  }

  @Put(':id')
  async update( @Param('id') id: string,
    @Body() rawMaterialDto: CreateRawMaterialDto,
  ): Promise<RawMaterial> {
    return await this.rawMaterialsService.updateMaterial(id, rawMaterialDto);
  }

  @Post('generate-material-code')
  async generateUniqueMaterialCode(@Body('materialName') materialName: string) {
    return this.rawMaterialsService.generateUniqueMaterialCode(materialName);
  }

  @Post('check-material-code')
  async isMaterialCodeTaken(@Body('materialCode') materialCode: string) {
    const isTaken = await this.rawMaterialsService.isMaterialCodeTaken(materialCode);
    return { available: !isTaken };
  }

  @Post(':id/variants')
  async addVariant(
    @Param('id') materialId: string,
    @Body() addVariantDto: AddVariantDto,
  ) {
    return await this.rawMaterialsService.addVariant(materialId, addVariantDto);
  }

  @Get(':id/variants')
  async getVariants(@Param('id') materialId: string) {
    return await this.rawMaterialsService.getVariants(materialId);
  } 
} 
