import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { UpdatesController } from "./controller/updates.controller";
import { UpdatesService } from "./services/updates.service";
import { Update, UpdateSchema } from "./models/update.model";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Update.name, schema: UpdateSchema }]),
  ],
  controllers: [UpdatesController],
  providers: [UpdatesService],
  exports: [UpdatesService],
})
export class UpdatesModule {}
