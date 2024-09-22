import { PeriodicElementsHttp } from './periodic-elements-http.service';
import { PeriodicElement } from '../periodic-elements/periodic-element.interface';
import { Injectable } from '@angular/core';
import { Subject, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PeriodicElementsDataService {
  private elementsDataSubject = new Subject<PeriodicElement[]>();
  private elementsData: PeriodicElement[] = [];

  constructor(private httpService: PeriodicElementsHttp) {}

  get elementsTableData() {
    return this.elementsDataSubject.asObservable();
  }

  fetchData() {
    return this.httpService.getData().pipe(
      tap((response) => {
        this.elementsData = response;
        this.elementsDataSubject.next(this.elementsData);
      }),
    );
  }

  findEditedElementIndex(elementObject: PeriodicElement): number {
    for (let i = 0; i < this.elementsData.length; i++) {
      if (
        elementObject.name === this.elementsData[i].name &&
        elementObject.symbol === this.elementsData[i].symbol &&
        elementObject.weight === this.elementsData[i].weight &&
        elementObject.position === this.elementsData[i].position
      ) {
        return i;
      }
    }
    return this.elementsData.length;
  }

  updateData(elementOldData: PeriodicElement, elementNewData: PeriodicElement) {
    const index = this.findEditedElementIndex(elementOldData);

    if (!this.isValidElement(elementNewData)) {
      alert('Invalid element data');
      return;
    }

    this.elementsData = [
      ...this.elementsData.slice(0, index),
      elementNewData,
      ...this.elementsData.slice(index + 1, this.elementsData.length),
    ];
    this.elementsDataSubject.next(this.elementsData);
  }

  isValidElement(data: any): data is PeriodicElement {
    if (
      !('position' in data) ||
      !('name' in data) ||
      !('weight' in data) ||
      !('symbol' in data)
    )
      return false;

    data.name = data.name + '';
    data.symbol = data.symbol + '';

    return true;
  }
}
