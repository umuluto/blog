import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Subject, catchError, concat, interval, map, of, shareReplay, switchMap, tap, timer, withLatestFrom } from 'rxjs';

export interface Auth {
  user_id: string,
  exp: number,
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _auth$ = new Subject<Auth | null>();

  auth$ = concat(this.ping(), this._auth$).pipe(
    switchMap(auth => {
      if (auth === null) return of(null);

      const exp = new Date(auth.exp * 1000);
      return concat(
        of(auth),
        timer(exp).pipe(map(() => null))
      );
    }),
    shareReplay({ bufferSize: 1, refCount: false })
  );

  constructor(private http: HttpClient) {
    interval(1000).pipe(
      withLatestFrom(this.auth$),
      tap(console.log)
    ).subscribe()
  }

  login(username: string, password: string) {
    return this.http.post<Auth>('api/login', { username, password }).pipe(
      tap(auth => this._auth$.next(auth))
    )
  }

  logout() {
    return this.http.post<{ message: string }>('api/logout', null).pipe(
      tap(() => this._auth$.next(null))
    )
  }

  register(fullname: string, username: string, password: string) {
    return this.http.post<{ message: string }>('api/register', { fullname, username, password });
  }

  private ping() {
    return this.http.get<Auth>('api/ping').pipe(
      catchError(() => of(null))
    );
  }
}
