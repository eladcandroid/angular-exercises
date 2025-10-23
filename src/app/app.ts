import { Component, signal } from '@angular/core';
import { BookFormComponent } from './book-form.component';

@Component({
  selector: 'app-root',
  imports: [BookFormComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('reactive-forms');
}
