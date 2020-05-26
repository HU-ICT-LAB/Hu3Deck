import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignObjectComponent } from './assign-object.component';

describe('AssignObjectComponent', () => {
  let component: AssignObjectComponent;
  let fixture: ComponentFixture<AssignObjectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignObjectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignObjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
