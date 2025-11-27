import { HttpInterceptorFn } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const toastr = inject(ToastrService);

  return next(req).pipe(
    catchError((err: any) => {
      const msg = err?.error?.message || err?.message || 'Something went wrong';
      // show a toast once per error
      try { toastr.error(msg, 'Error'); } catch (e) { /* noop if toastr not available */ }
      return throwError(() => err);
    })
  );
};
