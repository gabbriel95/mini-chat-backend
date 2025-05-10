import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/login-user.dto';
import { RoleProtected } from './decorators/role-protected.decorator';
import { AuthGuard } from '@nestjs/passport';
import { UserRoleGuard } from './guards/roles.guard';
import { ROLES, User } from '@prisma/client';
import { GetUser } from './decorators/get-user,decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async createUser(@Body() createUserDto: CreateUserDto) {
    return this.authService.createUser(createUserDto);
  }

  @Post('login')
  async loginUser(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto);
  }

  @Get()
  @RoleProtected(ROLES.ADMIN)
  @UseGuards(AuthGuard(), UserRoleGuard)
  async getUsers(@GetUser() user: User, @GetUser('email') email: string) {
    console.log(user);
    console.log(email);

    return this.authService.getUsers();
  }
}
