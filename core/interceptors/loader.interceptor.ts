import { HttpInterceptorFn } from '@angular/common/http';
import { finalize } from 'rxjs/operators';
import { inject } from '@angular/core';
import { LoaderService } from '../../core/interceptors/loader.service';

export const loaderInterceptor: HttpInterceptorFn = (req, next) => {
  const loader = inject(LoaderService);
  loader.isLoading.next(true);
  return next(req).pipe(
    finalize(() => loader.isLoading.next(false))
  );
};
