import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FalseComponent } from './false.component';

describe('FalseComponent', () => {
  let component: FalseComponent;
  let fixture: ComponentFixture<FalseComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FalseComponent]
    });
    fixture = TestBed.createComponent(FalseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
