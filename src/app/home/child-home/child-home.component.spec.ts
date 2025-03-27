import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChildHomeComponent } from './child-home.component';

describe('ChildHomeComponent', () => {
  let component: ChildHomeComponent;
  let fixture: ComponentFixture<ChildHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChildHomeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChildHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
