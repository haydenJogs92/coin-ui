import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  /* Get User ID */
  getUserId(): number {
    return 1;
  }
}
