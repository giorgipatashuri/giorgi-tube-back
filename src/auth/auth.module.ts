import { Module } from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthController } from './auth.controller'
import { UserService } from 'src/user/user.service'
import { JwtModule } from '@nestjs/jwt'
import { jwtConfig } from 'src/config/jwt.config'
import { PrismaService } from 'src/prisma.service'
import { JwtStrategy } from './jwt.strategy'

@Module({
	controllers: [AuthController],
	providers: [AuthService, UserService, PrismaService, JwtStrategy],
	imports: [
		JwtModule.registerAsync({
			useFactory: jwtConfig
		})
	]
})
export class AuthModule {}
