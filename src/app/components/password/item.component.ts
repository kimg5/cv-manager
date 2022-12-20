import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

interface Option {
  name: string,
  code: string
}

@Component({
  selector: 'app-item',
  template: `
  <form [formGroup]="formGroup">
     <div class="p-fluid grid">
       <div class="field col-5">
        {{title}}
       </div>
       <div class="field col-5">
         <p-dropdown [options]="options" formControlName="selectCtrl" optionLabel="name" optionValue="code"></p-dropdown>
       </div>
     </div>
  </form>     
  `
})
export class ItemComponent implements OnInit {
  formGroup: FormGroup;

  @Input() title!: string;
  @Input() levels!: string[];

  options: Option[];


  constructor() {
    this.formGroup = new FormGroup({
      selectCtrl: new FormControl()
    });
    this.options = new Array();
  }

  ngOnInit(): void {
    for (let level of this.levels) {
      let option = { name: level, code: level };
      this.options.push(option);
    }
  }

}
