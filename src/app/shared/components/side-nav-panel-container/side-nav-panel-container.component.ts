import { ChangeDetectionStrategy, Component, Input } from "@angular/core";

@Component({
  selector: "shared-side-nav-panel-container",
  templateUrl: "./side-nav-panel-container.component.html",
  styleUrls: ["./side-nav-panel-container.component.css"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SideNavPanelContainerComponent {
  @Input() navLinks: { icon: string; text: string; route: string }[];

  hideText = false;

  toggleText() {
    this.hideText = !this.hideText;
  }
}
