import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable , of } from 'rxjs';
import { tap } from 'rxjs/operators';

export function generateNoCacheHeaders(headers: HttpHeaders = new HttpHeaders()): HttpHeaders {
  return headers.append('no-cache', '1');
}

@Injectable()
export class GlobalInterceptor implements HttpInterceptor {

  private cache: Map<string, HttpResponse<any>> = new Map();

  constructor() {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
    
    // Only Cache GET Requests
    // TODO: if no-cache headers present, then don't return cached result
    if (req.method !== "GET" && !req.headers.has('no-cache')) {
        return next.handle(req)
    }
    
    // Cache the response
    const cachedResponse = this.cache.get(req.urlWithParams);

    if (cachedResponse) {
        // return cache
        return of(cachedResponse.clone())
    } else {
      return next.handle(req).pipe(
        tap(stateEvent => {
            if(stateEvent instanceof HttpResponse) {
                // set the cache
                this.cache.set(req.urlWithParams, stateEvent.clone())
            }
        })
      )
    }
  }    
}

