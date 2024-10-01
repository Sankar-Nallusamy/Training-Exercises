import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizsummaryComponent } from './quizsummary.component';

describe('QuizsummaryComponent', () => {
  let component: QuizsummaryComponent;
  let fixture: ComponentFixture<QuizsummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuizsummaryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuizsummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
