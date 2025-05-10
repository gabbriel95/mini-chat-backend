import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateFriendshipDto } from './dto/create-friendship.dto';
import { UpdateFriendshipDto } from './dto/update-friendship.dto';
import { FRIENDSHIPSTATUS } from '@prisma/client';

@Injectable()
export class FriendshipsService {
  constructor(private readonly prisma: PrismaService) {}

  async createFriendship(dto: CreateFriendshipDto) {
    const [lowerId, higherId] =
      dto.userId1 < dto.userId2
        ? [dto.userId1, dto.userId2]
        : [dto.userId2, dto.userId1];

    return this.prisma.friendship.create({
      data: {
        userId1: lowerId,
        userId2: higherId,
        status: dto.status as FRIENDSHIPSTATUS,
      },
    });
  }

  async updateFriendship(dto: UpdateFriendshipDto) {
    const [lowerId, higherId] =
      dto.userId1 < dto.userId2
        ? [dto.userId1, dto.userId2]
        : [dto.userId2, dto.userId1];

    // Verificar si la relación existe y su estado
    const friendship = await this.prisma.friendship.findFirst({
      where: {
        userId1: lowerId,
        userId2: higherId,
        //status: FRIENDSHIPSTATUS.PENDING, // Solo se pueden actualizar solicitudes "pending" / Y las blocked?
      },
    });

    if (!friendship) {
      throw new BadRequestException(
        'No existe una solicitud pendiente entre estos usuarios.',
      );
    }

    // Validar que el usuario que acepta no sea el mismo que envió la solicitud
    if (
      friendship.userId1 === dto.userId1 &&
      dto.status !== FRIENDSHIPSTATUS.BLOCKED
    ) {
      throw new BadRequestException(
        'El usuario que envió la solicitud no puede responder la solicitud',
      );
    }

    // Actualizar el estado de la amistad
    return this.prisma.friendship.update({
      where: {
        id: friendship.id,
      },
      data: {
        status: dto.status as FRIENDSHIPSTATUS,
        blockedBy:
          dto.status === FRIENDSHIPSTATUS.BLOCKED ? dto.blockedBy : null,
      },
    });
  }
}
