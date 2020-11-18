import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { CoverageInformationComponent } from "./overview/coverage-information.component";
import { WrittenAgreementsComponent } from "./written-agreements/written-agreements.component";
import { LineComponent } from "./line.component";
import { AdditionalCoverageComponent } from "./additional-coverage/additional-coverage.component";
import { AphComponent } from "./aph/aph.component";
import { DescriptionComponent } from "./description/description.component";
import { FieldsComponent } from "./fields/fields.component";

const routes: Routes = [
  { path: "", component: LineComponent },
  {
    path: ":lineID",
    component: LineComponent,
    children: [
      { path: "additional", component: AdditionalCoverageComponent },
      { path: "info", component: CoverageInformationComponent },
      { path: "aph", component: AphComponent },
      { path: "description", component: DescriptionComponent },
      { path: "fields", component: FieldsComponent },
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
export class LineRoutingModule {}
