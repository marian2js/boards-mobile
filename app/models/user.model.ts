export class User {
  id: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  birthday: Date;
  createdAt: Date;
  initials: string;

  isNew() {
    return !this.username;
  }

  get fullname() {
    return `${this.firstName || ''} ${this.lastName || ''}`.trim();
  }
}