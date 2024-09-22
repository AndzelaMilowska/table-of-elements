import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { Subject, debounceTime } from 'rxjs';
import { PeriodicElement } from '../../periodic-element.interface';
import { PeriodicElementsDataService } from '../../../services/periodic-elements-data.service';
import { PeriodicElementEditDialog } from '../../periodic-elements-dialog/periodic-elements-edit-dialog.component';
import { PeriodicElementsColumns } from '../../periodic-elements-columns.enum';

@Component({
  selector: 'periodic-elements-table',
  templateUrl: './periodic-elements-table.component.html',
  styleUrl: './periodic-elements-table.component.scss',
})
export class PeriodicElementsTableComponent implements OnInit {
  private filterInput = new Subject<string>();
  private debounceTime = 2000;
  private dataSource: PeriodicElement[] = [];
  columnsHeaders = PeriodicElementsColumns
  displayedColumns: string[] = [
    this.columnsHeaders.Position,
    this.columnsHeaders.Name,
    this.columnsHeaders.Weight,
    this.columnsHeaders.Symbol,
  ];
  tableData = new MatTableDataSource<PeriodicElement, MatPaginator>(
    this.dataSource,
  );

  constructor(
    private dataService: PeriodicElementsDataService,
    public dialog: MatDialog,
  ) {
    this.dataService.elementsTableData.subscribe((data) => {
      this.dataSource = data;
      this.refreshData();
    });
  }

  ngOnInit(): void {
    this.dataService.fetchData().subscribe();

    this.filterInput
      .pipe(debounceTime(this.debounceTime))
      .subscribe((searchValue) => {
        this.filterData(searchValue);
      });
  }

  refreshData(): void {
    this.tableData.data = this.dataSource;
  }

  getUserFilter(event: Event): void {
    this.filterInput.next((event.target as HTMLInputElement).value);
  }

  filterData(filterValue: string): void {
    this.tableData.filter = filterValue.trim().toLowerCase();
  }

  updateRecord(rowData: PeriodicElement): void {
    this.dialog.open(PeriodicElementEditDialog, { data: rowData });
  }
}
