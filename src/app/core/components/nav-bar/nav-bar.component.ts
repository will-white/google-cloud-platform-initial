import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { NotificationService } from "../../../shared/services/notification.service";

@Component({
  selector: "app-nav-bar",
  templateUrl: "./nav-bar.component.html",
  styleUrls: ["./nav-bar.component.css"]
})
export class NavBarComponent implements OnInit {
  @Output() sidenavToggle = new EventEmitter();
  @Output() notificationsToggle = new EventEmitter();

  constructor(public notificationService: NotificationService) {}

  ngOnInit() {}
}
