import { applyDecorators, UseGuards } from '@nestjs/common';
import { ROLES } from '@prisma/client';
import { RoleProtected } from './role-protected.decorator';
import { AuthGuard } from '@nestjs/passport';
import { UserRoleGuard } from '../guards/roles.guard';

export function Auth(...roles: ROLES[]) {
  return applyDecorators(
    RoleProtected(...roles),
    UseGuards(AuthGuard(), UserRoleGuard),
  );
}
