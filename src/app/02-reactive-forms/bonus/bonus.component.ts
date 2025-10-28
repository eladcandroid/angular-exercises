import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormArray,
  ReactiveFormsModule,
  Validators,
  AbstractControl,
  ValidationErrors,
  AsyncValidatorFn
} from '@angular/forms';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-book-form-bonus',
  imports: [ReactiveFormsModule, JsonPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './bonus.component.html',
  styleUrl: './bonus.component.css'
})
export class BookFormBonusComponent {
  private formBuilder = inject(FormBuilder);

  // רשימת ISBNs שכבר קיימים במערכת (לצורך הדגמה)
  private existingIsbns = [
    '9780439708180', // הארי פוטר ואבן החכמים
    '9780547928227', // שר הטבעות
    '9780061120084', // מי הזיז את הגבינה שלי
    '9780316769174', // לתפוס את השודד בשיפון
    '9780141439518'  // גאווה ודעה קדומה
  ];

  // Custom synchronous validator for ISBN (exactly 13 digits)
  isbnValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (!value) {
      return null; // Let required validator handle empty values
    }
    const isValid = /^\d{13}$/.test(value);
    return isValid ? null : { invalidIsbn: true };
  }

  // Custom asynchronous validator to check if ISBN already exists
  isbnExistsValidator(): AsyncValidatorFn {
    return (control: AbstractControl): Promise<ValidationErrors | null> => {
      if (!control.value) {
        return Promise.resolve(null);
      }

      // Simulate API call with 1.5 second delay
      return new Promise((resolve) => {
        setTimeout(() => {
          const isbnExists = this.existingIsbns.includes(control.value);
          resolve(isbnExists ? { isbnExists: true } : null);
        }, 1500);
      });
    };
  }

  // Initialize the form
  bookForm = this.formBuilder.group({
    title: ['', [Validators.required, Validators.minLength(2)]],
    isbn: ['',
      [Validators.required, this.isbnValidator.bind(this)],  // Sync validators
      [this.isbnExistsValidator()]  // Async validators
    ],
    publicationYear: ['', [Validators.required, Validators.min(1800), Validators.max(2025)]],
    pageCount: ['', [Validators.required, Validators.min(1)]],
    genre: ['', Validators.required],
    description: ['', [Validators.maxLength(500)]],  // Bonus 1
    publisher: this.formBuilder.group({
      name: ['', Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required]
    }),
    authors: this.formBuilder.array([
      this.createAuthorGroup()
    ])
  });

  // List of books added (Bonus 6)
  books: any[] = [];

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

  get description() {
    return this.bookForm.get('description');
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

  // Bonus 4: Computed properties
  get titleWordCount(): number {
    const title = this.title?.value || '';
    return title.trim().split(/\s+/).filter((word: string) => word.length > 0).length;
  }

  get descriptionCharCount(): number {
    return this.description?.value?.length || 0;
  }

  // Create a new author FormGroup
  createAuthorGroup(): FormGroup {
    return this.formBuilder.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
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

  // Bonus 2: Fill example data
  fillExample(): void {
    this.bookForm.patchValue({
      title: 'הארי פוטר ואבן החכמים',
      isbn: '9780439708181', // Different ISBN to avoid duplicate error
      publicationYear: '1997',
      pageCount: '309',
      genre: 'Children',
      description: 'הספר הראשון בסדרת הארי פוטר. ילד יתום מגלה שהוא קוסם ומתקבל לבית הספר להוגוורטס לכישוף ולקוסמות.',
      publisher: {
        name: 'Bloomsbury Publishing',
        city: 'לונדון',
        country: 'בריטניה'
      }
    });

    // Add second author
    if (this.authors.length === 1) {
      this.addAuthor();
    }

    // Update authors
    (this.authors.at(0) as FormGroup).patchValue({
      fullName: 'J.K. Rowling',
      email: 'jk@rowling.com'
    });

    (this.authors.at(1) as FormGroup).patchValue({
      fullName: 'Mary GrandPré',
      email: 'mary@illustrator.com'
    });
  }

  // Handle form submission
  onSubmit(): void {
    if (this.bookForm.valid) {
      const bookData = this.bookForm.value;
      console.log('ספר חדש נוסף לספרייה:');
      console.log(bookData);

      // Add to books list (Bonus 6)
      this.books.push(bookData);

      // Reset form to initial state with one empty author
      this.bookForm.reset();
      this.authors.clear();
      this.authors.push(this.createAuthorGroup());
    }
  }
}
