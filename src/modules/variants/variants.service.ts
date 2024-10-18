/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Variant } from './schemas/variant.schema';
import { CreateVariantDto } from './dto/create-variant.dto/create-variant.dto';

@Injectable()
export class VariantsService {
    constructor(@InjectModel('Variant') private variantModel: Model<Variant>) {}

    async create(createdVariantDto: CreateVariantDto): Promise<Variant> {
        const existingVariant = await this.variantModel.findOne({ variantName: createdVariantDto.variantName }).exec();
        if (existingVariant) {
          throw new Error(`Variant with name "${createdVariantDto.variantName}" already exists`);
        }
        const createdVariant = new this.variantModel(createdVariantDto);
        return createdVariant.save();
      }

      async isShortNameAvailable(shortName: string): Promise<boolean> {
        const variants = await this.variantModel.find({
          'values.shortName': shortName,
        }).exec();
    
        return variants.length === 0;
      }

      async generateUniqueShortName(value: string): Promise<string> {
        const words = value.split(' ').filter(word => word.length > 0);
        
        let shortName;

        if (words.length === 1) {
            shortName = words[0].substring(0, 3).toUpperCase(); // Take the first 3 letters
        } else {
            shortName = words
              .map(word => word[0].toUpperCase()) 
              .join('');
        }
      
        let isShortNameUnique = await this.isShortNameAvailable(shortName);
      
        // If the generated short name is not unique, append a number or change logic
        if (!isShortNameUnique) {
          for (let i = 1; i < 1000; i++) {
            const newShortName = `${shortName}${i}`;
            const isAvailable = await this.isShortNameAvailable(newShortName);
            if (isAvailable) {
              return newShortName;
            } 
          }
          throw new Error('Could not generate a unique short name');
        }
      
        return shortName;
      }
      
      
    
      async findAll(): Promise<Variant[]> {
        return this.variantModel.find().exec();
      }
    
      async findOne(id: string): Promise<Variant> {
        return this.variantModel.findById(id).exec();
      }



}
