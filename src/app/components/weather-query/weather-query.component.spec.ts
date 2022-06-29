import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeatherQueryComponent } from './weather-query.component';

describe('WeatherQueryComponent', () => {
  let component: WeatherQueryComponent;
  let fixture: ComponentFixture<WeatherQueryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WeatherQueryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WeatherQueryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
