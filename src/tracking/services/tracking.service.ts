import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { AppEvent, AppEventDocument } from "../models/app-event.model";
import { TrackDto } from "../dtos/track.dto";

@Injectable()
export class TrackingService {
  constructor(
    @InjectModel(AppEvent.name) private appEventModel: Model<AppEventDocument>
  ) {}

  async createAppEvent(
    trackDto: TrackDto,
    ipAddress: string
  ): Promise<AppEventDocument> {
    const appEvent = new this.appEventModel({
      ...trackDto,
      ipAddress,
    });
    return await appEvent.save();
  }
}
