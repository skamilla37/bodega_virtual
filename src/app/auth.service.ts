import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

interface User {
  username: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  currentUser$ = this.currentUserSubject.asObservable();


  constructor() { }
  login(username: string, password: string): boolean {
    const user : User = {
      username: username,
      password: password
    };
    this.currentUserSubject.next(user);
      return true;
    }
  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }
  logout() {
    this.currentUserSubject.next(null);

  }
}

