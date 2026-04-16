import { Injectable, NestMiddleware } from '@nestjs/common';
import bodyParser from 'body-parser';

export function UrlEncodedBodyParserMiddlewareGenerator(limit: string) {
  @Injectable()
  class UrlEncodedBodyParserMiddleware implements NestMiddleware {
    use = bodyParser.urlencoded({ limit, extended: true });
  }
  return UrlEncodedBodyParserMiddleware;
}
