import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CalenderService {

  constructor(private http:HttpClient) { }

  url="http://localhost:3000/calender";

  getAllDetails():Observable<any>{
    return this.http.get(this.url);
  }
  getSingleDetails(id:any):Observable<any>{
    let ids = id;
    return this.http.get(`${this.url}/${ids}`);
  }
  createItemsDetails(data:any):Observable<any>{
    return this.http.post(this.url, data);
  }
  updateItemsDetail(data:any, id:any){
    return this.http.put(`${this.url}/${id}`,data);
  }
  deleteItemsDetail(id:any):Observable<any>{
    let ids=id;
    return this.http.delete(`${this.url}/${ids}`);
}

}
