import { SpecializedAppointment } from '../entities/specialized-appointment.entity';

export interface SpecializedAppointmentRepository {
  findAll(): Promise<SpecializedAppointment[]>;
  findById(id: number): Promise<SpecializedAppointment | null>;
  findByArea(areaId: number): Promise<SpecializedAppointment[]>;
  findByOlderAdult(olderAdultId: number): Promise<SpecializedAppointment[]>;
  findBySpecialist(specialistId: number): Promise<SpecializedAppointment[]>;
  create(appointment: Partial<SpecializedAppointment>): Promise<SpecializedAppointment>;
  update(id: number, appointment: Partial<SpecializedAppointment>): Promise<SpecializedAppointment>;
  delete(id: number): Promise<void>;
}