import { Injectable } from "@angular/core";
import {
  ActivatedRoute,
  ActivationEnd,
  NavigationEnd,
  Router
} from "@angular/router";
import { Observable, EMPTY, BehaviorSubject } from "rxjs";
import { filter, map, tap } from "rxjs/operators";

import { CookieService } from "./cookie.service";

export const enum Permission {
  READ = "read",
  WRITE = "write"
}

export interface Agency {
  name: string;
  id: number;
}

export interface Insured {
  name: string;
  id: number;
}

@Injectable({
  providedIn: "root"
})
export class AccountService {
  private agency = new BehaviorSubject<Agency>({
    name: "The best agency",
    id: 1
  });
  private insured = new BehaviorSubject<Insured>({
    name: "The best insured",
    id: 1
  });
  user$: Observable<{ displayName: "John Doe" }> = EMPTY;
  agency$ = this.agency.asObservable();
  insured$ = this.insured.asObservable();
  settings$: Observable<any> = EMPTY;

  constructor(private cookieService: CookieService, private router: Router) {
    this.cookieService.get("user");

    // this.router.events
    //   .pipe(
    //     filter(
    //       e => e instanceof ActivationEnd && e.snapshot.component !== undefined
    //     ),
    //     tap(console.log),
    //     map((e: ActivationEnd) => [
    //       e.snapshot.paramMap,
    //       e.snapshot.queryParamMap
    //     ])
    //   )
    //   .subscribe(([param, query]) => {
    //     console.log(param);
    //     if (param.get("insuredID")) {
    //       console.log("insuredPram");
    //       this.insured.value.id = +param.get("insuredID");
    //       this.insured.next(this.insured.value);
    //     } else if (this.insured.value) {
    //       console.log("Removing insured");
    //       this.insured.next(undefined);
    //     }
    //   });
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
