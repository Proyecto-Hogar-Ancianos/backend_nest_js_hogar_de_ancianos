import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Role } from './role.entity';

@Entity('permissions')
export class Permission {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ name: 'p_name' })
	name: string;

	@Column({ name: 'id_role', nullable: true })
	roleId?: number;

	@ManyToOne(() => Role, role => (role as any).permissions)
	role?: Role;
}

