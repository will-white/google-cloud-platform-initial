import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";

const routes: Routes = [
  {
    path: "gis",
    loadChildren: () => import("./gis/gis.module").then(m => m.GisModule)
  },
  {
    path: "insured",
    loadChildren: () =>
      import("./insured/insured.module").then(m => m.InsuredModule)
  },
  {
    path: "policy",
    loadChildren: () =>
      import("./policy/policy.module").then(m => m.PolicyModule)
  },
  {
    path: "reports",
    loadChildren: () =>
      import("./reports/reports.module").then(m => m.ReportsModule)
  },
  {
    path: "",
    loadChildren: () =>
      import("./dashboard/dashboard.module").then(m => m.DashboardModule)
  },
  { path: "**", redirectTo: "" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
