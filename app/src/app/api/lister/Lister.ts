import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import { environment } from 'src/environments/environment.prod';
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class Lister {
  constructor(private http:HttpClient) {}
  get():Observable<any> {
    console.log("get" + environment.urlApi)
    const headers = new HttpHeaders()
    return this.http.get(`${environment.urlApi}binance/getSymbols/ETHBTC`, {
      headers: headers
    })
  }
}
