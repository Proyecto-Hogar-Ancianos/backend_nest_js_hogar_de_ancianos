export class RoleChange {
  id: number;
  rcOldRole: string;
  rcNewRole: string;
  changedAt: Date;
  idUser: number; // Usuario afectado
  changedBy: number; // Admin que hizo el cambio

  constructor(
    id: number,
    rcOldRole: string,
    rcNewRole: string,
    idUser: number,
    changedBy: number,
    changedAt?: Date
  ) {
    this.id = id;
    this.rcOldRole = rcOldRole;
    this.rcNewRole = rcNewRole;
    this.idUser = idUser;
    this.changedBy = changedBy;
    this.changedAt = changedAt || new Date();
  }
}