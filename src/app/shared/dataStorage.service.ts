import { RequestsService } from "../requests/requests.service";
import { PeriodicElement } from "./periodic-element.interface";
import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({ providedIn: 'root' })
export class DataStorageService{
    private elementsDataSubject = new BehaviorSubject<PeriodicElement[]>([]);
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

    updateData(index: number, newElementData:PeriodicElement) {
       this.elementsData = [...this.elementsData.slice(0, index), newElementData, ...this.elementsData.slice(index+1, this.elementsData.length)]
       this.elementsDataSubject.next(this.elementsData);
    }

}
