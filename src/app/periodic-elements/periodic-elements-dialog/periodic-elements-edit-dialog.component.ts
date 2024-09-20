import { Component, Inject, OnInit } from '@angular/core';
import { PeriodicElementsDataService } from '../../services/periodic-elements-data.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PeriodicElement } from '../periodic-element.interface';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'periodic-element-edit-dialog',
  templateUrl: './periodic-elements-edit-dialog.component.html',
  styleUrl: './periodic-elements-edit-dialog.component.scss',
})
export class PeriodicElementEditDialog implements OnInit {
  periodicElementForm: FormGroup;

  constructor(
    private dataService: PeriodicElementsDataService,
    @Inject(MAT_DIALOG_DATA) public data: PeriodicElement,
  ) {}

  ngOnInit(): void {
    this.periodicElementForm = new FormGroup({
      position: new FormControl(
        this.data.position,
        Validators.required,
      ),
      name: new FormControl(this.data.name, Validators.required),
      weight: new FormControl(
        this.data.weight,
        Validators.required,
      ),
      symbol: new FormControl(
        this.data.symbol,
        Validators.required,
      ),
    });
  }

  onSubmit(formData: PeriodicElement) {
    this.dataService.updateData(this.data, formData);
  }
}
