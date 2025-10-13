export class UpdateSpecializedAppointmentDto {
  appointmentDate?: Date;
  appointmentType?: string;
  priority?: string;
  status?: string;
  notes?: string;
  observations?: string;
  durationMinutes?: number;
  nextAppointment?: Date;
  areaId?: number;
  patientId?: number;
  staffId?: number;
}
