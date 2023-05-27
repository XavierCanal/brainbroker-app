import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import { environment } from 'src/environments/environment.prod';
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class News {
  constructor(private http:HttpClient) {}
  get_actual_news(symbol: string, ): Observable<any> {
    const headers = new HttpHeaders();
    return this.http.get(`${environment.urlApi}plot/getNews/${symbol}`, {
      headers: headers
    })
  }

}

interface JsonBody {
  stock: string;
  interval: string,
  change_points: number;
}
