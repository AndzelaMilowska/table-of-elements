import { Injectable } from '@angular/core';
import { PeriodicElement } from '../shared/periodic-element.interface';
import { Observable } from 'rxjs/internal/Observable';
import { ELEMENT_DATA } from '../shared/data-mocks/element-data-mocks';
import { delay, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class RequestsService {
  getData(): Observable<PeriodicElement[]> {
    return of(ELEMENT_DATA).pipe(delay(2000));
  }

}
