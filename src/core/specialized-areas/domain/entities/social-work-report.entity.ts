import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { SpecializedAppointment } from './specialized-appointment.entity';

@Entity('social_work_reports')
export class SocialWorkReport {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'sw_date', type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  date: Date;

  @Column({
    name: 'sw_visit_type',
    type: 'enum',
    enum: ['home visit', 'institutional visit', 'interview', 'follow_up'],
    default: 'interview'
  })
  visitType: string;

  @Column({ name: 'sw_family_relationship', type: 'text', nullable: true })
  familyRelationship?: string;

  @Column({ name: 'sw_economic_assessment', type: 'text', nullable: true })
  economicAssessment?: string;

  @Column({ name: 'sw_social_support', type: 'text', nullable: true })
  socialSupport?: string;

  @Column({ name: 'sw_observations', type: 'text' })
  observations: string;

  @Column({ name: 'sw_recommendations', type: 'text' })
  recommendations: string;

  @Column({ name: 'created_at', type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @ManyToOne(() => SpecializedAppointment, appointment => appointment.socialWorkReports)
  @JoinColumn({ name: 'id_appointment' })
  appointment: SpecializedAppointment;
}