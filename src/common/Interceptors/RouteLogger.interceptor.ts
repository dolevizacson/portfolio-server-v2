import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
} from '@nestjs/common';
import { catchError, Observable, tap } from 'rxjs';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger(LoggingInterceptor.name);

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest();
    const res = context.switchToHttp().getResponse();
    const { method, url } = req;
    const { statusCode } = res;
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
