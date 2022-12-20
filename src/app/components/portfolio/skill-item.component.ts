import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

interface Option {
  name: string,
  code: string
}

@Component({
  selector: 'app-skill-item',
  template: `
     <div class="p-fluid grid">
       <div class="field col-12">
        {{title}}
       </div>
       <div class="field col-12">
         <!-- <p-dropdown [options]="options" formControlName="selectCtrl"  optionLabel="name" optionValue="code"></p-dropdown> -->
         <div *ngFor="let level of levels" class="p-field-checkbox">
	<p-radioButton [inputId]="title" name="category" [value]="level" 
		></p-radioButton>
	<label [for]="title">{{level}}</label>
</div>
       </div>
     </div>
  `
})
export class SkillItemComponent implements OnInit {
  formGroup: FormGroup;
  
  @Input() title!: string;
  @Input() levels!: string[];
  
  options: Option[];


  constructor() { 
    this.formGroup = new FormGroup({
      selectCtrl : new FormControl()
    });
    this.options = new Array();
  } 

  ngOnInit(): void {
    for(let level of this.levels){
      let option = {name:level,code:level};
      this.options.push(option); 
    }
  }

}
