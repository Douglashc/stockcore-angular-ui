import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'shared-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss']
})
export class PaginatorComponent {

  @Input() currentPage: number = 1;
  @Input() totalPages: number = 1;

  @Output() pageChange = new EventEmitter<number>();

  prevPage(): void {
    if (this.currentPage > 1) {
      this.pageChange.emit(this.currentPage - 1);
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.pageChange.emit(this.currentPage + 1);
    }
  }

}
