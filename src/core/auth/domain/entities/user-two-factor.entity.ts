import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { User } from '../../../users/domain/entities/user.entity';

@Entity('user_two_factor')
export class UserTwoFactor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'user_id', unique: true })
  userId: number;

  @Column({ name: 'tfa_secret' })
  tfaSecret: string;

  @Column({ name: 'tfa_enabled', default: false })
  tfaEnabled: boolean;

  @Column({ name: 'tfa_backup_codes', type: 'text', nullable: true })
  tfaBackupCodes: string;

  @Column({ name: 'tfa_last_used', type: 'datetime', nullable: true })
  tfaLastUsed: Date;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;
}
