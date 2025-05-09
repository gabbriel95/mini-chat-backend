import { SetMetadata } from '@nestjs/common';
import { ROLES } from '@prisma/client';

export const META_ROLES = 'roles';

export const RoleProtected = (...args: ROLES[]) => {
  return SetMetadata(META_ROLES, args);
};
