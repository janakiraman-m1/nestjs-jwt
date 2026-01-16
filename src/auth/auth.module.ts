import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.provider';
import { PrismaModule } from 'src/prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';
import { JWTStrategyService } from 'src/strategy';

@Module({
    controllers: [AuthController],
    providers: [AuthService, JWTStrategyService],
    imports: [PrismaModule, JwtModule.register({})]
})
export class AuthModule {}



