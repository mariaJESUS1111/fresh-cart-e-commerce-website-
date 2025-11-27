/*import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class FlowbiteService {
  constructor(@Inject(PLATFORM_ID) private platformId: any) {}

  loadFlowbite(): void {
    if (isPlatformBrowser(this.platformId)) {
      import('flowbite').then(flowbite => {
        // Flowbite JS functions will be available globally after import
      });
    }
  }
}
//
