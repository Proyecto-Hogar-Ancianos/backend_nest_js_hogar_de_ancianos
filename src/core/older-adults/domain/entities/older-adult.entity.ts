import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { Program } from '../../../programs/domain/entities/program.entity';
import { OlderAdultFamily } from './older-adult-family.entity';
import { EmergencyContact } from './emergency-contact.entity';

@Entity('older_adult')
export class OlderAdult {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'oa_identification', unique: true })
  identification: string;

  @Column({ name: 'oa_name' })
  name: string;

  @Column({ name: 'oa_f_last_name' })
  fLastName: string;

  @Column({ name: 'oa_s_last_name', nullable: true })
  sLastName?: string;

  @Column({ name: 'oa_birthdate' })
  birthdate: Date;

  @Column({ 
    name: 'oa_marital_status',
    type: 'enum',
    enum: ['single', 'married', 'divorced', 'widowed', 'common law union', 'separated', 'not specified'],
    default: 'not specified'
  })
  maritalStatus: string;

  @Column({ name: 'oa_dwelling', type: 'text' })
  dwelling: string;

  @Column({ 
    name: 'oa_years_schooling',
    type: 'enum',
    enum: [
      'no schooling', 
      'incomplete primary', 
      'complete primary', 
      'incomplete secondary',
      'complete secondary', 
      'technical degree', 
      'incomplete university', 
      'complete university',
      'postgraduate', 
      'not specified'
    ],
    default: 'not specified'
  })
  yearsSchooling: string;

  @Column({ name: 'oa_previous_work' })
  previousWork: string;

  @Column({ name: 'oa_is_retired', default: false })
  isRetired: boolean;

  @Column({ name: 'oa_has_pension', default: false })
  hasPension: boolean;

  @Column({ name: 'oa_other', default: false })
  other: boolean;

  @Column({ name: 'oa_other_description', nullable: true })
  otherDescription?: string;

  @Column({ name: 'oa_area_of_origin' })
  areaOfOrigin: string;

  @Column({ name: 'oa_children_count', type: 'tinyint', unsigned: true, default: 0 })
  childrenCount: number;

  @Column({ 
    name: 'oa_status',
    type: 'enum',
    enum: ['alive', 'dead'],
    default: 'alive'
  })
  status: string;

  @Column({ name: 'oa_death_date', nullable: true })
  deathDate?: Date;

  @Column({ name: 'oa_economic_income', type: 'decimal', precision: 10, scale: 2 })
  economicIncome: number;

  @Column({ name: 'oa_phone_numner' })
  phoneNumber: string;

  @Column({ name: 'oa_email' })
  email: string;

  @Column({ name: 'oa_profile_photo_url', nullable: true })
  profilePhotoUrl?: string;

  @Column({ 
    name: 'oa_gender',
    type: 'enum',
    enum: ['male', 'female', 'not specified'],
    default: 'not specified'
  })
  gender: string;

  @Column({ 
    name: 'oa_blood_type',
    type: 'enum',
    enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-', 'UNKNOWN'],
    default: 'UNKNOWN'
  })
  bloodType: string;

  @Column({ name: 'create_at', type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  createAt: Date;

  @ManyToOne(() => Program, { nullable: true })
  @JoinColumn({ name: 'id_program' })
  program?: Program;

  @ManyToOne(() => OlderAdultFamily, { nullable: true })
  @JoinColumn({ name: 'id_family' })
  family?: OlderAdultFamily;

  @OneToMany(() => EmergencyContact, contact => contact.olderAdult)
  emergencyContacts: EmergencyContact[];
}
