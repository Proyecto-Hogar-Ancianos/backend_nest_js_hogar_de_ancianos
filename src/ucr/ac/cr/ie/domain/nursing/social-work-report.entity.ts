import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn, Index } from 'typeorm';
import { SpecializedAppointment } from './specialized-appointment.entity';

export enum SocialWorkVisitType {
    HOME_VISIT = 'home visit',
    INSTITUTIONAL_VISIT = 'institutional visit',
    INTERVIEW = 'interview',
    FOLLOW_UP = 'follow_up'
}

@Entity('social_work_reports')
@Index(['create_at'])
export class SocialWorkReport {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'sw_date', type: 'datetime', nullable: true, default: () => 'CURRENT_TIMESTAMP' })
    sw_date: Date | null;

    @Column({
        name: 'sw_visit_type',
        type: 'enum',
        enum: SocialWorkVisitType,
        nullable: true,
        default: SocialWorkVisitType.INTERVIEW
    })
    sw_visit_type: SocialWorkVisitType | null;

    @Column({ name: 'sw_family_relationship', type: 'text', nullable: true })
    sw_family_relationship: string | null;

    @Column({ name: 'sw_economic_assessment', type: 'text', nullable: true })
    sw_economic_assessment: string | null;

    @Column({ name: 'sw_social_support', type: 'text', nullable: true })
    sw_social_support: string | null;

    @Column({ name: 'sw_observations', type: 'text', nullable: true })
    sw_observations: string | null;

    @Column({ name: 'sw_recommendations', type: 'text', nullable: true })
    sw_recommendations: string | null;

    @CreateDateColumn({ name: 'create_at' })
    create_at: Date;

    @ManyToOne(() => SpecializedAppointment, { onDelete: 'CASCADE', nullable: true })
    @JoinColumn({ name: 'id_appointment' })
    id_appointment: SpecializedAppointment | null;
}
