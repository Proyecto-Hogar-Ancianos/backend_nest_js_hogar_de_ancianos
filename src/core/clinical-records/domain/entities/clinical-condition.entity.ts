import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('clinical_conditions')
export class ClinicalCondition {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'cc_name' })
  name: string;
}