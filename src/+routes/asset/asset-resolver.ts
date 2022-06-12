import { Injectable } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { CoinccapService } from '../../services/coincap/coinccap.service';

@Injectable({
  providedIn: 'root'
})
export class AssetResolver implements Resolve<any> {
  
  constructor(private cc: CoinccapService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<any> {
    const assetID = route.params['assetID'];
    return this.cc.getAsset(assetID);
  }
}