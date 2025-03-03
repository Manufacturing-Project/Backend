/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { CategoryService } from './Category.service';
import { CategoryController } from './Category.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CategorySchema } from './schemas/Category.schema';

@Module({
    imports: [MongooseModule.forFeature([{ name: 'Category', schema: CategorySchema }])],
    controllers: [CategoryController],
    providers: [CategoryService],
})
export class CategoryModule {}
