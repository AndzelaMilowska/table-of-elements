import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { Subject, debounceTime } from 'rxjs';
import { PeriodicElement } from '../../shared/periodic-element.interface';
import { DataStorageService } from '../../shared/dataStorage.service';
import { PopupComponent } from '../../popup/popup.component';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
})
export class TableComponent implements OnInit {
  private filterInput = new Subject<string>();
  private debounceTime = 2000;
  private dataSource: PeriodicElement[] = [];
  displayedColumns: string[] = ['number', 'name', 'weight', 'symbol'];
  tableData = new MatTableDataSource<PeriodicElement, MatPaginator>(
    this.dataSource
  );

  constructor(
    private dataService: DataStorageService,
    public dialog: MatDialog
  ) {
    this.dataService.elementsTableData.subscribe((data) => {
      this.dataSource = data;
      this.refreshData();
    });
  }

  ngOnInit(): void {
    this.dataService.fetchData();

    this.filterInput
      .pipe(debounceTime(this.debounceTime))
      .subscribe((searchValue) => {
        this.filterData(searchValue);
      });

  }

  refreshData() {
    this.tableData.data = this.dataSource;
  }

  getUserFilterInput(event: Event): void {
    this.filterInput.next((event.target as HTMLInputElement).value);
  }

  filterData(filterValue: string): void {
    this.tableData.filter = filterValue.trim().toLowerCase();
  }

  updateRecord(index: number, rowData: PeriodicElement) {
    const recordData = {index: index, elementData: rowData}
    this.dialog.open(PopupComponent, { data: recordData });
  }
}
