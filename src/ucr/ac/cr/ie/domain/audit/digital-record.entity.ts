export class DigitalRecord {
  id: number;
  drUserId: number;
  drAction: string;
  drTableName?: string;
  drRecordId?: number;
  drDescription?: string;
  drTimestamp: Date;

  constructor(
    id: number,
    drUserId: number,
    drAction: string,
    drTableName?: string,
    drRecordId?: number,
    drDescription?: string,
    drTimestamp?: Date
  ) {
    this.id = id;
    this.drUserId = drUserId;
    this.drAction = drAction;
    this.drTableName = drTableName;
    this.drRecordId = drRecordId;
    this.drDescription = drDescription;
    this.drTimestamp = drTimestamp || new Date();
  }
}

export enum AuditAction {
  LOGIN = 'login',
  LOGOUT = 'logout',
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  VIEW = 'view',
  EXPORT = 'export',
  OTHER = 'other'
}