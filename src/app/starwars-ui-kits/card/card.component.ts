import { Component, Input } from '@angular/core';
import { Orientation } from '@progress/kendo-angular-layout';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {
  @Input() cardDetails: any; 
  @Input() orientation: Orientation = 'horizontal';
  @Input() cardTitle: string = '';
}
