import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CurrencyService {
  private apiUrl = 'https://openexchangerates.org/api/latest.json';
  private apiKey = '817f7ff95f254237ba54fe87f1aedfc2';

  constructor(private http: HttpClient) {}

  //Receiving currency values from service
  getCurrencyRates(): Observable<any> {
    const url = `${this.apiUrl}?app_id=${this.apiKey}`;
    return this.http.get(url);
  }
}
