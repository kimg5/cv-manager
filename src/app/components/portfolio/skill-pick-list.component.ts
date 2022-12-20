import { Component, Input} from '@angular/core';
import { PortfolioService } from 'src/app/service/portfolio.service';

@Component({
  selector: 'app-skill-pick-list',
  template: `
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
  `,
})
export class SkillPickListComponent{
  @Input() skills!: any;
  @Input() key!: string;
 
  txtInputClass!: string;
  selectedSkills: any;

  constructor(private service: PortfolioService) {
    this.txtInputClass = "text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full";
    this.selectedSkills = [];
  }

  checkSelectedSkills(e: any) {
    this.service.updateSkills(this.key,this.selectedSkills);
  }
}
