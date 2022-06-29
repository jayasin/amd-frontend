import { TestBed } from '@angular/core/testing';

import { WeatherNotificationService } from './weather-notification.service';

describe('WeatherNotificationService', () => {
  let service: WeatherNotificationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WeatherNotificationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
