import { Injectable, NestMiddleware } from '@nestjs/common';
import bodyParser from 'body-parser';

export function JsonBodyParserMiddlewareGenerator(limit: string) {
  @Injectable()
  class JsonBodyParserMiddleware implements NestMiddleware {
    use = bodyParser.json({ limit });
  }
  return JsonBodyParserMiddleware;
}
