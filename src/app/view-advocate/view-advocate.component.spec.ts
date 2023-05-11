import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAdvocateComponent } from './view-advocate.component';

describe('ViewAdvocateComponent', () => {
  let component: ViewAdvocateComponent;
  let fixture: ComponentFixture<ViewAdvocateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewAdvocateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewAdvocateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
