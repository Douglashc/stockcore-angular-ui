import { Component, Input } from '@angular/core';

@Component({
  selector: 'shared-title-section',
  templateUrl: './title-section.component.html',
  styleUrls: ['./title-section.component.scss']
})
export class TitleSectionComponent {

  @Input() title!: string; 
  @Input() description!: string;
}
