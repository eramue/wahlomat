import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvalVoteComponent } from './eval-vote.component';

describe('EvalVoteComponent', () => {
  let component: EvalVoteComponent;
  let fixture: ComponentFixture<EvalVoteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EvalVoteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EvalVoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
