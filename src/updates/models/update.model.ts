import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type UpdateDocument = Update & Document;

@Schema({ timestamps: true })
export class Update {
  _id: string;

  @Prop({ required: true, unique: true })
  version: string;

  @Prop({ required: true })
  downloadUrl: string;

  @Prop({ default: false })
  isCurrent: boolean;
}

export const UpdateSchema = SchemaFactory.createForClass(Update);

UpdateSchema.index({ isCurrent: 1 });
UpdateSchema.index({ createdAt: -1 });
