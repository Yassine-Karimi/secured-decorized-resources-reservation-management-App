import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly userIdKey = 'userId'; // Key for localStorage
  private readonly sessionIdKey = 'sessionId';

  constructor() {}

  setUserId(userId: number) {
    localStorage.setItem(this.userIdKey, userId.toString());
  }

  getUserId(): number {
    const userId = localStorage.getItem(this.userIdKey);
    return userId ? +userId : 0; // Convert to number or return 0 if not found
  }
  setSessionId(sessionId: number) {
    localStorage.setItem(this.sessionIdKey, sessionId.toString());
  }

  getSessionId(): number {
    const sessionId = localStorage.getItem(this.sessionIdKey);
    return sessionId ? +sessionId : 0; // Convert to number or return 0 if not found
  }
}
