import { FRIENDSHIPSTATUS } from '@prisma/client';
import { IsNotEmpty, IsUUID, IsString, IsIn } from 'class-validator';

export class CreateFriendshipDto {
  @IsNotEmpty()
  @IsUUID()
  userId1: string; // ID del primer usuario en la relación

  @IsNotEmpty()
  @IsUUID()
  userId2: string; // ID del segundo usuario en la relación

  @IsNotEmpty()
  @IsString()
  @IsIn([
    FRIENDSHIPSTATUS.PENDING,
    FRIENDSHIPSTATUS.ACCEPTED,
    FRIENDSHIPSTATUS.BLOCKED,
  ])
  status: string; // 'pending', 'accepted', 'blocked'
}
