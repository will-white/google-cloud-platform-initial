import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandler, Injectable, Injector } from '@angular/core';

// import { LoggerService } from 'libs/shared/src/lib/services/logger.service';
// import { NotificationService } from 'libs/shared/src/lib/services/notification.service';

/* App level error handler its a service but not a service... */
@Injectable()
export class GlobalErrorHandlerService implements ErrorHandler {
    constructor(private injector: Injector) {}

    handleError(error: Error | HttpErrorResponse): void {
        // const log = this.injector.get(LoggerService);
        // const notifier = this.injector.get(NotificationService);

        // const message =
        //     error instanceof HttpErrorResponse
        //         ? this.getServerErrorMessage(error)
        //         : this.getClientErrorMessage(error);

        // // Always log errors
        // log.error(message);

        // notifier.showError(message);
    }

    private getClientErrorMessage(error: Error): string {
        return error.message ? error.message : error.toString();
    }

    private getServerErrorMessage(error: HttpErrorResponse): string {
        return navigator.onLine ? error.message : 'No Internet Connection';
    }
}
