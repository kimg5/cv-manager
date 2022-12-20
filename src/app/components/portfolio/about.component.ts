import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-about',
  template: `
    <form [formGroup]="aboutG!">
    <div class="p-fluid grid">
      <div class="field col-5">
        <label for="image">Image</label>
        <input id="image" type="file" class={{txtInputClass}} formControlName="image">
        <div *ngIf="image.invalid && (image.dirty || image.touched)">
          <p class="p-error block">Image is not correct.</p>
        </div>
      </div>
    </div>
  </form>
  `,
  styles: [
  ]
})
export class AboutComponent implements OnInit {

  @Input() aboutG?: FormGroup;
  txtInputClass!: string;

  image: any;

  constructor() {
    this.txtInputClass = "text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full";
   }

  ngOnInit(): void {
    this.image = this.aboutG!.get('image');
  }

}
