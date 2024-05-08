import {
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  UseInterceptors,
} from '@nestjs/common';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { plainToInstance } from 'class-transformer';

export class SerializeInterceptor implements NestInterceptor {
  constructor(private dto: any) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> {
    return next.handle().pipe(
      map((data: any) => {
        // Turn the data(plain) to an instance of a DTO(class)
        return plainToInstance(this.dto, data);
      }),
    );
  }
}

interface ClassConstructor {
  new (...args: any[]): object; // Generic constructor signature
}

// A function that returns a decorator - we will prefix the function anywhere we use it with '@'
export const Serialize = (dto: ClassConstructor) => {
  return UseInterceptors(new SerializeInterceptor(dto));
};
