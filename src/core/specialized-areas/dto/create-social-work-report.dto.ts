export class CreateSocialWorkReportDto {
  date: Date;
  reportType: string;
  notes?: string;
  appointmentId: number;
}
