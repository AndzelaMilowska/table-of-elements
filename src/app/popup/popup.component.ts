import { Component, Inject } from '@angular/core';
import { DataStorageService } from '../shared/dataStorage.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PeriodicElement } from '../shared/periodic-element.interface';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrl: './popup.component.scss',
})
export class PopupComponent {
  constructor(
    private dataService: DataStorageService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
  onSubmit(formData: PeriodicElement) {
    if (!this.dataService.isValidElement(formData)) {
      alert('Invalid element data');
      return;
    }

    this.dataService.updateData(this.data.index, formData);
  }
}
