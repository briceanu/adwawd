import {
  NestInterceptor,
  ExecutionContext,
  Injectable,
  CallHandler,
  NotFoundException,
} from '@nestjs/common';
import { instanceToPlain } from 'class-transformer';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class GetDataInterceptor implements NestInterceptor {
  intercept(
    _context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> {
    try {
      return next.handle().pipe(map((data) => instanceToPlain(data)));
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }
}
