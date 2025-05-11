import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from '@prisma/client';

@Injectable()
export class UsersService {
  private readonly logger = new Logger('AuthService');

  constructor(private readonly prisma: PrismaService) {}

  async findAll(showAll: boolean) {
    return this.prisma.user.findMany({
      where: {
        isActive: showAll ? undefined : true,
      },
    });
  }

  async findOne(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException(`El usuario con id ${id} no existe.`);
    }

    return user;
  }

  async updateUser(
    id: string,
    updateUserDto: UpdateUserDto,
    userId: string,
  ): Promise<User> {
    return this.prisma.user.update({
      where: { id },
      data: {
        ...updateUserDto,
        updatedBy: userId,
      },
    });
  }

  async remove(id: string) {
    const user = await this.prisma.user.findUnique({ where: { id } });

    if (!user) {
      throw new NotFoundException(`El usuario con id ${id} no existe.`);
    }

    return this.prisma.user.delete({
      where: { id },
    });
  }
}
