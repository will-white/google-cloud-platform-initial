import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  OnDestroy
} from "@angular/core";
import { Subscription, BehaviorSubject } from "rxjs";
import { debounceTime } from "rxjs/operators";
import {
  Router,
  NavigationStart,
  NavigationEnd,
  NavigationCancel,
  NavigationError
} from "@angular/router";

@Component({
  selector: "app-navagation-pending",
  templateUrl: "./navagation-pending.component.html",
  styleUrls: ["./navagation-pending.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavagationPendingComponent implements OnInit, OnDestroy {
  private subscriptions = new Subscription();
  private _show = new BehaviorSubject<boolean>(false);

  show = this._show.asObservable().pipe(debounceTime(150));

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.subscriptions.add(
      this.router.events.subscribe(event => {
        switch (true) {
          case event instanceof NavigationStart:
            this._show.next(true);
            break;

          case event instanceof NavigationEnd:
            const url = (event as NavigationEnd).url;

            // if (url.includes('/quoting')) {
            //     this.currentRouteService.setRouteName('Quoting');
            // } else if (url.includes('/policy')) {
            //     this.currentRouteService.setRouteName('Policy');
            // } else if (url.includes('/claims')) {
            //     this.currentRouteService.setRouteName('Claims');
            // } else if (url.startsWith('/?') || url === '/') {
            //     this.currentRouteService.setRouteName('Home');
            // }

            this._show.next(false);
            break;

          case event instanceof NavigationCancel:
          case event instanceof NavigationError:
            this._show.next(false);
            break;
        }
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
