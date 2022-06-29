import { Component, OnInit } from '@angular/core';
import { WeatherNotificationService } from 'src/app/services/weather-notification.service';

@Component({
  selector: 'app-response-list',
  templateUrl: './response-list.component.html',
  styleUrls: ['./response-list.component.css']
})
export class ResponseListComponent implements OnInit {
  value: any[] = [];

  constructor(public weatherService: WeatherNotificationService) {
  /* Getting data and manipulating the table */
    this.weatherService.dataHandler.subscribe({
      next: (res: any) => {
        if(res) {
          this.value.push(res)
        }
        
      }
    })
   }

  ngOnInit(): void {
   
  }

}
