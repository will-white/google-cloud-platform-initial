import {
    HttpErrorResponse,
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError, timer } from 'rxjs';
import { catchError, retryWhen, mergeMap } from 'rxjs/operators';
import { AccountService } from '../../shared/services/account.service';

export interface RetryParams {
    maxAttempts?: number;
    scalingDuration?: number;
    shouldRetry?: (status: number) => boolean;
}

const DefaultMaxAttempts = 5;
const DefaultScalingDuration = 1000;
const DefaultRetry = (status: number) => status >= 500;

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private accountService: AccountService) {}

    intercept<T>(request: HttpRequest<T>, next: HttpHandler): Observable<HttpEvent<T>> {
        return next.handle(request).pipe(
            retryWithBackOff(),
            catchError((err: HttpErrorResponse) => {
                if (err.status === 401) {
                    this.accountService.logOut();
                }

                return throwError(err);
            })
        );
    }
}

const retryWithBackOff = <T>(params: RetryParams = {}) => (src: Observable<HttpEvent<T>>) =>
    src.pipe(
        retryWhen((errors) =>
            errors.pipe(
                mergeMap((error, i) => {
                    const maxAttempts = params.maxAttempts || DefaultMaxAttempts;
                    const shouldRetry = params.shouldRetry || DefaultRetry;
                    const scalingDuration = params.scalingDuration || DefaultScalingDuration;

                    if (i > maxAttempts || !shouldRetry(error)) {
                        return throwError(error);
                    }

                    return timer(i * scalingDuration);
                })
            )
        )
    );
