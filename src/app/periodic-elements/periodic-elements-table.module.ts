import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PeriodicElementsTableComponent } from './periodic-elements-table/table/periodic-elements-table.component';
import { MaterialModule } from '../shared/material/material.module';
import { PeriodicElementEditDialog } from './periodic-elements-dialog/periodic-elements-edit-dialog.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [PeriodicElementsTableComponent, PeriodicElementEditDialog],
  imports: [ReactiveFormsModule, CommonModule, MaterialModule],
  exports: [PeriodicElementsTableComponent],
})
export class PeriodicElementsTableModule {}
