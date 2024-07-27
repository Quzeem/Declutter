import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  private logger = new Logger('GlobalExceptionFilter');

  catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    // const request = ctx.getRequest<Request>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Internal server error';

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      message = exception.getResponse()['message'] || exception.message;
    }

    // console.log(exception);

    // Customize handling for specific errors here
    /* duplicate key value */
    // @ts-ignore
    if (exception.code === '23505') {
      status = HttpStatus.BAD_REQUEST;
      // @ts-ignore
      const key = exception.detail.split('=')[0] as string;
      message = `${key.slice(5, key.length - 1)} already exists`;
    }

    if (exception.name === 'JsonWebTokenError') {
      status = HttpStatus.UNAUTHORIZED;
      message = 'Invalid token';
    }

    if (exception.name === 'TokenExpiredError') {
      status = HttpStatus.UNAUTHORIZED;
      message = 'Expired token';
    }

    if (exception.name === 'EntityPropertyNotFoundError') {
      status = HttpStatus.BAD_REQUEST;
      message = exception.message;
    }

    this.logger.error(exception.message);

    response.status(status).json({
      statusCode: status,
      message,
    });
  }
}
