import { TestBed } from '@angular/core/testing';
import { StorybookInstructionsComponent } from './storybook-instructions';

describe('StorybookInstructionsComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [StorybookInstructionsComponent],
    });
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(StorybookInstructionsComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it('should toggle code visibility', () => {
    const fixture = TestBed.createComponent(StorybookInstructionsComponent);
    const component = fixture.componentInstance;

    expect(component.showBookCardCode()).toBe(false);
    component.toggleBookCardCode();
    expect(component.showBookCardCode()).toBe(true);
    component.toggleBookCardCode();
    expect(component.showBookCardCode()).toBe(false);
  });
});
