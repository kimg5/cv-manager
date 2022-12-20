export class LearningExperience {
    degree: string;
    school: string;
    city: string;
    country: string;
    startTime: Date;
    endTime: Date;
  
    constructor() {
      this.degree = 'degree';
      this.school = 'school';
      this.city = 'city';
      this.country = 'country';
      this.startTime = new Date();
      this.endTime = new Date();
    }
  }