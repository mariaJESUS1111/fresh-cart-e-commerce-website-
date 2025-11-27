import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div *ngIf="message"
         class="fixed bottom-5 right-5 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg animate-fade">
      {{ message }}
    </div>
  `,
  styles: [`
    .animate-fade {
      animation: fadeInOut 2.5s ease-in-out;
    }

    @keyframes fadeInOut {
      0% { opacity: 0; transform: translateY(20px); }
      10% { opacity: 1; transform: translateY(0); }
      90% { opacity: 1; }
      100% { opacity: 0; transform: translateY(20px); }
    }
  `]
})
export class ToastComponent {
  @Input() message: string | null = null;
}
