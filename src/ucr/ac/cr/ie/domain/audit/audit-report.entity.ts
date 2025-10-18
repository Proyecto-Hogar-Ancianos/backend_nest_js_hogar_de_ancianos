export class AuditReport {
  id: number;
  arAuditNumber: number;
  arType: string;
  arStartDate: Date;
  arEndDate: Date;
  createAt: Date;
  idGenerator: number;

  constructor(
    id: number,
    arAuditNumber: number,
    arType: string,
    arStartDate: Date,
    arEndDate: Date,
    idGenerator: number,
    createAt?: Date
  ) {
    this.id = id;
    this.arAuditNumber = arAuditNumber;
    this.arType = arType;
    this.arStartDate = arStartDate;
    this.arEndDate = arEndDate;
    this.idGenerator = idGenerator;
    this.createAt = createAt || new Date();
  }
}

export enum AuditReportType {
  GENERAL_ACTIONS = 'general_actions',
  ROLE_CHANGES = 'role_changes',
  OLDER_ADULT_UPDATES = 'older_adult_updates',
  SYSTEM_ACCESS = 'system_access',
  OTHER = 'other'
}