import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { ClinicalHistory } from './clinical-history.entity';

@Entity('clinical_medication')
export class ClinicalMedication {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'm_medication' })
  medication: string;

  @Column({ name: 'm_dosage' })
  dosage: string;

  @Column({
    name: 'm_treatment_type',
    type: 'enum',
    enum: ['temporary', 'chronic', 'preventive', 'other'],
    default: 'other'
  })
  treatmentType: string;

  @ManyToOne(() => ClinicalHistory)
  @JoinColumn({ name: 'id_clinical_history' })
  clinicalHistory: ClinicalHistory;
}