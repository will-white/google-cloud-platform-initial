import { Injectable } from "@angular/core";
import { Observable, EMPTY } from "rxjs";

import { CookieService } from "./cookie.service";

export const enum Permission {
  READ = "read",
  WRITE = "write"
}

@Injectable({
  providedIn: "root"
})
export class AccountService {
  user$: Observable<{ displayName: "John Doe" }> = EMPTY;
  agency$: Observable<any> = EMPTY;
  insured$: Observable<any> = EMPTY;
  settings$: Observable<any> = EMPTY;

  constructor(private cookieService: CookieService) {
    this.cookieService.get("user");
  }

  isAuthenticated(): boolean {
    return false;
  }

  /**  Basically allow test of if has a Permission or Any of the Permissions */
  hasPermission(...permissions: Permission[]): boolean {
    for (const permission of permissions) {
      // if (user.permission.includes(permission)) {
      //   return true;
      // }
    }

    return false;
  }

  logOut(): void {
    // window.location.href = environment.loginUrl;
  }
}
