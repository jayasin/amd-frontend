import { Component, OnInit } from '@angular/core';
import { WeatherNotificationService } from 'src/app/services/weather-notification.service';
import * as moment from 'moment';
import { Color } from 'ng2-charts';
import { ChartOptions } from 'chart.js';



@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css']
})
export class LineChartComponent implements OnInit {
  public lineChartOptions: ChartOptions = {
  
    responsive: true,
    animation: {
      duration: 0
  },
  tooltips: {
    callbacks: {
      label: (Item: any) => Item.label + ' - ' + (Number(Item.value).toFixed(2)) + ' C'
    }
  },
  legend: { display: false },
  scales: {
    xAxes: [{
        gridLines: {
            color: "rgba(0, 0, 0, 0)",
        }
    }],
},
  };
  public lineChartLabels = [];
  public lineChartLegend = true; 
  public lineData: number[] = [];
  public lineChartData = [];
  public lineChartColors: Color[] = [
    {
      borderColor: '#65A0BA',
      backgroundColor: '#FFF0',
    },
  ];
  


  
 

  constructor(public weatherService : WeatherNotificationService) { }

  ngOnInit(): void {

    /* Getting data and manipulating the chart */
    this.weatherService.dataHandler.subscribe(({
      next: (res: any) =>  {
        if(res) {

          this.lineChartLabels = [...this.lineChartLabels, moment(res.smsData.createdAt).format('hh:mm')];
          this.lineData = [...this.lineData, res.weatherdata.main.temp - 273.15];
          this.lineChartData = [{data: this.lineData, label: res.weatherdata.name+ " Temprature", pointBackgroundColor: "#65A0BA"}]
        }
      }
    }));

  }

  

}
