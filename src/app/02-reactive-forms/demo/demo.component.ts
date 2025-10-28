import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormArray,
  ReactiveFormsModule,
  Validators,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-book-form',
  imports: [ReactiveFormsModule, JsonPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './demo.component.html',
  styleUrl: './demo.component.css',
})
export class BookFormComponent {
  private formBuilder = inject(FormBuilder);

  // Custom validator for ISBN (exactly 13 digits)
  isbnValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (!value) {
      return null; // Let required validator handle empty values
    }
    const isValid = /^\d{13}$/.test(value);
    return isValid ? null : { invalidIsbn: true };
  }

  // Initialize the form
  bookForm = this.formBuilder.group({
    title: ['', [Validators.required, Validators.minLength(2)]],
    isbn: ['', [Validators.required, this.isbnValidator.bind(this)]],
    publicationYear: ['', [Validators.required, Validators.min(1800), Validators.max(2025)]],
    pageCount: ['', [Validators.required, Validators.min(1)]],
    genre: ['', Validators.required],
    publisher: this.formBuilder.group({
      name: ['', Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required],
    }),
    authors: this.formBuilder.array([this.createAuthorGroup()]),
  });

  // Getters for easy access to form controls
  get title() {
    return this.bookForm.get('title');
  }

  get isbn() {
    return this.bookForm.get('isbn');
  }

  get publicationYear() {
    return this.bookForm.get('publicationYear');
  }

  get pageCount() {
    return this.bookForm.get('pageCount');
  }

  get genre() {
    return this.bookForm.get('genre');
  }

  get publisherName() {
    return this.bookForm.get('publisher.name');
  }

  get publisherCity() {
    return this.bookForm.get('publisher.city');
  }

  get publisherCountry() {
    return this.bookForm.get('publisher.country');
  }

  get authors() {
    return this.bookForm.get('authors') as FormArray;
  }

  // Create a new author FormGroup
  createAuthorGroup(): FormGroup {
    return this.formBuilder.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  // Add a new author
  addAuthor(): void {
    this.authors.push(this.createAuthorGroup());
  }

  // Remove an author (only if more than one exists)
  removeAuthor(index: number): void {
    if (this.authors.length > 1) {
      this.authors.removeAt(index);
    }
  }

  // Get specific author control for validation display
  getAuthorControl(index: number, controlName: string): AbstractControl | null {
    const authorGroup = this.authors.at(index) as FormGroup;
    return authorGroup.get(controlName);
  }

  // Handle form submission
  onSubmit(): void {
    if (this.bookForm.valid) {
      console.log('ספר חדש נוסף לספרייה:');
      console.log(this.bookForm.value);

      // Reset form to initial state with one empty author
      this.bookForm.reset();
      this.authors.clear();
      this.authors.push(this.createAuthorGroup());
    }
  }
}
