import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService) {}

  async createUser(data: CreateUserDto) {
    return await this.prisma.user.create({
      data: {
        ...data,
        password: bcrypt.hashSync(data.password, 10),
      },
    });
  }

  async getUsers() {
    return await this.prisma.user.findMany();
  }
}
