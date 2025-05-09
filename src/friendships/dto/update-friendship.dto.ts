import {
  IsNotEmpty,
  IsUUID,
  IsString,
  IsOptional,
  IsIn,
} from 'class-validator';
import { FRIENDSHIPSTATUS } from '@prisma/client';

export class UpdateFriendshipDto {
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

  @IsOptional()
  @IsUUID()
  blockedBy?: string; // ID del usuario que bloqueó (opcional, solo si el estado es 'blocked')
}
