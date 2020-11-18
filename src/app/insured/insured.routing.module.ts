import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { InsuredComponent } from "./insured.component";

const routes: Routes = [
  {
    path: ":insuredID",
    component: InsuredComponent
    // children: [{ path: "**", redirectTo: "" }]
  },
  { path: "**", redirectTo: "" }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InsuredRoutingModule {}
