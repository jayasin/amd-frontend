import { Component } from '@angular/core';
import { WeatherNotificationService } from './services/weather-notification.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  chartData: boolean;

  constructor(public weatherService: WeatherNotificationService) {
    this.weatherService.dataHandler.subscribe({
      next: (res) => {
        this.chartData = !(res === undefined); 
        
      }
    })

  }



}
