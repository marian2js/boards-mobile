import {Directive, ElementRef} from '@angular/core';
import {Keyboard} from 'ionic-native';

@Directive({
  selector: '[autofocus]'
})
export class Autofocus {
  constructor(private elementRef: ElementRef) {

  }

  /**
   * Focus the input and show the keyboard
   */
  ngAfterViewInit() {
    this.elementRef.nativeElement.querySelector('input').focus();
    Keyboard.show();
  }
}