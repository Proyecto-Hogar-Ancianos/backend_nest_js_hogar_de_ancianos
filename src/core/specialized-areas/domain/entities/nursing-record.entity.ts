import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { SpecializedAppointment } from './specialized-appointment.entity';

@Entity('nursing_records')
export class NursingRecord {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'nr_date', type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  date: Date;

  @Column({ name: 'nr_temperature', type: 'decimal', precision: 4, scale: 1, nullable: true })
  temperature?: number;

  @Column({ name: 'nr_blood_pressure', nullable: true })
  bloodPressure?: string;

  @Column({ name: 'nr_heart_rate', type: 'smallint', unsigned: true, nullable: true })
  heartRate?: number;

  @Column({ name: 'nr_pain_level', type: 'tinyint', unsigned: true, nullable: true })
  painLevel?: number;

  @Column({
    name: 'nr_mobility',
    type: 'enum',
    enum: ['independent', 'assisted', 'bedridden'],
    default: 'independent'
  })
  mobility: string;

  @Column({
    name: 'nr_appetite',
    type: 'enum',
    enum: ['good', 'regular', 'poor'],
    default: 'regular'
  })
  appetite: string;

  @Column({
    name: 'nr_sleep_quality',
    type: 'enum',
    enum: ['good', 'regular', 'poor'],
    default: 'regular'
  })
  sleepQuality: string;

  @Column({ name: 'nr_notes', type: 'text', nullable: true })
  notes?: string;

  @Column({ name: 'created_at', type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @ManyToOne(() => SpecializedAppointment, appointment => appointment.nursingRecords)
  @JoinColumn({ name: 'id_appointment' })
  appointment: SpecializedAppointment;
}