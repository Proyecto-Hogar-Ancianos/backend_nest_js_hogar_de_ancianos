export class Role {
  id: number;
  rName: string;

  constructor(
    id: number,
    rName: string
  ) {
    this.id = id;
    this.rName = rName;
  }
}

export enum RoleType {
  SUPER_ADMIN = 'super admin',
  ADMIN = 'admin',
  DIRECTOR = 'director',
  NURSE = 'nurse',
  PHYSIOTHERAPIST = 'physiotherapist',
  PSYCHOLOGIST = 'psychologist',
  SOCIAL_WORKER = 'social worker',
  NOT_SPECIFIED = 'not specified'
}