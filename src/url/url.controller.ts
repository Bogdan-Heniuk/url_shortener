import { Body, Controller, Get, Param, Post, Redirect } from '@nestjs/common';
import { UrlService } from './url.service';
import { ShortUrlDto } from './dtos/shortUrl.dto';
import { RedirectUrlDto } from './dtos/redirectUrlDto';
import { ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';
import { ResponseUrl } from './types';

@ApiTags('Fibonacci')
@Controller('')
export class UrlController {
  constructor(private readonly urlService: UrlService) {}

  @ApiBody({ type: ShortUrlDto })
  @Post('/short')
  short(@Body() body: ShortUrlDto): Promise<any> {
    return this.urlService.short(body.url);
  }

  @ApiParam({ name: 'urlId', type: String })
  @Get('/:urlId')
  @Redirect()
  redirect(@Param() params: RedirectUrlDto): Promise<ResponseUrl> {
    return this.urlService.original(params.urlId);
  }

  @ApiBody({ type: RedirectUrlDto })
  @Post('/original')
  getOriginal(@Body() body: RedirectUrlDto): Promise<ResponseUrl> {
    return this.urlService.original(body.urlId);
  }
}
