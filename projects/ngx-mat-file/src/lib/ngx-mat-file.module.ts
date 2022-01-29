import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { NgxMatFileComponent } from './ngx-mat-file.component';
import { NgxMatFileDirective } from './ngx-mat-file.directive'



@NgModule({
  declarations: [
    NgxMatFileComponent,
    NgxMatFileDirective
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule
  ],
  exports: [
    NgxMatFileComponent
  ]
})
export class NgxMatFileModule { }
