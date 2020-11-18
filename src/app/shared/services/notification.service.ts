import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { BehaviorSubject } from "rxjs";

export enum Priority {
  info,
  success,
  error
}

export interface INotification {
  hasRead: boolean;
  title: string;
  description: string;
  priority: Priority;
}

@Injectable({
  providedIn: "root"
})
export class NotificationService {
  private notifications = new BehaviorSubject<INotification[]>(undefined);

  notifications$ = this.notifications.asObservable();
  constructor(private snackBar: MatSnackBar) {
    this.notifications.next([
      {
        hasRead: false,
        title: "info",
        description: "Info test",
        priority: Priority.info
      },
      {
        hasRead: false,
        title: "success",
        description: "Success test",
        priority: Priority.success
      },
      {
        hasRead: false,
        title: "error",
        description: "Error test",
        priority: Priority.error
      }
    ]);
  }

  add(text: string) {
    this.snackBar.open("Cannonball!!", "End now", {
      duration: 500,
      horizontalPosition: "end",
      verticalPosition: "top"
    });

    // this.notifications.value.push("Cannonball!!");
  }
}
