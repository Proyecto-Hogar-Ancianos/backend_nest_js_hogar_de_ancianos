import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Program } from './program.entity';

@Entity('program_participants')
export class ProgramParticipant {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ name: 'pp_identification' })
	identification: string;

	@Column({ name: 'pp_name' })
	name: string;

	@Column({ name: 'pp_f_last_name', nullable: true })
	fLastName?: string;

	@Column({ name: 'pp_s_last_name', nullable: true })
	sLastName?: string;

	@Column({ name: 'pp_role' })
	role: string;

	@Column({ name: 'id_program', nullable: true })
	programId?: number;

	@ManyToOne(() => Program, program => (program as any).participants)
	@JoinColumn({ name: 'id_program' })
	program?: Program;
}

