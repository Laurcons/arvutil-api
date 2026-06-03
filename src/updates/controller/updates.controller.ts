import {
  Controller,
  Get,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Res,
  UseGuards,
} from "@nestjs/common";
import { Response } from "express";
import { SkipThrottle } from "@nestjs/throttler";
import { UpdatesService } from "../services/updates.service";
import { CreateUpdateDto } from "../dtos/create-update.dto";
import { UpdateDocument } from "../models/update.model";
import { ApiKeyGuard } from "../guards/api-key.guard";

@Controller("v1/update")
export class UpdatesController {
  constructor(private readonly updatesService: UpdatesService) {}

  @Get()
  async getUpdate(@Res() res: Response): Promise<void> {
    const update = await this.updatesService.getCurrentUpdate();

    if (!update) {
      throw new NotFoundException("No update available");
    }

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<item>
    <version>${update.version}</version>
    <url>${update.downloadUrl}</url>
    <mandatory>true</mandatory>
</item>`;

    res.setHeader("Content-Type", "application/xml");
    res.status(HttpStatus.OK).send(xml);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @SkipThrottle()
  @UseGuards(ApiKeyGuard)
  async createUpdate(
    @Body() dto: CreateUpdateDto
  ): Promise<{ update: UpdateDocument }> {
    const update = await this.updatesService.createUpdate(dto);
    return { update };
  }
}
