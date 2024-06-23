import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-input-field',
  templateUrl: './input-field.component.html',
  styleUrls: ['./input-field.component.css']
})
export class InputFieldComponent {
  @Input() label: string = '';
  @Input() id: string = '';
  @Input() name: string = '';
  @Input() type: string = 'text';
  @Input() value: string = '';
  @Output() valueChange = new EventEmitter<string>();

  onInputChange(event: Event) {
    this.value = (event.target as HTMLInputElement).value;
    this.valueChange.emit(this.value);
  }
}
