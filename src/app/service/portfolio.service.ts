import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable, ɵclearResolutionOfComponentResourcesQueue } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Education } from '../domain/education';
import { Project } from '../domain/project';
import { AuthService } from './auth.service';
import { SkillsService } from './skills.service';

@Injectable({
  providedIn: 'root'
})
export class PortfolioService {

  static url: string = 'http://localhost:3001/portfolio/portfolios/';

  public headerG!: FormGroup;
  public aboutG!: FormGroup;

  public skillsG!: FormGroup;
  public skillMap: Map<string, any> = new Map();
  public allFrontSkills : any[];
  public allBackSkills : any[]

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

  public fileMap!: Map<string, any>;
  public projectFileMap!: Map<string, any>;

  constructor(private http: HttpClient,private skillsService: SkillsService, private authService: AuthService) {
    this.fileMap = new Map();
    this.projectFileMap = new Map();
    this.allBackSkills = skillsService.getBackendSkills();
    this.allFrontSkills = skillsService.getFrontendSkills();
  }

  public setHeaderG(headerG: FormGroup) {
    this.headerG = headerG;
  }

  public getPortfolio(username: string) {
    this.http.get<any>(PortfolioService.url + username).subscribe(resp => {
      console.log(resp);
      if(resp.success){
        let data = resp.content;
       
        this.initHeader(data)
        this.educations = data.education;
        this.projects = data.projects;
        this.initSkills(data.experience);
      }
    })
  }
  
  initHeader(data:any) {
    let header = data.header;
    let info = data.info;
    this.headerG!.get('title')!.setValue(header.Title);
    this.headerG!.get('name')!.setValue(header.Name);
    //    this.headerG!.get('description')!.setValue(header.Description);
    this.headerG!.get('email')!.setValue(info.email);
    this.headerG!.get('linkedin')!.setValue(info.linkedin);
    this.headerG!.get('github')!.setValue(info.github);
  }
  
  initSkills(data: any){
    for(let group of data){
      let items: any = [];
      for(let skill of group.skills){
        items.push(skill.skill);
        let available: any ;
        if(group.key === 'backend'){
          available = this.allBackSkills;
        }else available = this.allFrontSkills;

        for(let i = 0 ; i < available.length ; i++){
          if(available[i].toUpperCase() === skill.skill.toUpperCase()){
            available.splice(i, 1);
            break;
          }
        }
      }
      this.skillMap.set(group.key, items);
    }

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
    return results;
  }

  public setAboutG(aboutG: FormGroup) {
    this.aboutG = aboutG;
  }

  public setSkills(skillsG: FormGroup) {
    this.skillsG = skillsG;
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
    this.educations?.map(item => {
      item.vid = this.eduVid++;
    })
    return this.educations;
  }

  public newEducation() {
    let le: any = new Education();
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
    if (type === 'project') {
      items = this.projects;
    }
    for (let i = 0; i < items.length; i++) {
      if (items[i].vid === vid)
        return i;
    }
    return -1;
  }

  public getProjects() {
    this.projects?.map(item => {
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

  publish() {
    console.log('publish');

    let formData: FormData = new FormData();
    let username = this.authService.username;
    formData.append("username", username);
    if (this.fileMap.get('logo')) {
      formData.append("header-logo", this.fileMap.get('logo'));
    }

    formData.append("header[Name]", this.headerG.get('name')?.value);
    formData.append("header[Title]", this.headerG.get('title')?.value);

    formData.append("education", JSON.stringify(this.educations));
    formData.append("projects", JSON.stringify(this.projects));
    formData.append("experience", JSON.stringify(this.buildSkills()));


    if (this.fileMap.get('cv')) {
      formData.append("header-cv", this.fileMap.get('cv'));
    }
    if (this.fileMap.get('aboutPhoto')) {
      formData.append("aboutPhoto", this.fileMap.get('aboutPhoto'));
    }

    this.projectFileMap.forEach((file, filename) => {
      formData.append(filename, file);
    })

    this.http.post(PortfolioService.url + username, formData, { reportProgress: true, responseType: 'json' }).subscribe(resp => {
      console.log(resp);
    });
  }

  catchProjectFile($event: any, filename: string) {
    console.log("catchProjectFile");
    if ($event.target.files.length > 0) {
      this.projectFileMap.set(filename, $event.target.files[0]);
    }
  }

  catchFile($event: any, filename: string) {
    if ($event.target.files.length > 0) {
      this.fileMap.set(filename, $event.target.files[0]);
    }
  }

  buildSkills() {
    let exps: any = [];
    if (this.skillMap.get('frontend')) {
      let items = [];
      for (let skill of this.skillMap.get('frontend')) {
        let item = { skill: skill, level: 'experienced' };
        items.push(item);
      }
      exps.push({
        title: this.frontendTitle,
        key: this.frontendKey,
        css: this.frontendCss,
        skills: items
      })
    }
    if (this.skillMap.get('backend')) {
      let items = [];
      for (let skill of this.skillMap.get('backend')) {
        let item = { skill: skill, level: 'experienced' };
        items.push(item);
      }
      exps.push({
        title: this.backendTitle,
        key: this.backendKey,
        css: this.backendCss,
        skills: items
      })
    }
    return exps;
  }
}
