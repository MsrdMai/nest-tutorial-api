import { Inject, Injectable } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';

@Injectable()
export class MyHeaderHelper {
  constructor(@Inject(REQUEST) private readonly request) {}

  headers() {
    const platform = this.request.header('x-platform') ?? null;
    const device = this.request.header('x-device') ?? null;
    const version = this.request.header('x-version') ?? null;

    return { platform: platform, device: device, version: version };
  }
}
