import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { TrackingController } from "./controller/tracking.controller";
import { TrackingService } from "./services/tracking.service";
import { AppEvent, AppEventSchema } from "./models/app-event.model";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: AppEvent.name, schema: AppEventSchema },
    ]),
  ],
  controllers: [TrackingController],
  providers: [TrackingService],
  exports: [TrackingService],
})
export class TrackingModule {}
