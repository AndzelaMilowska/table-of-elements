import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Subject, debounceTime } from 'rxjs';

import { ELEMENT_DATA } from '../../../data-mocks/element-data-mocks';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
})
export class TableComponent implements OnInit {
  private filterInput = new Subject<string>();
  private debounceTimeMs = 2000;

  displayedColumns: string[] = ['number', 'name', 'weight', 'symbol'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  ngOnInit(): void {
    this.filterInput
      .pipe(debounceTime(this.debounceTimeMs))
      .subscribe((searchValue) => {
        this.filterData(searchValue);
      });
  }

  getUserFilterInput(event: Event) {
    this.filterInput.next((event.target as HTMLInputElement).value);
  }

  filterData(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
