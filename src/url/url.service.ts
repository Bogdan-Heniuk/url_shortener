import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { Url } from './enities/url.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import ShortUniqueId  from 'short-unique-id';
import { Cache } from 'cache-manager';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { ResponseUrl } from './types';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UrlService {
  constructor(
    @InjectRepository(Url)
    private urlRepository: Repository<Url>,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private configService: ConfigService
  ) {}

  async short(url): Promise<any> {
    try {
      const urlExists = await this.urlRepository.findOne({
        where: {
          originalUrl: url,
        },
      });

      if (urlExists) {
        return { url: urlExists.shortUrl };
      }

      const base = this.configService.get("BASE_URL");
      const urlId = new ShortUniqueId({length: 5})();
      const shortUrl = `${base}/${urlId}`;

      const createdShortUrl = this.urlRepository.create({
        originalUrl: url,
        shortUrl,
        urlId,
      });

      await this.urlRepository.save(createdShortUrl, { reload: true });
      await this.cacheManager.set(
        createdShortUrl.urlId,
        createdShortUrl.originalUrl,
      );
      return { url: createdShortUrl.shortUrl };
    } catch (err) {
      console.log(err);

      throw new HttpException(
        'Something went wrong',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async original(urlId: string): Promise<ResponseUrl> {
    try {
      const urlFromCache: string = await this.cacheManager.get(urlId);

      if (urlFromCache) {
        console.log('From cache');
        return { url: urlFromCache };
      }

      const url = await this.urlRepository.findOne({ where: { urlId } });

      if (!url) {
        throw new HttpException('Not found', HttpStatus.NOT_FOUND);
      }

      return { url: url.originalUrl };
    } catch (err) {
      console.log(err);
      throw new HttpException(
        'Something went wrong',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
