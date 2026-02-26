import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn, Index } from 'typeorm';
import { OlderAdult } from '../virtual-records/older-adult.entity';
import { User } from '../auth/core/user.entity';
import { SpecializedAppointment } from './specialized-appointment.entity';

@Entity('medical_record')
@Index(['create_at'])
@Index(['mr_record_date'])
export class MedicalRecord {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'mr_record_date', type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
    mr_record_date: Date;

    @Column({ name: 'mr_summary', type: 'text' })
    mr_summary: string;

    @Column({ name: 'mr_diagnosis', type: 'text', nullable: true })
    mr_diagnosis: string | null;

    @Column({ name: 'mr_treatment', type: 'text', nullable: true })
    mr_treatment: string | null;

    @Column({ name: 'mr_observations', type: 'text', nullable: true })
    mr_observations: string | null;

    @Column({ name: 'mr_origin_area', type: 'varchar', length: 60 })
    mr_origin_area: string;

    @Column({ name: 'mr_signed_by', type: 'varchar', length: 150, nullable: true })
    mr_signed_by: string | null;

    @CreateDateColumn({ name: 'create_at', nullable: true })
    create_at: Date;

    @ManyToOne(() => OlderAdult, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'id_older_adult' })
    id_older_adult: OlderAdult;

    @ManyToOne(() => SpecializedAppointment, { onDelete: 'SET NULL', nullable: true })
    @JoinColumn({ name: 'id_appointment' })
    id_appointment: SpecializedAppointment | null;

    @ManyToOne(() => User, { onDelete: 'SET NULL', nullable: true })
    @JoinColumn({ name: 'id_staff' })
    id_staff: User | null;
}
