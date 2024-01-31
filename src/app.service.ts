import { Global, Inject, Injectable, Logger } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
@Global()
@Injectable()
export class AppService {
  private readonly logger = new Logger(AppService.name);

  constructor(@Inject(REQUEST) private readonly request: Request) {}

  healthCheck() {
    return {
      headers: this.request.headers,
      body: this.request.body,
    };
  }
}
