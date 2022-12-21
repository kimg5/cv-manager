import { Component} from '@angular/core';
import { PortfolioService } from 'src/app/service/portfolio.service';
import { SkillsService } from 'src/app/service/skills.service';

@Component({
  selector: 'app-preview',
  template: `
    <p-toolbar styleClass="mb-4 gap-2">
        <ng-template pTemplate="left">
            <button pButton label="Preview" icon="pi pi-plus" class="p-button-success mr-2" (click)="openPreview()"></button>
            <button pButton label="Publish" icon="pi pi-plus" class="p-button-success mr-2" (click)="publish()"></button>
        </ng-template>
    </p-toolbar>
    <p-card header="Header">
      <div class="p-fluid grid">
        <div class="field col-11" *ngFor="let item of previews.headers">
          <span>{{item.key}} : {{item.value}}</span>
        </div>  
      </div>
    </p-card>
    
    <p-card header="About">
      <div class="p-fluid grid">
        <div class="field col-11" *ngFor="let item of previews.abouts">
          <span>{{item.key}} : {{item.value}}</span>
        </div>  
      </div>
    </p-card>

    <p-card header="Skills">
      <div class="p-fluid grid">
        <div class="field col-11" *ngFor="let item of previews.skills?.header">
          <span>{{item.key}} : {{item.value}}</span>
        </div>
        <div class="field col-11" >
          <p-card header="Frontend Skills">
            <div class="p-fluid grid">
              <div class="field col-11" *ngFor="let item of previews.skills?.skillMap?.get('frontend')">
                <div>{{item}}</div>
              </div> 
            </div>
          </p-card>
        </div>  
        <div class="field col-11" >
          <p-card header="Backend Skills">
            <div class="p-fluid grid">
              <div class="field col-11" *ngFor="let item of previews.skills?.skillMap?.get('backend')">
                <div>{{item}}</div>
              </div> 
            </div>
          </p-card>
        </div>  
      </div>

    </p-card>

    <p-card header="Educations">
      <div class="p-fluid grid">
        <div class="field col-11" *ngFor="let item of previews.educations">
        <p-card> 
          <div>Degree: {{item.degree}}</div>
          <div>School : {{item.school}}</div>
          <div>City: {{item.city}} </div>
          <div>Country: {{item.country}} </div>
          <div>Start Time : {{item.startTime|date:'yyyy-MM'}}</div>
          <div>End Time : {{item.endTime|date:'yyyy-MM'}}</div>
        </p-card>
        </div>  
      </div>
    </p-card>

    <p-card header="Projects">
      <div class="p-fluid grid">
        <div class="field col-11" *ngFor="let item of previews.projects">
        <p-card> 
          <div>Title : {{item.title}}</div>
          <div>Github : {{item.github}}</div>
          <div>Demo : {{item.demo}}</div>
          <div>Image : {{item.image}}</div>
        </p-card>
        </div>  
      </div>
    </p-card>
  `,
   providers:[SkillsService]
})
export class PreviewComponent {

  previews: any;
  levels!:any[];
  
  constructor(private service : PortfolioService,private skillsService: SkillsService) { 
    this.previews = {};
    this.levels = this.skillsService.getLevels();
  }

  openPreview() {
    console.log(this.service.headerG)
    this.previews = this.service.getPreviews();
  }

  publish(){
    this.service.publish();
  }

}
