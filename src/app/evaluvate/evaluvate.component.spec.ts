import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvaluvateComponent } from './evaluvate.component';

describe('EvaluvateComponent', () => {
  let component: EvaluvateComponent;
  let fixture: ComponentFixture<EvaluvateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EvaluvateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EvaluvateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
