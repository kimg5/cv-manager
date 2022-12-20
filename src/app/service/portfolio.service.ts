import { Injectable, ɵclearResolutionOfComponentResourcesQueue } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { LearningExperience } from '../domain/learning-experience';
import { Project } from '../domain/project';

@Injectable({
  providedIn: 'root'
})
export class PortfolioService {

  public headerG!: FormGroup;
  public aboutG!: FormGroup;

  public skillsG!: FormGroup;
  public skillMap!: Map<string, any>;

  public frontendKey: string = "frontend";
  public frontendTitle: string = "Frontend Skills";
  public frontendCss: string = "experience__frontend";
  public backendKey: string = "backend";
  public backendTitle: string = "Backend Skills";
  public backendCss: string = "experience__backend";

  public educations!: any[];
  public eduVid = 0;

  public projects!: any[]
  public proVid = 0;

  constructor() {
    this.educations = [];
    let item = new LearningExperience();
    this.educations.push(item);

    this.projects = [];
    let project = new Project();
    this.projects.push(project);
  }

  public setHeaderG(headerG: FormGroup) {
    this.headerG = headerG;
  }

  public getPreviews() {
    let headers = [
      { key: 'name', value: this.headerG.get('name')?.value },
      { key: 'title', value: this.headerG.get('title')?.value },
      { key: 'image', value: this.headerG.get('image')?.value },
      { key: 'cv', value: this.headerG.get('cv')?.value }
    ];

    let abouts = [
      { key: 'image', value: this.aboutG.get("image")?.value }
    ];

    let skills = {
      header: [
        { key: 'title', value: this.skillsG.get('title')?.value },
        { key: 'subtitle', value: this.skillsG.get('subtitle')?.value }
      ],
      skillMap: this.skillMap
    };

    let results = {
      headers: headers,
      abouts: abouts,
      skills: skills,
      educations: this.educations,
      projects: this.projects
    }
    console.log(this.skillMap)
    return results;
  }

  public setAboutG(aboutG: FormGroup) {
    this.aboutG = aboutG;
  }

  public setSkills(skillsG: FormGroup, skillMap: Map<string, any>) {
    this.skillsG = skillsG;
    this.skillMap = skillMap;
  }

  public updateSkills(key: string, selectedSkills: any[]) {
    let size = selectedSkills.length;
    if (size > 0) {
      this.skillMap.set(key, selectedSkills);
    } else {
      this.skillMap.delete(key);
    }
  }

  public getEducations() {
    this.educations!.map(item => {
      item.vid = this.eduVid++;
    })
    return this.educations;
  }

  public newEducation() {
    let le: any = new LearningExperience();
    le.vid = this.eduVid++;
    this.educations.push(le);
    return this.educations;
  }

  public deleteEducation(item: any) {
    let index = this.findIndexByVid(item.vid, 'edu');
    if (index != -1)
      this.educations!.splice(index, 1);
    return this.educations;
  }

  updateEducation(editItem: any) {
    let index = this.findIndexByVid(editItem.vid, 'edu');
    if (index != -1) this.educations[index] = { ...editItem };
    return this.educations;
  }


  findIndexByVid(vid: number, type: string): number {
    let items = this.educations;
    if (type === 'projects') {
      items = this.projects;
    }
    for (let i = 0; i < items.length; i++) {
      if (items[i].vid === vid)
        return i;
    }
    return -1;
  }

  public getProjects() {
    this.projects!.map(item => {
      item.vid = this.proVid++;
    })
    return this.projects;
  }

  public newProject() {
    let le: any = new Project();
    le.vid = this.proVid++;
    this.projects.push(le);
    return this.projects;
  }

  public deleteProject(item: any) {
    let index = this.findIndexByVid(item.vid, 'project');
    if (index != -1)
      this.projects!.splice(index, 1);
    return this.projects;
  }

  updateProject(editItem: any) {
    let index = this.findIndexByVid(editItem.vid, 'project');
    if (index != -1) this.projects[index] = { ...editItem };
    return this.projects;
  }

}
