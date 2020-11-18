import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { PolicyComponent } from "./policy.component";

const routes: Routes = [
  {
    path: "",
    component: PolicyComponent,
    children: [
      // {
      //   path: "reports",
      //   loadChildren: () =>
      //     import("./reports/reports.module").then(m => m.ReportsModule)
      // },
      {
        // Has to be last so routing goes to reports for some reason
        path: ":policyID",
        loadChildren: () =>
          import("./coverage/county-commodity.module").then(
            m => m.CountyCommodityModule
          )
      },
      // {
      //   path: "",
      //   loadChildren: () =>
      //     import("./dashboard/dashboard.module").then(m => m.DashboardModule)
      // },
      { path: "**", redirectTo: "" }
    ]
  },
  { path: "**", redirectTo: "" }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PolicyRoutingModule {}
