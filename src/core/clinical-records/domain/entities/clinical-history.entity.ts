import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from 'typeorm';
import { ClinicalCondition } from './clinical-condition.entity';
import { Vaccine } from './vaccine.entity';

@Entity('clinical_history')
export class ClinicalHistory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'ch_frequent_falls', default: false })
  frequentFalls: boolean;

  @Column({ name: 'ch_weight', type: 'decimal', precision: 5, scale: 2, nullable: true })
  weight?: number;

  @Column({ name: 'ch_height', type: 'decimal', precision: 4, scale: 2, nullable: true })
  height?: number;

  @Column({ name: 'ch_imc', type: 'decimal', precision: 4, scale: 1, nullable: true })
  imc?: number;

  @Column({ name: 'ch_blood_pressure', nullable: true })
  bloodPressure?: string;

  @Column({ name: 'ch_neoplasms', default: false })
  neoplasms: boolean;

  @Column({ name: 'ch_neoplasms_description', nullable: true })
  neoplasmsDescription?: string;

  @Column({ name: 'ch_observations', type: 'text', nullable: true })
  observations?: string;

  @Column({
    name: 'ch_rcvg',
    type: 'enum',
    enum: ['< 10%', 'e /10y20%', 'e /20y30%', 'e /40y40%', '> 40%', 'UNKNOWN'],
    default: 'UNKNOWN'
  })
  rcvg: string;

  @Column({ name: 'ch_vision_problems', default: false })
  visionProblems: boolean;

  @Column({ name: 'ch_vision_hearing', default: false })
  visionHearing: boolean;

  @Column({ name: 'create_at', type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  createAt: Date;

  @ManyToMany(() => ClinicalCondition)
  @JoinTable({
    name: 'clinical_history_and_conditions',
    joinColumn: {
      name: 'id_c_history',
      referencedColumnName: 'id'
    },
    inverseJoinColumn: {
      name: 'id_c_condition',
      referencedColumnName: 'id'
    }
  })
  conditions: ClinicalCondition[];

  @ManyToMany(() => Vaccine)
  @JoinTable({
    name: 'vaccines_and_clinical_history',
    joinColumn: {
      name: 'id_c_history',
      referencedColumnName: 'id'
    },
    inverseJoinColumn: {
      name: 'id_vaccine',
      referencedColumnName: 'id'
    }
  })
  vaccines: Vaccine[];
}