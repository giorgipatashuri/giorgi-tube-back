import {
	BadRequestException,
	Injectable,
	NotFoundException,
	UnauthorizedException
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { verify } from 'argon2'
import { CreateUserDto } from 'src/user/dto/create-user.dto'
import { UserService } from 'src/user/user.service'
import { AuthDto } from './dto/auth.dto'

@Injectable()
export class AuthService {
	constructor(
		private readonly userService: UserService,
		private readonly jwt: JwtService
	) {}
	async login(dto: AuthDto) {
		const user = await this.validateUser(dto)
		const token = await this.jwt.sign({ id: user.id }, { expiresIn: '31d' })

		return {
			user: user,
			token
		}
	}
	async register(dto: AuthDto) {
		const oldUser = await this.validateUser(dto)
		if (oldUser)
			throw new BadRequestException('User with this email already exists')
		const newUser = await this.userService.create(dto)
		const token = await this.jwt.sign({ id: newUser.id }, { expiresIn: '31d' })

		return {
			user: newUser,
			token
		}
	}
	private async validateUser(dto: CreateUserDto) {
		const user = await this.userService.findByEmail(dto.email)
		if (!user) throw new NotFoundException('User not Found')
		const isValid = await verify(user.password, dto.password)
		if (!isValid) throw new UnauthorizedException('Invalid password')

		return user
	}
}
