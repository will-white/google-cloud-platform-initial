import { ErrorHandler, NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AppRoutingModule } from "./app.routing.module";
import { CoreModule } from "./core/core.module";
import { SharedModule } from "./shared/shared.module";
import { GlobalErrorHandlerService } from "./core/services/global-error-handler.service";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { PendingRequestInterceptor } from "./core/interceptors/pending-request.interceptor";
import { ErrorInterceptor } from "./core/interceptors/error.interceptor";

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    CoreModule,
    SharedModule,
    AppRoutingModule
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
  providers: [
    // { provide: ErrorHandler, useClass: GlobalErrorHandlerService },
    // // https://angular.io/guide/http#interceptor-order (FILO)
    {
      provide: HTTP_INTERCEPTORS,
      useClass: PendingRequestInterceptor,
      multi: true
    }
    // { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ]
})
export class AppModule {}
