import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

@Injectable()
export class CsrfGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest();
    const csrfHeader = req.headers['x-csrf-token'];
    const csrfSession = req.session?.csrfToken;

    if (!csrfHeader || csrfHeader !== csrfSession) {
      return false;
    }
    return true;
  }
}
