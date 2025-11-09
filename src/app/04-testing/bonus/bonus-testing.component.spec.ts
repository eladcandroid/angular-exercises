import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BonusTestingComponent } from './bonus-testing.component';

describe('BonusTestingComponent', () => {
  let component: BonusTestingComponent;
  let fixture: ComponentFixture<BonusTestingComponent>;

  beforeEach(() => {
    fixture = TestBed.createComponent(BonusTestingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
