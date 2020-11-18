import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { PendingRequestService } from "../services/pending-request.service";

@Injectable()
export class PendingRequestInterceptor implements HttpInterceptor {
  private totalRequests = 0;

  constructor(private loadingService: PendingRequestService) {}

  intercept<T>(
    request: HttpRequest<T>,
    next: HttpHandler
  ): Observable<HttpEvent<T>> {
    this.totalRequests++;
    this.loadingService.show();
    return next.handle(request).pipe(
      tap(res => {
        if (res instanceof HttpResponse) {
          this.decreaseRequests();
        }
      }),
      catchError(err => {
        this.decreaseRequests();
        throw err;
      })
    );
  }

  private decreaseRequests(): void {
    this.totalRequests--;
    if (this.totalRequests === 0) {
      this.loadingService.hide();
    }
  }
}
