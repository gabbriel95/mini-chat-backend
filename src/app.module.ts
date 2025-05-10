import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { envValidationSchema } from './config/env.validation';
import { FriendshipsModule } from './friendships/friendships.module';
import { MessagesWsModule } from './messages-ws/messages-ws.module';

@Module({
  imports: [
    AuthModule,
    FriendshipsModule,
    PrismaModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      validationSchema: envValidationSchema,
    }),
    MessagesWsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
