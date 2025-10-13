import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('vaccines')
export class Vaccine {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'v_name' })
  name: string;
}