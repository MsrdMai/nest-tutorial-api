import { Injectable } from '@nestjs/common';
import { enc } from 'crypto-js';

@Injectable()
export class EncodedHelper {
  encodeBasicAuth = (username: string, password: string) => {
    const encoded = enc.Base64.stringify(
      enc.Utf8.parse(`${username}:${password}`),
    );
    return encoded;
  };
}
