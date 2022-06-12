import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  /* Get User ID */
  /* For now, just tracking data for one user with user id: 1 */
  getUserId(): number {
    return 1;
  }
}
