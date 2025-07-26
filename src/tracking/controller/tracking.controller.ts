import {
  Controller,
  Post,
  Body,
  HttpStatus,
  HttpCode,
  Req,
} from "@nestjs/common";
import { Request } from "express";
import { TrackingService } from "../services/tracking.service";
import { TrackDto } from "../dtos/track.dto";
import { AppEventDocument } from "../models/app-event.model";

@Controller("v1/tr")
export class TrackingController {
  constructor(private readonly trackingService: TrackingService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async track(
    @Body() trackDto: TrackDto,
    @Req() request: Request
  ): Promise<{ appEvent: AppEventDocument }> {
    const ipAddress = this.getClientIp(request);
    const appEvent = await this.trackingService.createAppEvent(
      trackDto,
      ipAddress
    );

    return {
      appEvent,
    };
  }

  private getClientIp(request: Request): string {
    // Trust proxy headers for IP detection
    return (
      (request.headers["x-forwarded-for"] as string)?.split(",")[0]?.trim() ||
      (request.headers["x-real-ip"] as string) ||
      request.connection.remoteAddress ||
      request.socket.remoteAddress ||
      "unknown"
    );
  }
}
