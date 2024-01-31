import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { handleStatusCode } from 'src/constants/status-code.constant';

export interface Response<T> {
  statusCode: string;
  message: string;
  data: T;
  timestamp: number;
}

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, Response<T>> {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    const statusCode = context.switchToHttp().getResponse().statusCode;
    const transportStatusCode = handleStatusCode(statusCode);

    return next.handle().pipe(
      map(
        (data) =>
          ({
            statusCode: statusCode,
            responseCode: transportStatusCode.statusCode,
            message: data?.message ?? transportStatusCode.message,
            data: data ?? null,
            timestamp: +new Date(),
          } as Response<T>),
      ),
    );
  }
}
