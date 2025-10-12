import { ApiProperty } from '@nestjs/swagger';

export class RoleChangeResponseDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  userId: number;

  @ApiProperty({ required: false })
  oldRole?: string;

  @ApiProperty({ required: false })
  newRole?: string;

  @ApiProperty()
  changedBy: number;

  @ApiProperty()
  changedAt: Date;
}

export default RoleChangeResponseDto;
