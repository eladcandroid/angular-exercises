import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeferInstructions } from './defer-instructions';

describe('DeferInstructions', () => {
  let component: DeferInstructions;
  let fixture: ComponentFixture<DeferInstructions>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeferInstructions]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeferInstructions);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
