import { ToastrService } from 'ngx-toastr';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { NavigationExtras, Router } from '@angular/router';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private toastr: ToastrService, private router: Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError(error => {
        if(error){
          switch (error.status) {
            case 400:
              if(error.error.errors){
                var errs = error.error.errors;
                const modalStateErrors = [];
                for(var key in errs){
                  modalStateErrors.push(errs[key]);
                }
                throw modalStateErrors.flat();
              } else {
                this.toastr.error(error.error, error.status);
              }
              break;
            case 401:
              this.toastr.error("Unauthorized", error.status);
              break;
            case 404:
              this.router.navigateByUrl("/not-found");
              break;
            case 500:
              const navigationExtras: NavigationExtras = {
                state: {
                  error: error.error
                }
              };
              this.router.navigateByUrl('/server-error', navigationExtras);
              break;
            default:
              this.toastr.error("Something unexpected went wrong");
              console.log(error);
              break;
          }
        }
      return throwError(() => error);
      })
    );
  }
}
