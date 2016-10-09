import {User} from './user.model';

export interface TeamUser {
  id?: string;
  user?: User;
  initials: string;
  isOwner: boolean;
}

export class Team {
  id: string;
  name: string;
  users: Array<TeamUser> = [];
  createdAt: Date;

  getUsers() {
    return this.users.map(u => {
      let user = u.user;
      user.initials = u.initials;
      return user;
    });
  }
}