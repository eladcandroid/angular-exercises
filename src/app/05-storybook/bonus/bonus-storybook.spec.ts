import { TestBed } from '@angular/core/testing';
import { BonusStorybookComponent } from './bonus-storybook';

describe('BonusStorybookComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [BonusStorybookComponent],
    });
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(BonusStorybookComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
