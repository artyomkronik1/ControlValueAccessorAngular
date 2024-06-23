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
  sentence = 'Hi, this is [agent_name]. I’m calling from [company_name], do you have a few minutes to answer some questions?';
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
    const cursorPos = this.getTextareaCursorPosition();
    const newSentence = `${this.sentence.slice(0, cursorPos)}${placeholder}${this.sentence.slice(cursorPos)}`;
    this.writeValue(newSentence);
    this.onChange(newSentence);
    this.setCaretPosition(cursorPos + placeholder.length);
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
