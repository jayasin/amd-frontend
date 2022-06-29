import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { IweatherRequestBody } from './Interfaces/common.interface';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class WeatherNotificationService {

  dataHandler: BehaviorSubject<any> = new BehaviorSubject<any>(undefined);

  constructor(private http: HttpClient) { }


  getWeatherData(data: IweatherRequestBody) {
    return this.http.get(`${environment.baseURL}/weather?city=${data.city}&phoneNumber=${data.phoneNumber}`);
  }
  
}
