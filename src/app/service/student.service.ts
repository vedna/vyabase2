import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  baseUrl= 'http://localhost:3000/students';
  constructor(private http:HttpClient) { }

  getStudentsData():Observable<any>{
   return this.http.get(this.baseUrl);
  }

  getSingleData(id:any):Observable<any>{
    let ids=id;
    return this.http.get(`${this.baseUrl}/${ids}`)
  }
  
  postAppointmentData(data:any):Observable<any>{
    return this.http.post(this.baseUrl, data);
  }
  updateData(data:any,id:any){
    return this.http.put(`${this.baseUrl}/${id}`,data);
  }

  deleteData(id:any):Observable<any>{
    let ids = id;
    return this.http.delete(`${this.baseUrl}/${ids}`);
  }
}
