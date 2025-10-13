export class CreateNursingRecordDto {
  date: Date;
  temperature?: number;
  bloodPressure?: string;
  heartRate?: number;
  painLevel?: number;
  mobility: string;
  appetite: string;
  sleepQuality: string;
  notes?: string;
  appointmentId: number;
}
