import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class PendingRequestService {
  private state = new BehaviorSubject<boolean>(false);
  state$ = this.state.asObservable();

  show(): void {
    this.state.next(true);
  }

  hide(): void {
    this.state.next(false);
  }
}
