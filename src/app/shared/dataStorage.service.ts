import { RequestsService } from '../requests/requests.service';
import { PeriodicElement } from './periodic-element.interface';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DataStorageService {
  private elementsDataSubject = new Subject<PeriodicElement[]>();
  private elementsData: PeriodicElement[] = [];

  constructor(private requests: RequestsService) {}

  get elementsTableData() {
    return this.elementsDataSubject.asObservable();
  }

  fetchData() {
    this.requests.getData().subscribe({
      next: (response) => {
        this.elementsData = response;
        this.elementsDataSubject.next(this.elementsData);
      },
    });
  }

  updateData(index: number, newElementData: PeriodicElement) {
    this.elementsData = [
      ...this.elementsData.slice(0, index),
      newElementData,
      ...this.elementsData.slice(index + 1, this.elementsData.length),
    ];
    this.elementsDataSubject.next(this.elementsData);
  }

  isValidElement(data: any): data is PeriodicElement {
    if (
      !('position' in data) ||
      !('name' in data) ||
      !('weight' in data) ||
      !('symbol' in data) ||
      typeof data.position !== 'number' ||
      typeof data.weight !== 'number'
    )
      return false;

    data.name = data.name + '';
    data.symbol = data.symbol + '';

    return true;
  }
}
