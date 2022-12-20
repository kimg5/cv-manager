export class SkillsService {
  static frontendSkills = ["HTML","CSS","JavaScript","Bootstrap","Tailwind","React"];

  static backendSkills = ["Node JS","MongoDB","PHP","MySql","Python" ];

  static levels =['Experienced','Intermediate','Entry']

  constructor() { }

  getFrontendSkills() {
    return SkillsService.frontendSkills;
  }

  getBackendSkills(){
    return SkillsService.backendSkills;
  }

  getLevels() {
    return SkillsService.levels;
  }
}
