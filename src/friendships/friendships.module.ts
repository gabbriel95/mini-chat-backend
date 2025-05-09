import { Module } from '@nestjs/common';
import { FriendshipsService } from './friendships.service';
import { FriendshipsController } from './friendships.controller';
import { PrismaService } from '../prisma/prisma.service'; // Asegúrate de tener el módulo Prisma configurado

@Module({
  controllers: [FriendshipsController],
  providers: [FriendshipsService, PrismaService], // Incluye el servicio Prisma para interactuar con la base de datos
})
export class FriendshipsModule {}
