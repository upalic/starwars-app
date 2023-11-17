import { Component, Input } from '@angular/core';
import { GridSize, PageChangeEvent, PagerPosition, PagerType } from '@progress/kendo-angular-grid';

@Component({
  selector: 'app-data-grid',
  templateUrl: './data-grid.component.html',
  styleUrls: ['./data-grid.component.scss']
})
export class DataGridComponent {
  @Input() tableData: any;
  @Input() columns: any[];
  @Input() pageSize: number = 5;
  @Input() totalItems: number = 0;
  @Input() isLoading: boolean = false;

  constructor() {
    this.columns = [];
  }
}
