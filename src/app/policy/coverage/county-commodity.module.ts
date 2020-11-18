import { NgModule } from "@angular/core";
import { SharedModule } from "../../shared/shared.module";
import { CountyCommodityRoutingModule } from "./county-commodity.routing.module";
import { ListComponent } from "./overview/list.component";
import { InsurancesComponent } from "./overview/insurances/insurances.component";
import { LinesComponent } from "./overview/lines/lines.component";

@NgModule({
  imports: [SharedModule, CountyCommodityRoutingModule],
  declarations: [InsurancesComponent, LinesComponent, ListComponent]
})
export class CountyCommodityModule {}
