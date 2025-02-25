/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RawMaterialsModule } from './modules/raw-materials/raw-materials.module';
import * as dotenv from 'dotenv';
import { ConfigModule } from '@nestjs/config';
import { DatabaseConfig } from './config/Database.config';
import { VariantsModule } from './modules/variants/variants.module';
import { UnitModule } from './modules/unit/unit.module';
import {AuthModule} from './modules/authentication/Auth.module'
import { CategoryModule } from './modules/category/Category.module'
import { UserModule } from './modules/user/User.module';

dotenv.config();

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    RawMaterialsModule,
    AuthModule,
    DatabaseConfig,
    CategoryModule,
    VariantsModule,
    UnitModule,
    UserModule,
  ],
  controllers: [AppController,],
  providers: [AppService],
})
export class AppModule {}  
