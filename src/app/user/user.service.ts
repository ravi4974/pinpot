import { Injectable } from '@angular/core';
import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private users: User[] = [{
    id: 'User 1',
    name: 'Ravi Shankar',
    gender: 'M',
    password: 'abcd',
    email: 'abcd@gmail.com'
  }];

  user: User;

  constructor() { }

  private userThumbnail(user: User): string {
    if ( user.thumbnail ) {
      return user.thumbnail;
    }
    if ( user.gender === 'F' ) {
      return '/assets/images/users/female.png';
    }

    return '/assets/images/users/male.png';
  }
  getUsers(): User[] {
    const users = this.users.map((u) => ({...u, thumbnail: this.userThumbnail(u)}));
    return users;
  }

  getUserDetails(): User {
    if (!this.user) {
      this.user = this.users[0];
    }
    const user = {...this.user, thumbnail: this.userThumbnail(this.user)};
    return user;
  }

  register(user: User) {
    this.user = user;
  }
}
