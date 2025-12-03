import { SetMetadata } from '@nestjs/common';
import { UserRole } from '../../generated/prisma/enums.js';
export const ROLES_KEY = 'roles';
console.log('ROLES_KEY', ROLES_KEY);
export const Roles = (...roles: UserRole[]) => SetMetadata(ROLES_KEY, roles);
console.log('Roles', Roles);
