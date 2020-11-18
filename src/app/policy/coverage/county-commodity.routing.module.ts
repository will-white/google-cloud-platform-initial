import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { ListComponent } from "./overview/list.component";

const routes: Routes = [
  {
    path: "",
    children: [
      {
        path: "insurance",
        loadChildren: () =>
          import("./insurance/insurance.module").then(m => m.InsuranceModule)
      },
      {
        path: "line",
        loadChildren: () => import("./line/line.module").then(m => m.LineModule)
      },
      { path: "", component: ListComponent, pathMatch: "full" },
      { path: "**", redirectTo: "" }
    ]
  },
  { path: "**", redirectTo: "" }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CountyCommodityRoutingModule {}
