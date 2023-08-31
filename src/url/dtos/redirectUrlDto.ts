import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUrl } from 'class-validator';

export class RedirectUrlDto {
  @IsString()
  @IsUrl()
  @ApiProperty({ example: '8fd4bbbc', description: 'Id of shorted url' })
  urlId: string;
}
