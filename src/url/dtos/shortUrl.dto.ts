import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsUrl} from "class-validator";

export class ShortUrlDto {
  @IsString()
  @IsUrl()
  @ApiProperty({ example: 'https://google.com', description: 'Url to be shorted' })
  url: string;
}

