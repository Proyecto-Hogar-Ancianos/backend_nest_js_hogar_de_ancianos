// Re-export from auth for consistency
export { User } from '../auth/core/user.entity';
export { Role, RoleType } from '../auth/core/role.entity';

// Additional user profile information if needed
export class UserProfile {
  userId: number;
  department?: string;
  phoneNumber?: string;
  address?: string;
  emergencyContact?: string;
  profileImage?: string;
  lastLogin?: Date;
  preferences?: string; // JSON string for user preferences

  constructor(
    userId: number,
    department?: string,
    phoneNumber?: string,
    address?: string,
    emergencyContact?: string,
    profileImage?: string,
    lastLogin?: Date,
    preferences?: string
  ) {
    this.userId = userId;
    this.department = department;
    this.phoneNumber = phoneNumber;
    this.address = address;
    this.emergencyContact = emergencyContact;
    this.profileImage = profileImage;
    this.lastLogin = lastLogin;
    this.preferences = preferences;
  }
}