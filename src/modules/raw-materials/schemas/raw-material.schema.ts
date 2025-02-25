/* eslint-disable prettier/prettier */
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Variant {
  @Prop({ required: true })
  variant: string;

  @Prop({ type: [String], required: true })
  values: string[];
}

@Schema()
export class RawMaterial extends Document {
 
  @Prop({ required: true })
  materialName: string;

  @Prop({ required: true, unique: true })
  materialCode: string;

  @Prop({ required: true })
  category: string;

  @Prop({ required: true })
  unitOfMeasure: string;

  @Prop({ required: true })
  reorderLevel: number;

  @Prop({ type: String, default: '' })
  description?: string;

  @Prop({ required: true, default: false })
  hasVariants: boolean;

  @Prop({ type: [Variant], default: [] })
  variants: Variant[];
  
}

export const RawMaterialSchema = SchemaFactory.createForClass(RawMaterial);
