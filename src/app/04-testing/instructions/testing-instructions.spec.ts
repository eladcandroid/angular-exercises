import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TestingInstructionsComponent } from './testing-instructions';

describe('TestingInstructionsComponent', () => {
  let component: TestingInstructionsComponent;
  let fixture: ComponentFixture<TestingInstructionsComponent>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TestingInstructionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the title', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Unit Testing');
  });
});
