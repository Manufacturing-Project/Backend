/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { VariantsService } from './variants.service';
import { Variant } from './schemas/variant.schema';
import { CreateVariantDto } from './dto/create-variant.dto/create-variant.dto';

@Controller('variants')
export class VariantsController {
  constructor(private readonly variantsService: VariantsService) {}

  @Post()
  async create(@Body() createVariantDto: CreateVariantDto): Promise<Variant> {
    return this.variantsService.create(createVariantDto);
  }

  @Post('check-shortName')
  async isShortNameAvailable(@Body('shortName') shortName: string) {
    const isAvailable = await this.variantsService.isShortNameAvailable(shortName);
    return { available: isAvailable };
  }

  @Post('generate-shortName')
  async generateUniqueShortName(@Body('value') value: string) {
    return this.variantsService.generateUniqueShortName(value);
  }
  
  

  @Get()
  async findAll() {
    return this.variantsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.variantsService.findOne(id);
  }

  
}
