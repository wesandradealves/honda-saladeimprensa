import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core'
import { Page } from 'src/app/models/page'

@Component({
  selector: 'app-modal-filters',
  templateUrl: './modal-filters.component.html',
  styleUrls: ['./modal-filters.component.scss'],
})
export class ModalFiltersComponent implements OnInit {
  @Input() categories: any[];
  @Input() types: any[];
  @Input() show: boolean;
  @Input() dateFrom;
  @Input() dateTo;

  @Output() onClose = new EventEmitter<string>();
  @Output() onChangeCategory = new EventEmitter<any>();
  @Output() onChangeType = new EventEmitter<any>();
  @Output() onFilter = new EventEmitter<string>();
  @Output() resetFilters = new EventEmitter<string>();
  @Output() onChangeFrom = new EventEmitter<any>();
  @Output() onChangeToDate = new EventEmitter<any>();

  constructor() {}

  ngOnInit() {}

  onCloseModal () {
    this.onClose.emit();
  }

  emitChangeCategory(e) {
    this.onChangeCategory.emit(e);
  }

  emitChangeType(e) {
    this.onChangeType.emit(e);
  }
  
  emitFilter() {
    this.onFilter.emit();
    this.onClose.emit();
  }
  
  emitChangeFromDate(e) {
    this.onChangeFrom.emit(e);
  }

  emitChangeToDate(e) {
    this.onChangeToDate.emit(e);
  }

  clearFilters() {
    this.resetFilters.emit();
    this.onClose.emit();
  }
}
