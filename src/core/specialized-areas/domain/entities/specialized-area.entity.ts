import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { User } from '../../../users/domain/entities/user.entity';
import { SpecializedAppointment } from './specialized-appointment.entity';

@Entity('specialized_area')
export class SpecializedArea {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    name: 'sa_name',
    type: 'enum',
    enum: ['nursing', 'physiotherapy', 'psychology', 'social_work', 'not specified'],
    default: 'not specified'
  })
  name: string;

  @Column({ name: 'sa_description', type: 'text', nullable: true })
  description?: string;

  @Column({ name: 'sa_contact_email', nullable: true })
  contactEmail?: string;

  @Column({ name: 'sa_contact_phone', nullable: true })
  contactPhone?: string;

  @Column({ name: 'sa_is_active', default: true })
  isActive: boolean;

  @Column({ name: 'create_at', type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  createAt: Date;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'id_manager' })
  manager: User;

  @OneToMany(() => SpecializedAppointment, (appointment: SpecializedAppointment) => appointment.area)
  appointments: SpecializedAppointment[];
}