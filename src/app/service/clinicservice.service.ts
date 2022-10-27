import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClinicserviceService {

  url="http://localhost:3000/clinic";

  constructor(private http:HttpClient) { }

  getClinicDetails():Observable<any>{
    return this.http.get(this.url);
  }
  getSingleData(id:any):Observable<any>{
    let ids=id;
    return this.http.get(`${this.url}/${ids}`)
  }
  postClinicDetails(data:any):Observable<any>{
    return this.http.post(this.url, data);
  }
  updateDetails(data:any, id: any){
    return this.http.put(`${this.url}/${id}`,data);
  }

  deleteDetails(id):Observable<any>{
    let ids=id;
    return this.http.delete(`${this.url}/${ids}`);
  }
}
