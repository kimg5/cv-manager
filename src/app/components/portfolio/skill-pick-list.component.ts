import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-skill-pick-list',
  template: `
    <form [formGroup]="formGroup">
    <div class="p-fluid grid">
      <div class="field col-10">  
        <span class="p-float-label">
            <input id="title"  pInputText class={{txtInputClass}} formControlName="title">
            <label for="title">Title</label>
        </span>
        <div *ngIf="title.invalid && (title.dirty || title.touched)">
          <p class="p-error block">Title is not correct.</p>
        </div>
      </div>
      <div class="field col-11">  
        <p-pickList [source]="skills" [target]="selectedSkills" sourceHeader="Available" targetHeader="Selected" [showSourceControls]="false" [showTargetControls]="false" 
                    (onMoveToTarget)="checkSelectedSkills($event)"
                    (onMoveAllToTarget)="checkSelectedSkills($event)"
                    (onMoveToSource)="checkSelectedSkills($event)"
                    (onMoveAllToSource)="checkSelectedSkills($event)"
                    >
          <ng-template let-skill pTemplate="item">
            <!-- <app-skill-item [title]='skill' [levels]='levels'></app-skill-item> -->
            <div>{{skill}}</div>
          </ng-template>
        </p-pickList>
      </div>  
    </div>
    <input id="key" type="text" type="hidden" class={{txtInputClass}} formControlName="key" >
    <input id="css" type="text" type="hidden" class={{txtInputClass}} formControlName="css" >
  </form>
  `,
  styles: [
  ]
})
export class SkillPickListComponent implements OnInit {
  formGroup!: FormGroup;
  @Input() skills: any;
  @Input() levels: any;
  @Input() key: any;
  @Input() css: any;

  @Output() skillsChanged = new EventEmitter<any>();

  txtInputClass!: string;
  selectedSkills: any;

  constructor(private fb: FormBuilder) {
    this.txtInputClass = "text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full";
    this.selectedSkills = [];

    this.formGroup = this.fb.group({
      title: ['', Validators.required],
      key: [''],
      css: ['']
    })
  }

  ngOnInit(): void {
    console.log('ngOnInit')
    this.formGroup.get('key')?.setValue(this.key);
    this.formGroup.get('css')?.setValue(this.css);

  }

  get title(): FormControl {
    return this.formGroup.get('title') as FormControl;
  }

  checkSelectedSkills(e: any) {
    console.log("onTargetSelect");
    console.log(e);

    this.skillsChanged.emit({ key: this.key, css: this.css,title: this.formGroup.get('title')?.value,skills: this.selectedSkills });
  }

}
