import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { SpecializedAppointment } from './specialized-appointment.entity';

@Entity('physiotherapy_sessions')
export class PhysiotherapySession {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'ps_date', type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  date: Date;

  @Column({
    name: 'ps_type',
    type: 'enum',
    enum: ['evaluation', 'therapy', 'follow_up'],
    default: 'therapy'
  })
  type: string;

  @Column({
    name: 'ps_mobility_level',
    type: 'enum',
    enum: ['high', 'moderate', 'low', 'none'],
    default: 'moderate'
  })
  mobilityLevel: string;

  @Column({ name: 'ps_pain_level', type: 'tinyint', unsigned: true, nullable: true })
  painLevel?: number;

  @Column({ name: 'ps_treatment_description', type: 'text' })
  treatmentDescription: string;

  @Column({ name: 'ps_exercise_plan', type: 'text' })
  exercisePlan: string;

  @Column({ name: 'ps_progress_notes', type: 'text' })
  progressNotes: string;

  @Column({ name: 'created_at', type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @ManyToOne(() => SpecializedAppointment, appointment => appointment.physiotherapySessions)
  @JoinColumn({ name: 'id_appointment' })
  appointment: SpecializedAppointment;
}