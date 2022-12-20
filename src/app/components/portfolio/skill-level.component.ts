import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { SkillsService } from 'src/app/service/skills.service';

@Component({
  selector: 'app-skill-level',
  template: `
    <!-- <form [formGroup]="formGroup"> -->
    <p-card *ngFor="let val of skillMap?.values()" header={{val.title}} [style]="{marginBottom: '10px',width:'92vw'}">
      <div class="p-fluid grid">
        <div *ngFor="let skill of val.skills" class="field col-3">
          <p>{{skill}} </p>
          <div *ngFor="let level of levels" class="p-field-checkbox">
	          <p-radioButton [inputId]="skill" name="skill" [value]="levels" ></p-radioButton>
	          <label [for]="skill">{{level}}</label>
          </div>
        </div>  
       </div> 
    </p-card>  
    <!-- </form> -->
 
  `,
  providers:[SkillsService]
})
export class SkillLevelComponent implements OnInit {

  //formGroup: FormGroup;

  @Input() skillMap? : Map<string,any>;

  levels! : any;

  constructor(private skillsService: SkillsService,private fb: FormBuilder) { 
    // this.formGroup = this.fb.group({
    //   console: ['']
    // });  
  }

  ngOnInit(): void {
    this.levels = this.skillsService.getLevels();
  }

}
