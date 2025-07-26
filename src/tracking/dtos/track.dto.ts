import { IsString, IsNotEmpty, IsObject, MaxLength } from "class-validator";

export class TrackDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(128)
  deviceName: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(64)
  appVersion: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(64)
  eventName: string;

  @IsObject()
  @IsNotEmpty()
  eventData: Record<string, any>;
}
