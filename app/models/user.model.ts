export class User {
  id: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  birthday: Date;
  createdAt: Date;

  isNew() {
    return !this.username;
  }
}