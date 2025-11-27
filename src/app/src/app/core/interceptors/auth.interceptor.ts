import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('token') || localStorage.getItem('userToken');
  const newReq = token ? req.clone({ setHeaders: { token } }) : req;
  return next(newReq);
};
