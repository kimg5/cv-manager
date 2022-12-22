import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { PortfolioService } from 'src/app/service/portfolio.service';
import { SkillsService } from '../../service/skills.service';

@Component({
  selector: 'app-skills',
  template: `
  <form [formGroup]="skillsG!">
    <div class="p-fluid grid">
      <div class="field col-5">
        <span class="p-float-label">
           <input id="title" class={{txtInputClass}} pInputText formControlName="title">
           <label for="title">Title</label>
        </span>
        <div *ngIf="title.invalid && (title.dirty || title.touched)">
          <p class="p-error block">Title is not correct.</p>
        </div>
      </div>
      <div class="field col-5">  
        <span class="p-float-label">
            <input id="subtitle"  pInputText class={{txtInputClass}} formControlName="subtitle">
            <label for="subtitle">Subtitle</label>
        </span>
        <div *ngIf="subtitle.invalid && (subtitle.dirty || subtitle.touched)">
          <p class="p-error block">Subtitle is not correct.</p>
        </div>
      </div>
      <div class="field col-11">
        <p-card header="Frontend Skills">
          <app-skill-pick-list [skills]="service.allFrontSkills" key="frontend" [selectedSkills]="service.skillMap.get('frontend')"></app-skill-pick-list> 
        </p-card>  
      </div>
      <div class="field col-11">
        <p-card header="Backend Skills">
          <app-skill-pick-list [skills]="service.allBackSkills" key="backend" [selectedSkills]="service.skillMap.get('backend')"></app-skill-pick-list> 
        </p-card>
      </div>  
    </div>
  </form>    
  `,
  providers: [SkillsService]
})
export class SkillsComponent implements OnInit {
  skillsG: FormGroup;
  title: any;
  subtitle: any;
  
  txtInputClass!: string;
  
  constructor(private skillsService: SkillsService,public service: PortfolioService, private fb: FormBuilder) {
    this.txtInputClass = "text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full";
    this.skillsG = this.fb.group({
      title: ['', Validators.required],
      subtitle: ['', Validators.required],
    })
    this.service.setSkills(this.skillsG);
  }

  ngOnInit(): void {
    this.title = this.skillsG.get('title');
    this.subtitle = this.skillsG.get('subtitle');
  }
}
