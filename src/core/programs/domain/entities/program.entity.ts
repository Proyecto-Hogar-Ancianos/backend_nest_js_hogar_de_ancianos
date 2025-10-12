import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { ProgramParticipant } from './program-participant.entity';

@Entity('programs')
export class Program {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ name: 'p_name' })
	name: string;

	@Column({ name: 'p_description', type: 'text' })
	description: string;

	@Column({ name: 'p_type' })
	type: string;

	@Column({ name: 'p_observations', type: 'text', nullable: true })
	observations?: string;

	@Column({ name: 'p_start_date', type: 'date' })
	startDate: string;

	@Column({ name: 'p_end_date', type: 'date', nullable: true })
	endDate?: string;

	@Column({ name: 'p_budget', type: 'decimal', precision: 12, scale: 2, nullable: true })
	budget?: number;

	@Column({ name: 'p_status' })
	status: string;

	@Column({ name: 'create_at', type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
	createAt: Date;

	@OneToMany(() => ProgramParticipant, p => (p as any).program)
	participants?: ProgramParticipant[];
}

