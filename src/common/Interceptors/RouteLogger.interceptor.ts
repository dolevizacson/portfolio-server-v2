import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
} from '@nestjs/common';
import { catchError, Observable, tap } from 'rxjs';
import { Request, Response } from 'express';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger(LoggingInterceptor.name);

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest<Request>();
    const response = context.switchToHttp().getResponse<Response>();
    const { method, url } = request;
    const { statusCode } = response;
    const reqIn = Date.now();

    return next.handle().pipe(
      tap(() =>
        this.logger.log(
          `${method} request to - ${url} - finished with code ${statusCode} in ${
            Date.now() - reqIn
          }ms`,
        ),
      ),
      catchError((err) => {
        this.logger.error(
          `${method} request to - ${url} - failed with code ${err.status}`,
          err.stack,
        );
        throw err;
      }),
    );
  }
}
