import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { User } from '../../../users/domain/entities/user.entity';
import { OlderAdult } from '../../../older-adults/domain/entities/older-adult.entity';
import { SpecializedArea } from './specialized-area.entity';
import { NursingRecord } from './nursing-record.entity';
import { PhysiotherapySession } from './physiotherapy-session.entity';
import { PsychologySession } from './psychology-session.entity';
import { SocialWorkReport } from './social-work-report.entity';

@Entity('specialized_appointment')
export class SpecializedAppointment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'sa_appointment_date', type: 'datetime' })
  appointmentDate: Date;

  @Column({
    name: 'sa_appointment_type',
    type: 'enum',
    enum: ['checkup', 'evaluation', 'therapy', 'follow_up', 'emergency'],
    default: 'checkup'
  })
  appointmentType: string;

  @Column({
    name: 'sa_priority',
    type: 'enum',
    enum: ['low', 'medium', 'high', 'urgent'],
    default: 'medium'
  })
  priority: string;

  @Column({
    name: 'sa_status',
    type: 'enum',
    enum: ['scheduled', 'in_progress', 'completed', 'cancelled', 'rescheduled'],
    default: 'scheduled'
  })
  status: string;

  @Column({ name: 'sa_notes', type: 'text', nullable: true })
  notes?: string;

  @Column({ name: 'sa_observations', type: 'text', nullable: true })
  observations?: string;

  @Column({ name: 'sa_duration_minutes', type: 'smallint', unsigned: true, nullable: true })
  durationMinutes?: number;

  @Column({ name: 'sa_next_appointment', type: 'datetime', nullable: true })
  nextAppointment?: Date;

  @Column({ name: 'create_at', type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  createAt: Date;

  @ManyToOne(() => SpecializedArea, area => area.appointments)
  @JoinColumn({ name: 'id_area' })
  area: SpecializedArea;

  @ManyToOne(() => OlderAdult)
  @JoinColumn({ name: 'id_patient' })
  patient: OlderAdult;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'id_staff' })
  staff: User;

  @OneToMany(() => NursingRecord, (record: NursingRecord) => record.appointment)
  nursingRecords: NursingRecord[];

  @OneToMany(() => PhysiotherapySession, (session: PhysiotherapySession) => session.appointment)
  physiotherapySessions: PhysiotherapySession[];

  @OneToMany(() => PsychologySession, (session: PsychologySession) => session.appointment)
  psychologySessions: PsychologySession[];

  @OneToMany(() => SocialWorkReport, (report: SocialWorkReport) => report.appointment)
  socialWorkReports: SocialWorkReport[];
}