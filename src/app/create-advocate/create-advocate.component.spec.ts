import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAdvocateComponent } from './create-advocate.component';

describe('CreateAdvocateComponent', () => {
  let component: CreateAdvocateComponent;
  let fixture: ComponentFixture<CreateAdvocateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateAdvocateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateAdvocateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
