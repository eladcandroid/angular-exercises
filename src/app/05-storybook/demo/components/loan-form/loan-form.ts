import { Component, input, output, signal, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Book, BorrowerInfo } from '../../models/library.models';

@Component({
  selector: 'app-loan-form',
  imports: [ReactiveFormsModule],
  templateUrl: './loan-form.html',
  styleUrl: './loan-form.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoanFormComponent {
  private fb = new FormBuilder().nonNullable;

  // Inputs
  book = input.required<Book>();
  disabled = input(false);

  // State
  isSubmitting = signal(false);
  submitSuccess = signal(false);

  // Outputs
  loanSubmit = output<BorrowerInfo>();
  cancel = output<void>();

  // Form
  loanForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    phone: [''],
  });

  onSubmit(): void {
    if (this.loanForm.valid && !this.isSubmitting()) {
      this.isSubmitting.set(true);

      const borrowerInfo: BorrowerInfo = {
        name: this.loanForm.value.name,
        email: this.loanForm.value.email,
        phone: this.loanForm.value.phone || undefined,
      };

      // Simulate async operation
      setTimeout(() => {
        this.loanSubmit.emit(borrowerInfo);
        this.submitSuccess.set(true);
        this.isSubmitting.set(false);

        // Reset form after success
        setTimeout(() => {
          this.loanForm.reset();
          this.submitSuccess.set(false);
        }, 2000);
      }, 500);
    } else {
      // Mark all fields as touched to show validation errors
      Object.keys(this.loanForm.controls).forEach(key => {
        this.loanForm.controls[key].markAsTouched();
      });
    }
  }

  onCancel(): void {
    this.cancel.emit();
    this.loanForm.reset();
  }

  getErrorMessage(fieldName: string): string {
    const control = this.loanForm.get(fieldName);
    if (control?.hasError('required')) {
      return 'שדה חובה';
    }
    if (control?.hasError('email')) {
      return 'כתובת אימייל לא תקינה';
    }
    if (control?.hasError('minlength')) {
      return `מינימום ${control.errors?.['minlength'].requiredLength} תווים`;
    }
    return '';
  }

  isFieldInvalid(fieldName: string): boolean {
    const control = this.loanForm.get(fieldName);
    return !!(control?.invalid && (control.dirty || control.touched));
  }
}
