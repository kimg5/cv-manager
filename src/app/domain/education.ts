export class Education {
    id: string;
    degree: string;
    school: string;
    subject: string;
    country: string;
    startTime: Date;
    endTime: Date;
  
    constructor() {
      this.id = 'id';
      this.degree = 'degree';
      this.school = 'school';
      this.subject = 'subject';
      this.country = 'country';
      this.startTime = new Date();
      this.endTime = new Date();
    }
  }