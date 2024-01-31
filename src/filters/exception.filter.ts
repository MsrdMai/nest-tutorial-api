import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { handleStatusCode } from 'src/constants/status-code.constant';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let handlerException;
    let status;
    let message;
    let fullMessage;
    let statusCode: number;

    if (exception instanceof HttpException) {
      handlerException = exception as HttpException;
      statusCode = handlerException.getStatus();

      const transportStatusCode = handleStatusCode(statusCode);

      status = transportStatusCode.statusCode;
      message = transportStatusCode.message;
      fullMessage = handlerException.message;
    } else if (exception instanceof Error) {
      handlerException = exception as Error;
      statusCode = HttpStatus.INTERNAL_SERVER_ERROR;

      if (
        (handlerException?.message).includes('Violation of UNIQUE KEY') ||
        (handlerException?.message).includes(
          'Cannot insert duplicate key in object',
        )
      ) {
        const errorSplit = (handlerException?.message as string).split(
          'The duplicate key value is',
        );
        const dupKey = errorSplit[1]
          .trim()
          .replace('(', '')
          .replace(')', '')
          .replace('.', '');

        statusCode = HttpStatus.BAD_REQUEST;
        message = `[${dupKey}] มีข้อมูลซ้ำในฐานข้อมูลแล้ว`;
        fullMessage = handlerException?.message;
      }

      const transportStatusCode = handleStatusCode(statusCode);
      status = transportStatusCode.statusCode;
      message = message || transportStatusCode.message;
      fullMessage = fullMessage || exception.message;
    }

    const errorResp = {
      statusCode: statusCode,
      responseCode: status,
      message,
      fullMessage: fullMessage,
      path: request.url,
      method: request.method,
      queryParams:
        Object.keys(request.params).length === 0 ? null : request.params,
      requestBody: Object.keys(request.body).length === 0 ? null : request.body,
      timestamp: +new Date(),
    };

    console.log(
      `[${new Date().toLocaleString()}] api error: `,
      JSON.stringify(errorResp),
    );

    response.status(statusCode).json(errorResp);
  }
}
