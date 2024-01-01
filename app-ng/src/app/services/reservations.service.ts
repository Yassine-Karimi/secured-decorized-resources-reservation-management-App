import { Injectable } from '@angular/core';
import {ValidationErrors} from "@angular/forms";
import {Platform} from "../models/platform.model";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Client} from "../models/client.model";
// const baseUrl = 'https://admin-service-cb7m.onrender.com/web/';
 const baseUrl = 'http://localhost:8082/';

@Injectable({
  providedIn: 'root'
})
export class ReservationsService {

  constructor(private httpClient:HttpClient) { }
  getErrorMessage(field: string, error: ValidationErrors) {
    if(error['required']){
      return field + " is Required !";
    } else if(error['maxlength']){
      return field+" should have no more than " + error['maxlength']['requiredLength'] + " Characters !";
    } else if(error['min']) {
      return field + " must be more than " + error['min']['min'] + " km/h !";
    }else return "Invalid Input!";
  }
  public addReservation(platform: FormData)
  {
    return this.httpClient.post(baseUrl+"reservations",platform);
  }

  editReservation(formData : FormData, id : number): Observable<any> {
    return this.httpClient.put<any>(baseUrl+`reservations/${id}`,formData);
  }

  deleteReservation(id: number): Observable<boolean> {
    return this.httpClient.delete<boolean>(baseUrl+`reservations/${id}`);
  }


  public getAllReservations(admin_id:Observable<never> | number)
  {
    return this.httpClient.get<any>(baseUrl+`reservations/fullReservationsPages/${admin_id}?page=0&size=20`);
  }


  getAllReservationsPages(page: number, size: number): Observable<any> {
    return this.httpClient.get<any>(baseUrl+`reservations/fullReservationsPages?page=${page}&size=${size}`);
  }

  searchReservations(keyword: string) : Observable<any>{
    return this.httpClient.get<any>(baseUrl+`pageRservationsName/${keyword}`);

  }


  getReservation(id: number): Observable<Platform> {
    return this.httpClient.get<Platform>(baseUrl+`reservations/${id}`);
  }
}
