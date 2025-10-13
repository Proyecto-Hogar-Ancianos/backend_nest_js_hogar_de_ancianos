import { EmergencyContact } from '../entities/emergency-contact.entity';

export interface EmergencyContactRepository {
  findAll(): Promise<EmergencyContact[]>;
  findById(id: number): Promise<EmergencyContact | null>;
  findByOlderAdult(olderAdultId: number): Promise<EmergencyContact[]>;
  create(emergencyContact: Partial<EmergencyContact>): Promise<EmergencyContact>;
  update(id: number, emergencyContact: Partial<EmergencyContact>): Promise<EmergencyContact>;
  delete(id: number): Promise<void>;
}