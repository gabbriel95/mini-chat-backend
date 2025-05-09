import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayload } from '../interfaces/jwt-payload.interface';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly prisma: PrismaService,
    configService: ConfigService,
  ) {
    const jwtSecret = configService.get('JWT_SECRET') as string;
    console.log('JWT_SECRET:', jwtSecret); // 👈🏽 Agregá esto

    super({
      secretOrKey:
        configService.get('JWT_SECRET') ?? 'clave-secreta-predeterminada',
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(payload: JwtPayload): Promise<User> {
    const { id } = payload;

    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new UnauthorizedException('Toker not valid');
    }

    /*if (!user.isActive) {
      throw new UnauthorizedException('User is inactive, tal with an admin');
    }*/

    //const { password, ...rest } = user;

    return user;
  }
}
