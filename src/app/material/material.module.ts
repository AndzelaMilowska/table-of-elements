import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatTableModule} from '@angular/material/table'
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatDialogModule} from '@angular/material/dialog'
import { MatButton } from '@angular/material/button';

const materialComponents = [
  MatFormFieldModule, MatInputModule, MatTableModule, MatDialogModule, MatButton
]

@NgModule({
    imports: [
      materialComponents
  ],
  exports: [
    materialComponents
  ]
})
export class MaterialModule { }
