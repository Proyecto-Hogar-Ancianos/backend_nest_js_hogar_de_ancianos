import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Permission } from './permission.entity';

@Entity('roles')
export class Role {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ name: 'r_name' })
	name: string;


	//@OneToMany(() => Permission, p => p.role)
	//permissions?: Permission[];
}

