import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('role_changes')
export class RoleChange {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'user_id' })
  userId: number;

  @Column({ name: 'old_role', nullable: true })
  oldRole?: string;

  @Column({ name: 'new_role', nullable: true })
  newRole?: string;

  @Column({ name: 'changed_by' })
  changedBy: number;

  @Column({ name: 'changed_at', type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  changedAt: Date;
}
