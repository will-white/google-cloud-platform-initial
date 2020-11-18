import { NgModule } from "@angular/core";
import { SharedModule } from "../shared/shared.module";
import { ReportsComponent } from "./reports.component";
import { ReportsRoutingModule } from "./reports.routing.module";

@NgModule({
  imports: [SharedModule, ReportsRoutingModule],
  declarations: [ReportsComponent]
})
export class ReportsModule {}
