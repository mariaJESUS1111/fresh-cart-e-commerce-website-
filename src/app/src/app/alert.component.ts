import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-alert',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div *ngIf="message"
         [@fadeSlide]
         class="fixed bottom-6 right-6 flex items-center gap-3 px-6 py-3 rounded-2xl text-white font-semibold shadow-xl z-50"
         [ngClass]="{
           'bg-green-500': type === 'success',
           'bg-red-500': type === 'error',
           'bg-yellow-500': type === 'info'
         }">
      <i class="fa-solid"
         [ngClass]="{
           'fa-check-circle': type === 'success',
           'fa-exclamation-triangle': type === 'error',
           'fa-info-circle': type === 'info'
         }"></i>
      <span>{{ message }}</span>
    </div>
  `,
  animations: [
    trigger('fadeSlide', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px) scale(0.95)' }),
        animate('300ms ease-out', style({ opacity: 1, transform: 'translateY(0) scale(1)' }))
      ]),
      transition(':leave', [
        animate('300ms ease-in', style({ opacity: 0, transform: 'translateY(20px) scale(0.95)' }))
      ])
    ])
  ],
  styleUrls: ['./alert.component.css']
})
export class AlertComponent {
  @Input() message: string | null = null;
  @Input() type: 'success' | 'error' | 'info' = 'success';
}
