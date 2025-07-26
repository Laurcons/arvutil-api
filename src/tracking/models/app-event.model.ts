import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type AppEventDocument = AppEvent & Document;

@Schema({ timestamps: true })
export class AppEvent {
  _id: string;

  @Prop({ required: true, maxlength: 128 })
  deviceName: string;

  @Prop({ required: true, maxlength: 64 })
  appVersion: string;

  @Prop({ required: true, maxlength: 64 })
  eventName: string;

  @Prop({ required: true, type: Object })
  eventData: Record<string, any>;

  @Prop({ required: true })
  ipAddress: string;
}

export const AppEventSchema = SchemaFactory.createForClass(AppEvent);

// Add indexes for performance
AppEventSchema.index({ eventName: 1 });
AppEventSchema.index({ deviceName: 1 });
AppEventSchema.index({ createdAt: -1 });
AppEventSchema.index({ ipAddress: 1 });
