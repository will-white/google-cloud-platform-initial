import { NgModule } from "@angular/core";
import { GisComponent } from "./gis.component";
import {
  ActionButtonsComponent,
  CoordinatesComponent,
  LayersSelectorComponent,
  LegendComponent,
  LocationComponent
} from "./map-controls";
import {
  EntryEditorComponent,
  FieldEditorComponent,
  LayoutEditorComponent
} from "./components";
import { SharedModule } from "../shared/shared.module";
import { GisRoutingModule } from "./gis.routing.module";
import { SideNavComponent } from "./side-nav/side-nav.component";
import { ToolbarComponent } from "./toolbar/toolbar.component";
import { MapComponent } from "./components/map/map.component";

@NgModule({
  imports: [SharedModule, GisRoutingModule],
  declarations: [
    GisComponent,
    ActionButtonsComponent,
    CoordinatesComponent,
    LayersSelectorComponent,
    LegendComponent,
    LocationComponent,
    EntryEditorComponent,
    FieldEditorComponent,
    LayoutEditorComponent,
    SideNavComponent,
    ToolbarComponent,
    MapComponent
  ]
})
export class GisModule {}
