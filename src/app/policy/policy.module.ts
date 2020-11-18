import { NgModule } from "@angular/core";
import { SharedModule } from "../shared/shared.module";
import { PolicyComponent } from "./policy.component";
import { SideNavComponent } from "./side-nav/side-nav.component";
import { ToolbarComponent } from "./toolbar/toolbar.component";
import { PolicyRoutingModule } from "./policy.routing.module";
import { OverviewComponent } from './overview/overview.component';

@NgModule({
  imports: [SharedModule, PolicyRoutingModule],
  declarations: [PolicyComponent, SideNavComponent, ToolbarComponent, OverviewComponent],
  bootstrap: [PolicyComponent]
})
export class PolicyModule {}
