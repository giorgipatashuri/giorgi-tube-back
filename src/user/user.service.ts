import { Injectable } from '@nestjs/common'
import { CreateUserDto } from './dto/create-user.dto'

import { PrismaService } from 'src/prisma.service'
import { hash } from 'argon2'

@Injectable()
export class UserService {
	constructor(private readonly prisma: PrismaService) {}

	async findByEmail(email: string) {
		return this.prisma.user.findUnique({
			where: {
				email: email
			}
		})
	}
	async findById(id: number) {
		return this.prisma.user.findUnique({
			where: {
				id
			}
		})
	}
	async create(dto: CreateUserDto) {
		return this.prisma.user.create({
			data: {
				email: dto.email,
				password: dto.email
			}
		})
	}
}
