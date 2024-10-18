/* eslint-disable prettier/prettier */
import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema({timestamps: true})
export class Category extends Document {

  _id: string;

  @Prop({ required: true, unique: true })
  name: string;
 
  craeteAt: Date;
  updatedAt: Date;
}

export const CategorySchema = SchemaFactory.createForClass(Category);