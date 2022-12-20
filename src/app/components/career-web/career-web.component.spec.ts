import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CareerWebComponent } from './career-web.component';

describe('CareerWebComponent', () => {
  let component: CareerWebComponent;
  let fixture: ComponentFixture<CareerWebComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CareerWebComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CareerWebComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
