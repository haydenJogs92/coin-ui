import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { convertToQueryString } from '../../lib/helpers';
import { map } from 'rxjs';

// docs https://docs.coincap.io/
const API_BASE_URL = 'https://api.coincap.io/v2';

export interface IAssetConfig {
  limit?: number;
  ids?: string // comma separated list
}

@Injectable({
  providedIn: 'root'
})
export class CoinccapService {

  constructor(private http: HttpClient) { }

  getAssets(config: IAssetConfig, headers?: HttpHeaders) {
    return this.http.get(API_BASE_URL + '/assets' + convertToQueryString(config),
      {headers: headers}
    ).pipe(
      map((data: any) => data.data)
    );
  }

  getAsset(assetId: string, headers?: HttpHeaders) {
    return this.http.get(API_BASE_URL + `/assets/${assetId}`,
      {headers: headers}
    ).pipe(
      map((data: any) => data.data)
    );
  }

  getAssetHistory(assetId: string, interval: string) {
    return this.http.get(API_BASE_URL + `/assets/${assetId}/history?interval=${interval}`).pipe(
      map((data: any) => data.data)
    );
  }
}
