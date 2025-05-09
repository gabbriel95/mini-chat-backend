import { FRIENDSHIPSTATUS } from '@prisma/client';

export const ValidFriendshipStatus = [
  FRIENDSHIPSTATUS.PENDING,
  FRIENDSHIPSTATUS.ACCEPTED,
  FRIENDSHIPSTATUS.BLOCKED,
];
