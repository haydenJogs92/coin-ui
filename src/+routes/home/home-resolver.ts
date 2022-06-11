import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { CoinccapService } from '../../services/coincap/coinccap.service';

@Injectable({
  providedIn: 'root'
})
export class HomeResolver implements Resolve<any> {
  
  constructor(private cc: CoinccapService) {}

  resolve(): Observable<any> {
    // If we want to limit query size, we can pass in configuration
    return this.cc.getAssets(
      {
        // limit: 100
      }
      );
  }
}