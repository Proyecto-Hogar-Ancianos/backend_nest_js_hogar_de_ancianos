import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateRoleChangeDto {
  @ApiProperty({ example: 1 })
  @IsNotEmpty()
  @IsNumber()
  user_id: number;

  @ApiProperty({ example: 'user' })
  @IsOptional()
  @IsString()
  old_role?: string;

  @ApiProperty({ example: 'admin' })
  @IsOptional()
  @IsString()
  new_role?: string;

  @ApiProperty({ example: 2 })
  @IsNotEmpty()
  @IsNumber()
  changed_by: number;
}

export default CreateRoleChangeDto;
