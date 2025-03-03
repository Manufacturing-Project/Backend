/* eslint-disable prettier/prettier */
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { Logger } from '@nestjs/common';
import mongoose from 'mongoose';
 
const logger = new Logger('MongoDB');

export const DatabaseConfig = MongooseModule.forRootAsync({
  imports: [ConfigModule],
  useFactory: async (configService: ConfigService) => {
    const uri = configService.get<string>('MONGO_URI');
    
    // Log the URI to check if it's being correctly retrieved
    logger.log(`MongoDB URI: ${uri}`);

    // Listen for connection events
    mongoose.connection.on('connected', () => {
      logger.log(`Mongoose connected to ${uri}`);
    });

    mongoose.connection.on('error', (err) => {
      logger.error('Mongoose connection error:', err);
    });

    mongoose.connection.on('disconnected', () => {
      logger.warn('Mongoose disconnected');
    });

    return {
      uri,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };
  },
  inject: [ConfigService],
}); 
 