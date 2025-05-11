import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  InternalServerErrorException,
  ParseUUIDPipe,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { ROLES, User } from '@prisma/client';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { GetUser } from 'src/auth/decorators/get-user,decorator';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @Auth()
  async findAll(@Query('includeInactive') includeInactive: string) {
    const showAll = includeInactive === 'true';
    return await this.usersService.findAll(showAll);
  }

  @Get(':id')
  @Auth(ROLES.ADMIN)
  async findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.usersService.findOne(id);
  }

  @Patch(':id')
  @Auth(ROLES.ADMIN)
  async update(
    @GetUser() userUpdated: User,
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User> {
    try {
      return await this.usersService.updateUser(
        id,
        updateUserDto,
        userUpdated.id,
      );
    } catch (error) {
      throw new InternalServerErrorException(
        `Error al actualizar el usuario: ${error}`,
      );
    }
  }

  @Delete(':id')
  @Auth(ROLES.ADMIN)
  remove(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.usersService.remove(id);
  }
}
