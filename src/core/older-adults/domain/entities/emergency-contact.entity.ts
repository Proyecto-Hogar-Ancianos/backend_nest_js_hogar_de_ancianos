import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { OlderAdult } from './older-adult.entity';

@Entity('emergency_contacts')
export class EmergencyContact {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'en_phone_number' })
  phoneNumber: string;

  @Column({ name: 'create_at', type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  createAt: Date;

  @ManyToOne(() => OlderAdult, olderAdult => olderAdult.emergencyContacts)
  @JoinColumn({ name: 'id_older_adult' })
  olderAdult: OlderAdult;
}
