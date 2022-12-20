import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Form } from '@angular/forms';
import { Validators } from '@angular/forms';
import { LearningExperience } from 'src/app/domain/learning-experience';
import { Project } from 'src/app/domain/project';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss'],
})
export class PortfolioComponent implements OnInit {

  rootGroup!: FormGroup;
  skillMap?: Map<string,any>;
  les: LearningExperience[];
  projects: Project[];


  constructor(private fb: FormBuilder) { 
    this.les = [];
    this.les.push(new LearningExperience());
    this.projects = [];
    this.projects.push(new Project());
  }

  ngOnInit(): void {
    this.initRootGroup();
  }
  getHeaderG(): FormGroup {
    return this.rootGroup.get('headerG') as FormGroup;
  }
  getAboutG(): FormGroup {
    return this.rootGroup.get('aboutG') as FormGroup;
  }
  getSkillsG(): FormGroup {
    return this.rootGroup.get('skillsG') as FormGroup;
  }

  checkSkills($event: any) {
    this.skillMap = $event as Map<string,any>;
    // if (this.skillMap.size > 0) {
    //   for(let skills of this.skillMap){
    //     if(skills.length > 0)
    //       this.isSkillsLevelOpen = true;
    //   }
    // } else
    //   this.isSkillsLevelOpen = false;
  }

  initRootGroup() {
    this.rootGroup = this.fb.group({
      headerG: this.fb.group({
        name: ['', Validators.required],
        title: ['', Validators.required],
        image: ['', Validators.required]
      }),
      aboutG: this.fb.group({
        image: ['', Validators.required]
      }),
      skillsG: this.fb.group({
        title: ['', Validators.required],
        subtitle: ['', Validators.required],
        items: this.fb.array([]),
      }),
    });
  }
}
