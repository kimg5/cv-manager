import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PortfolioService } from 'src/app/service/portfolio.service';
@Component({
  selector: 'app-header',
  template: `
  <form [formGroup]="headerG!">
    <div class="p-fluid grid">
      <div class="field col-5">
        <span class="p-float-label">
           <input id="name" class={{txtInputClass}} pInputText formControlName="name">
           <label for="name">Name</label>
        </span>
        <div *ngIf="name.invalid && (name.dirty || name.touched)">
          <p class="p-error block">Name is not correct.</p>
        </div>
      </div>
      <div class="field col-5">  
        <span class="p-float-label">
            <input id="title"  pInputText class={{txtInputClass}} formControlName="title">
            <label for="title">Title</label>
        </span>
        <div *ngIf="title.invalid && (title.dirty || title.touched)">
          <p class="p-error block">Title is not correct.</p>
        </div>
      </div>  
      <div class="field col-5">
        <label for="image">Image</label>
        <input id="image" type="file" class={{txtInputClass}} formControlName="image">
        <div *ngIf="image.invalid && (image.dirty)">
          <p class="p-error block">Image is not correct.</p>
        </div>
      </div>
      <div class="field col-5">
        <label for="cv">CV</label>
        <input id="cv" type="file" class={{txtInputClass}} formControlName="cv">
        <div *ngIf="image.invalid && (cv.dirty)">
          <p class="p-error block">CV is not correct.</p>
        </div>
      </div>
    </div>
  </form>     
  `
})
export class HeaderComponent implements OnInit {

  headerG: FormGroup;

  txtInputClass!: string;
  name: any;
  title: any;
  image: any;
  cv: any;

  constructor(private fb: FormBuilder,private service: PortfolioService) {
    this.txtInputClass = "text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full";

    this.headerG = this.fb.group({
      name: ['', Validators.required],
      title: ['', Validators.required],
      image: ['', Validators.required],
      cv: ['', Validators.required]
    })
  }

  ngOnInit(): void {
     this.name = this.headerG.get('name');
     this.title = this.headerG.get('title');
     this.image = this.headerG.get('image');
     this.cv = this.headerG.get('cv');
     this.service.setHeaderG(this.headerG);
     
  }
}
