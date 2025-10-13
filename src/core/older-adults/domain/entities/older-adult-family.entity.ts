import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { OlderAdult } from './older-adult.entity';

@Entity('older_adult_family')
export class OlderAdultFamily {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'pf_identification' })
  identification: string;

  @Column({ name: 'pf_name' })
  name: string;

  @Column({ name: 'pf_f_last_name' })
  fLastName: string;

  @Column({ name: 'pf_s_last_name' })
  sLastName: string;

  @Column({ name: 'pf_phone_number', nullable: true })
  phoneNumber?: string;

  @Column({ name: 'pf_email', unique: true })
  email: string;

  @Column({ 
    name: 'pf_kinship',
    type: 'enum',
    enum: [
      'son', 'daughter', 'grandson', 'granddaughter', 'brother', 'sister',
      'nephew', 'niece', 'husband', 'wife', 'legal guardian', 'other', 'not specified'
    ],
    default: 'not specified'
  })
  kinship: string;

  @Column({ name: 'create_at', type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  createAt: Date;

  @OneToMany(() => OlderAdult, olderAdult => olderAdult.family)
  olderAdults: OlderAdult[];
}