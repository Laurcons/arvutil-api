import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import { ThrottlerModule } from "@nestjs/throttler";
import { APP_GUARD } from "@nestjs/core";
import { CustomThrottlerGuard } from "./common/guards/custom-throttler.guard";
import { TrackingModule } from "./tracking/tracking.module";
import { HealthModule } from "./health/health.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ".env",
    }),
    MongooseModule.forRoot(process.env.MONGODB_URI),
    ThrottlerModule.forRoot([
      // {
      //   ttl: 60000, // 1 minute
      //   limit: 50, // 50 requests per minute
      // },
      {
        ttl: 86400000, // 1 day
        limit: 1000, // 1000 requests per day
      },
    ]),
    TrackingModule,
    HealthModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: CustomThrottlerGuard,
    },
  ],
})
export class AppModule {}
