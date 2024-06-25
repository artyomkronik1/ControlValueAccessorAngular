import {Component, ElementRef, forwardRef, HostListener, Renderer2} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-opening-sentence',
  templateUrl: './opening-sentence.component.html',
  styleUrls: ['./opening-sentence.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => OpeningSentenceComponent),
      multi: true
    }
  ]
})
export class OpeningSentenceComponent implements ControlValueAccessor {
  sentence = 'Hi, this is Agent Name. I’m calling from Company Name, do you have a few minutes to answer some questions?';
  placeholders = ['[company_name]', '[agent_name]', '[first_name]', '[last_name]'];


  onChange: any = () => {};
  onTouched: any = () => {};

  writeValue(value: any): void {
    if (value) {
      this.sentence = value;
    }


  }


  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  updateSentence(placeholder: string) {
    let styledPlaceholder = placeholder;
    switch (placeholder) {
      case '[company_name]':
        styledPlaceholder = ' Company Name';
        break;
      case '[agent_name]':
        styledPlaceholder = ' Agent Name';
        break;
      case '[first_name]':
        styledPlaceholder = ' First Name';
        break;
      case '[last_name]':
        styledPlaceholder = ' Last Name';
        break;
      default:
        break;
    }
    const cursorPos = this.getTextareaCursorPosition();
    const newSentence = `${this.sentence.slice(0, cursorPos)}${styledPlaceholder}${this.sentence.slice(cursorPos)}`;
    this.writeValue(newSentence);
    this.onChange(newSentence);
    this.setCaretPosition(cursorPos + styledPlaceholder.length);
  }

  private getTextareaCursorPosition(): number {
    const textarea: any = document.querySelector('.opening-sentence-textarea');
    return textarea.selectionStart || 0;
  }

  private setCaretPosition(position: number) {
    const textarea: any = document.querySelector('.opening-sentence-textarea');
    textarea.selectionStart = position;
    textarea.selectionEnd = position;
    textarea.focus();
  }

  onTextareaInput() {
    console.log(this.sentence)
    this.onChange(this.sentence);
    this.onTouched();
  }
}
