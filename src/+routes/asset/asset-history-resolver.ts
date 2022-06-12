import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { CoinccapService } from '../../services/coincap/coinccap.service';

@Injectable({
  providedIn: 'root'
})
export class AssetHistoryResolver implements Resolve<any> {
  
  constructor(private cc: CoinccapService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<any> {
    // TODO (possibly get asset history instead)
    const assetID = route.params['assetID'];
    return this.cc.getAssetHistory(assetID, 'd1');
  }
}