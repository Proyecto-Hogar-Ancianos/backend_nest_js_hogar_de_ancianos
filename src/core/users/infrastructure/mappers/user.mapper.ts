import { User } from '../../domain/entities/user.entity';
import { UserResponseDto } from '../dto/user-response.dto';

export function toUserResponse(u: Partial<User> | any): UserResponseDto {
  return {
    id: u.id,
    identification: u.u_identification || u.identification,
    name: u.u_name || u.name,
    fLastName: u.u_f_last_name || u.fLastName,
    sLastName: u.u_s_last_name || u.sLastName,
    u_email: u.u_email || u.email,
    u_email_verified: u.u_email_verified ?? u.emailVerified ?? false,
    u_is_active: u.u_is_active ?? u.isActive ?? true,
  create_at: new Date(u.create_at || u.createAt || Date.now()).toISOString(),
    role_id: u.role_id || u.roleId || null,
  } as UserResponseDto;
}

export function toUserResponseList(users: Array<Partial<User> | any>): UserResponseDto[] {
  return users.map(u => toUserResponse(u));
}
