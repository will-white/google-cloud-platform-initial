import { NgModule } from "@angular/core";
import { CoverageInformationComponent } from "./coverage-information/coverage-information.component";
import { WrittenAgreementsComponent } from "./written-agreements/written-agreements.component";
import { ContractsComponent } from "./contracts/contracts.component";
import { PendingChangesComponent } from "./pending-changes/pending-changes.component";
import { MiscellaneousDatesComponent } from "./miscellaneous-dates/miscellaneous-dates.component";
import { InsuranceComponent } from "./insurance.component";
import { SharedModule } from "../../../shared/shared.module";
import { InsuranceRoutingModule } from "./insurance.routing.module";

@NgModule({
  imports: [SharedModule, InsuranceRoutingModule],
  declarations: [
    CoverageInformationComponent,
    WrittenAgreementsComponent,
    ContractsComponent,
    PendingChangesComponent,
    MiscellaneousDatesComponent,
    InsuranceComponent
  ]
})
export class InsuranceModule {}
