import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { convertToQueryString } from '../../lib/helpers';
import { map } from 'rxjs';

// docs https://docs.coincap.io/
const API_BASE_URL = 'https://api.coincap.io/v2';

export interface IAssetConfig {
  limit?: number;
}

@Injectable({
  providedIn: 'root'
})
export class CoinccapService {

  constructor(private http: HttpClient) { }

  getAssets(config: IAssetConfig) {
    return this.http.get(API_BASE_URL + '/assets' + convertToQueryString(config)).pipe(
      map((data: any) => data.data)
    );
  }

  getAsset(assetId: string) {
    return this.http.get(API_BASE_URL + `/assets/${assetId}`).pipe(
      map((data: any) => data.data)
    );
  }
}
