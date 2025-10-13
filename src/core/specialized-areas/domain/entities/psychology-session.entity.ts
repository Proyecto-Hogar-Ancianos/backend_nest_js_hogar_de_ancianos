import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { SpecializedAppointment } from './specialized-appointment.entity';

@Entity('psychology_sessions')
export class PsychologySession {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'psy_date', type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  date: Date;

  @Column({
    name: 'psy_session_type',
    type: 'enum',
    enum: ['evaluation', 'therapy', 'follow_up', 'group therapy'],
    default: 'evaluation'
  })
  sessionType: string;

  @Column({
    name: 'psy_mood',
    type: 'enum',
    enum: ['stable', 'anxious', 'depressed', 'irritable', 'other'],
    default: 'stable'
  })
  mood: string;

  @Column({
    name: 'psy_cognitive_status',
    type: 'enum',
    enum: ['normal', 'mild impairment', 'moderate impairment', 'severe impairment'],
    default: 'normal'
  })
  cognitiveStatus: string;

  @Column({ name: 'psy_observations', type: 'text' })
  observations: string;

  @Column({ name: 'psy_therapy_goal', type: 'text' })
  therapyGoal: string;

  @Column({ name: 'psy_progress', type: 'text' })
  progress: string;

  @Column({ name: 'created_at', type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @ManyToOne(() => SpecializedAppointment, appointment => appointment.psychologySessions)
  @JoinColumn({ name: 'id_appointment' })
  appointment: SpecializedAppointment;
}