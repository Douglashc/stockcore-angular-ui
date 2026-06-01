import { Component, Input, signal } from '@angular/core';

@Component({
  selector: 'shared-card-simple-count',
  templateUrl: './card-simple-count.component.html',
  styleUrls: ['./card-simple-count.component.scss']
})
export class CardSimpleCountComponent {

  @Input() public title: string = 'Total Productos';
  @Input() public description: string = 'En el Almacén Central';
  @Input() public logoClass: string = 'material-icons text-2xl';
  @Input() public logoSpan: string = 'inventory';
  @Input() public totalItem: number = 0;
} 
