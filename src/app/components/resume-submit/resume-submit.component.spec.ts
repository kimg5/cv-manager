import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumeSubmitComponent } from './resume-submit.component';

describe('ResumeSubmitComponent', () => {
  let component: ResumeSubmitComponent;
  let fixture: ComponentFixture<ResumeSubmitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResumeSubmitComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResumeSubmitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
