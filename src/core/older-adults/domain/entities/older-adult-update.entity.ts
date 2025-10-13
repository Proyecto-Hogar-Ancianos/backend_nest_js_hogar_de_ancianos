import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { OlderAdult } from './older-adult.entity';
import { User } from '../../../users/domain/entities/user.entity';

@Entity('older_adult_updates')
export class OlderAdultUpdate {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => OlderAdult)
  @JoinColumn({ name: 'id_older_adult' })
  olderAdult: OlderAdult;

  @Column({ name: 'field_changed' })
  fieldChanged: string;

  @Column({ name: 'old_value', type: 'text', nullable: true })
  oldValue?: string;

  @Column({ name: 'new_value', type: 'text', nullable: true })
  newValue?: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'changed_by' })
  changedBy: User;

  @Column({ name: 'changed_at', type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  changedAt: Date;
}