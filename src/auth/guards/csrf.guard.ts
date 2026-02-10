import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class CsrfGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const req = context
      .switchToHttp()
      .getRequest<Request & { cookies: { csrfToken?: string } }>();

    if (['GET', 'HEAD', 'OPTIONS'].includes(req.method)) {
      return true;
    }

    const csrfHeader = req.headers['x-csrf-token'];
    const csrfCookie = req.cookies?.csrfToken;

    if (!csrfHeader || csrfHeader !== csrfCookie) {
      throw new ForbiddenException('Invalid CSRF token');
    }

    return true;
  }
}
