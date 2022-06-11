import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { CoinccapService } from '../../services/coincap/coinccap.service';

@Injectable({
  providedIn: 'root'
})
export class AssetResolver implements Resolve<any> {
  
  constructor(private cc: CoinccapService) {}

  resolve(): Observable<any> {
    return this.cc.getAssets({limit: 5});
  }
}