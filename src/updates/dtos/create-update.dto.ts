import { IsString, IsNotEmpty, IsUrl } from "class-validator";

export class CreateUpdateDto {
  @IsString()
  @IsNotEmpty()
  version: string;

  @IsUrl()
  @IsNotEmpty()
  downloadUrl: string;
}
