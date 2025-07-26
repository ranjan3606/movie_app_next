import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema, Types } from 'mongoose';
import { User } from './user.schema';

export type MovieDocument = Movie & Document;

@Schema({ timestamps: true })
export class Movie extends Document {
  _id: Types.ObjectId;

  @Prop({ required: true })
  title: string;

  @Prop()
  description: string;

  @Prop()
  releaseDate: Date;

  @Prop({ min: 0, max: 10 })
  rating: number;

  @Prop()
  imageUrl: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User', required: true })
  userId: MongooseSchema.Types.ObjectId;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now })
  updatedAt: Date;
}

export const MovieSchema = SchemaFactory.createForClass(Movie); 