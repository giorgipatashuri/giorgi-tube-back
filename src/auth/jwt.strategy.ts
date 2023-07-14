import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { UserService } from 'src/user/user.service'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { User } from '@prisma/client'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor(private readonly usersService: UserService) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			ignoreExpiration: false,
			secretOrKey: process.env.JWT_SECRET
		})
	}

	async validate({ id }: Pick<User, 'id'>) {
		const user = await this.usersService.findById(id)
		return user
	}
}
