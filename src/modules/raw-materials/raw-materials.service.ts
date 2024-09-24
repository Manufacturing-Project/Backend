import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { RawMaterial } from './schemas/raw-material.schema';
import { Model } from 'mongoose';
import { CreateRawMaterialDto } from './dto/create-raw-material.dto/create-raw-material.dto';


@Injectable()
export class RawMaterialsService {

    constructor(@InjectModel('RawMaterial') private readonly rawMaterialModel: Model<RawMaterial>) {}
 
    async create(createRawMaterialDto: CreateRawMaterialDto): Promise<RawMaterial> {
        const newRawMaterial = new this.rawMaterialModel(createRawMaterialDto);
        return await newRawMaterial.save(); 
      }  


    async findAll(): Promise<RawMaterial[]> { 
     
      const result = await this.rawMaterialModel.find().exec();

      return result;
      } 

      async generateUniqueMaterialCode(materialName: string): Promise<string> {
        const words = materialName.split(' ').filter(word => word.length > 0);
      
        let shortName;
      
        if (words.length === 1) {
          shortName = words[0].substring(0, 3).toUpperCase(); // Take the first 3 letters
        } else {
          shortName = words.map(word => word[0].toUpperCase()).join('');
        }
      
        let isShortNameUnique = await this.isMaterialCodeTaken(shortName);
        console.log('Generated short name:', shortName, 'Is unique?', isShortNameUnique);
      
        if (isShortNameUnique) {
          for (let i = 1; i < 1000; i++) {
            const newShortName = `${shortName}${i}`;
            const isAvailable = await this.isMaterialCodeTaken(newShortName);
            console.log('Trying short name:', newShortName, 'Is available?', isAvailable);
      
            if (isAvailable) {
              return newShortName; 
            }
          }
          throw new Error('Could not generate a unique short name');
        }
      
        return shortName;
      }
      

      async isMaterialCodeTaken(materialCode: string): Promise<boolean> {
        const existingMaterial = await this.rawMaterialModel.findOne({ materialCode });
        return !!existingMaterial; 
      }

}
