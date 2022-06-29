import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { WeatherNotificationService } from 'src/app/services/weather-notification.service';
import { zip, from, interval } from "rxjs";

@Component({
  selector: 'app-weather-query',
  templateUrl: './weather-query.component.html',
  styleUrls: ['./weather-query.component.css']
})
export class WeatherQueryComponent implements OnInit {
  weatherRequestForm: FormGroup;
  isErrorOccured: boolean = false;
  cityError: boolean = false;
  phoneError: boolean = false;
  cityErrorText: string = "Enter city name";
  phoneErrorText: string = "Enter Mobile Number";
  multiplier: number = 1;
  formError: boolean = false;
  disableButton: boolean = false;


  constructor(
    private fb: FormBuilder,
    private weatherNotificationService: WeatherNotificationService,
  ) {

  }

  ngOnInit(): void {
   this.weatherRequestForm = this.fb.group({
    city: ['', Validators.required],
    phoneNumber: ['', Validators.required]
   });
  }

  /* To enable and disable the form fields */
  formActionHandler(isEnable: boolean) {
    if(isEnable) {
      this.disableButton = false;
      this.weatherRequestForm.controls['city'].enable();
      this.weatherRequestForm.controls['phoneNumber'].enable();
    } else {
      this.disableButton = true;
      this.weatherRequestForm.controls['city'].disable();
      this.weatherRequestForm.controls['phoneNumber'].disable();
    }

  }


  /* Reset Error up form submission */
  resetErrors() {
    this.cityError = false;
    this.phoneError = false;
    this.cityErrorText = "Enter city name";
    this.phoneErrorText = "Enter Mobile Number";
    this.isErrorOccured = false;
  }

  /* Error Handling Logic */
  errorHandler(err: any) {
    
      this.isErrorOccured = true;
      const errorMessage = err?.error?.message?.split("~~");
      if(errorMessage.length) {
        const [field, message] = errorMessage;
        if(field === "city") {
          this.cityError = true;
          this.cityErrorText = message;
        } else if (field === "phone") {
          this.phoneError = true;
          this.phoneErrorText = message;
        }
      }          
    
}



/* Form Submission Handler function */
  onSubmit() {
    this.formError = false;

    if(this.weatherRequestForm.value.city === "") {
      this.cityError = true;
      this.formError = true;
      this.cityErrorText = "City should not be empty"
    }
    
    if(this.weatherRequestForm.value.phoneNumber === "") {
      this.phoneError = true;
      this.formError = true;
      this.phoneErrorText = "Phone number not be empty"
    }

    if(this.formError) return

    const data = {...this.weatherRequestForm.value};
    this.resetErrors();


    /* First time API calling should be instance  */
    
    this.weatherNotificationService.getWeatherData(data).subscribe({
      next: (res: any) => {
        this.weatherNotificationService.dataHandler.next(res.data);
        this.formActionHandler(false)
      }, 
      error: (err: any) => this.errorHandler(err)
    })    


    /* Second time onwards API should be called 1 minute delay */

    const timer = zip(
      from([1,2,3,4,5,6,7,8,9]),
      interval(60000),
      (val, i) => val
    )
    
    timer.subscribe((val: number) => {
      if(this.isErrorOccured) {
        this.formActionHandler(true);
        return
      }

      this.weatherNotificationService.getWeatherData(data).subscribe({
        next: (res: any) => {
          this.weatherNotificationService.dataHandler.next(res.data);
          if (val === 9) {
            this.formActionHandler(true)
          }
        }, 
        error: (err: any) => this.errorHandler(err)
      })      
    });

  }

  /* Clearing the error state */
  clearField(fieldName: string) {
    if(fieldName === "city") {
      this.cityError = false;
      this.cityErrorText = "";
      this.weatherRequestForm.controls['city'].setValue("");
    } else if (fieldName === "phoneNumber") {
      this.phoneError = false;
      this.phoneErrorText = "";
      this.weatherRequestForm.controls['phoneNumber'].setValue("");
    }
  }
  
}

