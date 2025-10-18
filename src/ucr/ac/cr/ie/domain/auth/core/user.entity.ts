export class User {
  id: number;
  uIdentification: string;
  uName: string;
  uFLastName: string;
  uSLastName?: string;
  uEmail: string;
  uEmailVerified: boolean;
  uPassword: string;
  uIsActive: boolean;
  createAt: Date;
  roleId: number;

  constructor(
    id: number,
    uIdentification: string,
    uName: string,
    uFLastName: string,
    uEmail: string,
    uPassword: string,
    roleId: number,
    uSLastName?: string,
    uEmailVerified: boolean = false,
    uIsActive: boolean = true,
    createAt?: Date
  ) {
    this.id = id;
    this.uIdentification = uIdentification;
    this.uName = uName;
    this.uFLastName = uFLastName;
    this.uSLastName = uSLastName;
    this.uEmail = uEmail;
    this.uEmailVerified = uEmailVerified;
    this.uPassword = uPassword;
    this.uIsActive = uIsActive;
    this.createAt = createAt || new Date();
    this.roleId = roleId;
  }
}