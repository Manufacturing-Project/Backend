/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RawMaterialsModule } from './modules/raw-materials/raw-materials.module';
import * as dotenv from 'dotenv';
import { ConfigModule } from '@nestjs/config';
import { DatabaseConfig } from './config/Database.config';

import { CategoryModule } from './modules/category/Category.module'

dotenv.config();

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    RawMaterialsModule,
    DatabaseConfig,
    CategoryModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}  
