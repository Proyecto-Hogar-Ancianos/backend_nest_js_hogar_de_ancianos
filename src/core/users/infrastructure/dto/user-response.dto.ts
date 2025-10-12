import { ApiProperty } from '@nestjs/swagger';

export class UserResponseDto {
	@ApiProperty()
	id: number;

	@ApiProperty()
	identification: string;

	@ApiProperty()
	name: string;

	@ApiProperty()
	fLastName: string;

	@ApiProperty({ required: false })
	sLastName?: string;

	@ApiProperty()
	u_email: string;

	@ApiProperty()
	u_email_verified: boolean;

	@ApiProperty()
	u_is_active: boolean;

	@ApiProperty()
	create_at: string;

	@ApiProperty({ required: false })
	role_id?: number;
}
