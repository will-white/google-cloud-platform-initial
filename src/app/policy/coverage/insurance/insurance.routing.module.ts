import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { InsuranceComponent } from "./insurance.component";
import { ContractsComponent } from "./contracts/contracts.component";
import { CoverageInformationComponent } from "./coverage-information/coverage-information.component";
import { MiscellaneousDatesComponent } from "./miscellaneous-dates/miscellaneous-dates.component";
import { PendingChangesComponent } from "./pending-changes/pending-changes.component";
import { WrittenAgreementsComponent } from "./written-agreements/written-agreements.component";

const routes: Routes = [
  { path: "", component: InsuranceComponent },
  {
    path: ":insuranceID",
    component: InsuranceComponent,
    children: [
      { path: "contracts", component: ContractsComponent },
      { path: "info", component: CoverageInformationComponent },
      { path: "dates", component: MiscellaneousDatesComponent },
      { path: "changes", component: PendingChangesComponent },
      { path: "agreements", component: WrittenAgreementsComponent },
      { path: "**", redirectTo: "info" }
    ]
  },
  { path: "**", redirectTo: "" }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InsuranceRoutingModule {}
