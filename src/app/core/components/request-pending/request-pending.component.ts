import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  OnDestroy
} from "@angular/core";
import { Subscription, BehaviorSubject } from "rxjs";
import { debounceTime } from "rxjs/operators";
import { PendingRequestService } from "../../services/pending-request.service";

@Component({
  selector: "app-request-pending",
  templateUrl: "./request-pending.component.html",
  styleUrls: ["./request-pending.component.scss"]
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class RequestPendingComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription = new Subscription();
  private show = new BehaviorSubject<boolean>(false);

  show$ = this.show.asObservable();

  constructor(private loadingService: PendingRequestService) {}

  ngOnInit(): void {
    this.subscriptions.add(
      this.loadingService.state$
        .pipe(debounceTime(150))
        .subscribe(state => this.show.next(state))
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
