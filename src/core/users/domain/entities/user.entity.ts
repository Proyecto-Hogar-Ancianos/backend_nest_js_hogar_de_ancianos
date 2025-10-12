import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Role } from '../../../roles/domain/entities/role.entity';

@Entity('users')
export class User {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ name: 'u_identification', unique: true })
	identification: string;

	@Column({ name: 'u_name' })
	name: string;

	@Column({ name: 'u_f_last_name' })
	fLastName: string;

	@Column({ name: 'u_s_last_name', nullable: true })
	sLastName?: string;

	@Column({ name: 'u_email', unique: true })
	email: string;

	@Column({ name: 'u_email_verified', default: false })
	emailVerified: boolean;

	@Column({ name: 'u_password' })
	password: string;

	@Column({ name: 'u_is_active', default: true })
	isActive: boolean;

	@Column({ name: 'u_token', nullable: true })
	token?: string;

	@Column({ name: 'create_at', type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
	createAt: Date;

		@Column({ name: 'role_id', nullable: true })
		roleId?: number;

		@ManyToOne(() => Role, role => (role as any).permissions, { nullable: true })
		@JoinColumn({ name: 'role_id' })
		role?: Role;
}
