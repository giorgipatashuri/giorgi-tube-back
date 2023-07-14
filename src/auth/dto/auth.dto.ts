import { IsEmail, MinLength } from 'class-validator'

export class AuthDto {
	@IsEmail()
	email: string

	@MinLength(6, {
		message: 'Your password must be at least 6 characters long'
	})
	password: string
}
