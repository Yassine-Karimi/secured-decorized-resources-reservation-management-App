import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Client } from '../models/client.model';
import {ValidationErrors} from "@angular/forms";

// const baseUrl = 'https://admin-service-cb7m.onrender.com/web/';
const baseUrl = 'http://localhost:8082/';


@Injectable({
  providedIn: 'root'
})
export class PersonService {

  constructor(private http: HttpClient) { }
  getAllClients(): Observable<Client[]> {
    return this.http.get<Client[]>(baseUrl+`persons`);
  }


  getClient(id: number): Observable<Client> {
    return this.http.get<Client>(baseUrl+`persons/${id}`);
  }


/*
  getAllClientsPages(page: number, size: number): Observable<any> {
    return this.http.get<any>(`http://localhost:8890/INFRACTION-SERVICE/api/infraction/fullInfractionsPages?page=${page}&size=${size}`);
  }
*/
  getClientsCount(): Observable<number> {
    return this.http.get<number>(baseUrl+`persons/count`);
  }
  searchAdmin(keyword : string) : Observable<any>{
    return this.http.get<any>(baseUrl+`persons/pageAdminName/${keyword}`);
  }
  getAllClientPages(page: number, size: number): Observable<any> {
    return this.http.get<any>(baseUrl+`persons/fullPersonsPages?page=${page}&size=${size}`);
  }

  editClient(client : Client): Observable<Client> {
    return this.http.put<Client>(baseUrl+`admins/${client.id}`,client);
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
  addClient(client : Client): Observable<Client>{
    return this.http.post<Client>(baseUrl+`persons`,client);
  }

  deleteClient(id: number): Observable<boolean> {
    return this.http.delete<boolean>(baseUrl+`persons/${id}`);
  }



}
