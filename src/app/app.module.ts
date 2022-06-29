import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { WeatherQueryComponent } from './components/weather-query/weather-query.component';
import { WeatherNotificationService } from './services/weather-notification.service';
import { LineChartComponent } from './components/line-chart/line-chart.component';
import { ChartsModule } from 'ng2-charts';
import { ResponseListComponent } from './components/response-list/response-list.component';

@NgModule({
  declarations: [
    AppComponent,
    WeatherQueryComponent,
    LineChartComponent,
    ResponseListComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    ChartsModule,
  ],
  providers: [WeatherNotificationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
