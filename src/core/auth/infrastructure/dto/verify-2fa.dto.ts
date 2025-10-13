import { IsString, IsNotEmpty, Length, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class Verify2FADto {
  @ApiProperty({
    example: '123456',
    description: 'Código TOTP de 6 dígitos generado por la app 2FAS'
  })
  @IsString({ message: 'El código debe ser un texto' })
  @IsNotEmpty({ message: 'El código es requerido' })
  @Length(6, 6, { message: 'El código debe tener exactamente 6 dígitos' })
  @Matches(/^\d{6}$/, { message: 'El código debe contener solo dígitos' })
  token: string;

  @ApiProperty({
    example: 'temp_session_token_here',
    description: 'Token temporal de sesión recibido después del login'
  })
  @IsString({ message: 'El session token debe ser un texto' })
  @IsNotEmpty({ message: 'El session token es requerido' })
  sessionToken: string;
}
