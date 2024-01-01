import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {Client} from "../models/client.model";
import {ValidationErrors} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {Notebook} from "../models/notebook.model";
//const baseUrl = 'https://admin-service-cb7m.onrender.com/web/';
const baseUrl = 'http://localhost:8081/';

@Injectable({
  providedIn: 'root'
})
export class ResourcesService {

  constructor(private http:HttpClient) { }

  getResource(id: number): Observable<any> {
    return this.http.get<any>(baseUrl+`resources/${id}`);
  }

  searchNote(keyword : string) : Observable<any>{
    return this.http.get<any>(baseUrl+`pageNoteName/${keyword}`);
  }
  getAllResourcesPages(page: number, size: number): Observable<any> {
    return this.http.get<any>(baseUrl+`resources/fullResourcesPages?page=${page}&size=${size}`);
  }

  editNote(notebook : Notebook): Observable<Notebook> {
    return this.http.put<Notebook>(baseUrl+`notes/${notebook.id}`,notebook);
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
  addNote(notebook : Notebook): Observable<Notebook>{
    return this.http.post<Notebook>(baseUrl+`notes`,notebook);
  }

  deleteResource(id: number): Observable<boolean> {
    return this.http.delete<boolean>(baseUrl+`resources/${id}`);
  }

}
