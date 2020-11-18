import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { ReportsComponent } from "./reports.component";

const routes: Routes = [
  { path: "", component: ReportsComponent },
  { path: "**", redirectTo: "" }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportsRoutingModule {}
