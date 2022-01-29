import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { Component } from '@angular/core';
import {  FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: {showError: true},
    },
  ],
})
export class AppComponent {

  valueAccept = "image/*"
  preview = true
  hiddenUpload = false
  previewWidth = 200
  minFileCount = 1
  maxFileCount = 3
  maxFileSize = 3
  variants = ["mat-button", "mat-raised-button", "mat-flat-button", "mat-stroked-button"]
  required = true
  multiple = true
  variant = this.variants[0]
  files?: Array<File>

  public firstFormGroup = new FormGroup({
    files: new FormControl(''),
  })

  public secondFormGroup = new FormGroup({
    name: new FormControl(''),
    description: new FormControl('')
  })

  
  upload(e: any) {
    console.log('your upload function :>> ', e);
   }
 
}
