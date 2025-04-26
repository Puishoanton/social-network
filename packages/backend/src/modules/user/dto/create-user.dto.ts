import {
	IsEmail,
	IsString,
} from 'class-validator'

export class CreateUserDto {
	@IsEmail({
	}, {
		message: 'Invalid email address',
	},)
	public readonly email: string = ''

	@IsString({
		message: 'Invalid password',
	},)
	public readonly password: string

	@IsString({
		message: 'Invalid name',
	},)
	public readonly name: string

	@IsString({
		message: 'Invalid img url',
	},)
	public readonly img: string
}

