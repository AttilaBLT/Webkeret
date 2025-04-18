import { User } from "../interfaces";

export class UserService {
    private users: User[] = [];
  
    addUser(user: User): void {
      this.users.push(user);
    }
  
    getUserById(id: number): User | undefined {
      return this.users.find(user => user.id === id);
    }
  
    getAllUsers(): User[] {
      return this.users;
    }
  }
  