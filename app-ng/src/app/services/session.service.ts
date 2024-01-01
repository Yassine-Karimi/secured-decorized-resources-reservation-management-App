import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Session} from "../models/session.model";
import {ValidationErrors} from "@angular/forms";
import {Client} from "../models/client.model";
const baseUrl = 'https://admin-service-cb7m.onrender.com/web/';
// const baseUrl = 'http://localhost:8081/web/';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  session: Session = new class implements Session {
    date_login!: any;
    date_logout!: any;
    device_info!: string;
    id!: number;
    ip_adresse!: string;
    role!: any;
    username!: string;
  }();

  constructor(private http: HttpClient) { }


  getSession(id: number): Observable<Session> {
    return this.http.get<Session>(baseUrl+`sessions/${id}`);
  }

  setClientIpAddress(): void {
    this.http.get<{ ip: string }>(baseUrl+'get-client-ip').subscribe(
      (response) => {
        this.session.ip_adresse = response.ip; // Store the IP address in this.session.ip_adresse
      },
      (error) => {
        console.error('Error fetching IP:', error);
        // Handle errors if needed
      }
    );
  }
  getSessionIP(): any{
    return this.session.ip_adresse;
  }

  getAllSessionsPages(page: number, size: number): Observable<any> {
    return this.http.get<any>(baseUrl+`fullSessionsPages?page=${page}&size=${size}`);
  }

  editSession(id:number,session : Session): Observable<Session> {
    return this.http.put<Session>(baseUrl+`sessions/${id}`,session);
  }

  getErrorMessage(field: string, error: ValidationErrors) {
    if(error['required']){
      return field + " is Required !";
    } else if(error['maxlength']){
      return field+" should have no more than " + error['maxlength']['requiredLength'] + " Characters !";
    } else if(error['min']) {
      return field + " must be more than " + error['min']['min'] + " km/h !";
    }else return "Invalid Input!";
  }
  addSession(session : Session): Observable<Session>{
    return this.http.post<Session>(baseUrl+`sessions`,session);
  }

  deleteSession(id: number): Observable<boolean> {
    return this.http.delete<boolean>(baseUrl+`sessions/${id}`);
  }





}
