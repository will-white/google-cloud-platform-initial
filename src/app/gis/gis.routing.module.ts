import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { GisComponent } from "./gis.component";
import {
  EntryEditorComponent,
  FieldEditorComponent,
  LayoutEditorComponent
} from "./components";

const routes: Routes = [
  {
    path: "",
    component: GisComponent // Agency map
  },
  {
    path: "insured/:insuredID",
    component: GisComponent, // Agency map
    children: [
      { path: "layout", component: LayoutEditorComponent }, // Layout edit for insured
      {
        path: "ftf/:ftfID",
        component: FieldEditorComponent
      }
    ]
  },
  { path: "**", redirectTo: "" }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GisRoutingModule {}
