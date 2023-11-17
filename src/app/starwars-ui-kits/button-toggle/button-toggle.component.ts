import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ButtonGroupSelection, PreventableEvent } from '@progress/kendo-angular-buttons';

@Component({
  selector: 'app-button-toggle',
  templateUrl: './button-toggle.component.html',
  styleUrls: ['./button-toggle.component.scss']
})
export class ButtonToggleComponent  {
  @Input()  selectionMode: ButtonGroupSelection = 'multiple';
  @Input() buttons: any;
  // Get a proper typing here. Maybe try a generict typing like T
  @Output() navigateEvent = new EventEmitter<any>();
  
  public events: string[] = [];
  
  public onNavigate(value: any): void {
    this.navigateEvent.emit(value);
  }
}
