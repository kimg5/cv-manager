import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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
          <app-skill-pick-list [skills]='frontendSkills' [key]='frontendKey' [css]='frontendCss' (skillsChanged)="checkSkills($event)"></app-skill-pick-list> 
        </p-card>  
      </div>
      <div class="field col-11">
        <p-card header="Backend Skills">
          <app-skill-pick-list [skills]='backendSkills' [key]='backendKey' [css]='backendCss' (skillsChanged)="checkSkills($event)"></app-skill-pick-list> 
        </p-card>
      </div>  
    </div>
  </form>    
  `,
  providers: [SkillsService]
})
export class SkillsComponent implements OnInit {
  @Input() skillsG?: FormGroup;

  txtInputClass!: string;

  title: any;
  subtitle: any;

  frontendSkills: any;
  frontendKey: string = "frontend";
  frontendCss: string = "experience__frontend";

  backendSkills: any;
  backendKey: string = "backend";
  backendCss: string = "experience__backend";

  levels: any;

  skillMap: Map<string,any> = new Map<string,any>();
  @Output() skillsTabWorking = new EventEmitter<any>();

  constructor(private skillsService: SkillsService, private fb: FormBuilder) {
    this.txtInputClass = "text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full";
  }

  ngOnInit(): void {
    this.frontendSkills = this.skillsService.getFrontendSkills();
    this.backendSkills = this.skillsService.getBackendSkills();
    this.levels = this.skillsService.getLevels()

    this.title = this.skillsG!.get('title');
    this.subtitle = this.skillsG!.get('subtitle');
  }

  checkSkills($event: any) {
    let key = $event.key;
    let size = $event.skills.length;
    if(size > 0) {
      this.skillMap.set(key,$event);
    }else{
      this.skillMap.delete(key);
    }
    this.skillsTabWorking.emit(this.skillMap);
  }
  

  /*
  initFrontendSkillsGroup() {
    this.frontendSkillsGroup = this.fb.group({
      title: ['Frontend Development', Validators.required],
      key: ['frontend'],
      css: ['experience__frontend']
    });
  }

  initBackendSkillsGroup() {
    this.backendSkillsGroup = this.fb.group({
      title: ['Backend Development', Validators.required],
      key: ['backend'],
      css: ['experience__backend']
    });
  }
  */

}
