import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Update, UpdateDocument } from "../models/update.model";
import { CreateUpdateDto } from "../dtos/create-update.dto";

@Injectable()
export class UpdatesService {
  constructor(
    @InjectModel(Update.name) private updateModel: Model<UpdateDocument>
  ) {}

  async getCurrentUpdate(): Promise<UpdateDocument | null> {
    return this.updateModel.findOne({ isCurrent: true }).exec();
  }

  async createUpdate(dto: CreateUpdateDto): Promise<UpdateDocument> {
    await this.updateModel.updateMany({ isCurrent: true }, { isCurrent: false });
    const update = new this.updateModel({ ...dto, isCurrent: true });
    return update.save();
  }
}
