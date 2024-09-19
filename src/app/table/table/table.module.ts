import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from './table.component';
import { MaterialModule } from '../../material/material.module';
import { PopupComponent } from '../../popup/popup.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    TableComponent,
    PopupComponent
  ],
  imports: [
    FormsModule,
    CommonModule, 
    MaterialModule
  ],
  exports: [
    TableComponent
  ]
})
export class TableModule { }
