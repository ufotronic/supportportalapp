import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

import { User } from 'src/app/model/user';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  public host = environment.apiUrl;
  private token: string = '';
  private loggedInUsername: string = '';

  private jwtHelper = new JwtHelperService();

  constructor(private http: HttpClient) { }


  public login(user: User): Observable<HttpResponse<any> | HttpErrorResponse>{

    return this.http.post<HttpResponse<any> | HttpErrorResponse>(`${this.host}/user/login`, user, {observe: 'response'} );
  }


  public register(user: User): Observable<User | HttpErrorResponse>{

    return this.http.post<User | HttpErrorResponse>(`${this.host}/user/register`, user);
  }


  public logOut(): void {
    this.token = '';
    this.loggedInUsername = '';
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('users');
  }


  public saveToken(token: string): void {
    this.token = token;
    localStorage.setItem('token', token);
  }

  public addUserToLocalCache(user: User): void {
    localStorage.setItem('user', JSON.stringify(user));
  }

  public getUserFromLocalCache(): User {

    var sValue = localStorage['user'] || '';

    return JSON.parse(sValue);

  }

  public loadToken(): void {
    this.token = localStorage['token'] || '';
  }

  public getToken(): string {
    return this.token;
  }

  public isLoggedIn(): boolean {

    var returnVal = false;

    this.loadToken();

    if (this.token != null && this.token != ''){

        if (this.jwtHelper.decodeToken(this.token).sub != null || ''){
          if (!this.jwtHelper.isTokenExpired(this.token)){
              this.loggedInUsername = this.jwtHelper.decodeToken(this.token).sub;
              returnVal = true;
          }
        }

    } else {
        this.logOut();
    }

    return returnVal;
  }





}
