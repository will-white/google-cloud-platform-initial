import { Component, ChangeDetectionStrategy } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MapService } from "../../services/map.service";
import { LayersSelectorComponent } from "../layers-selector/layers-selector.component";

@Component({
  selector: "gis-action-buttons",
  templateUrl: "./action-buttons.component.html",
  styleUrls: ["./action-buttons.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ActionButtonsComponent {
  showLegend = false;
  constructor(private mapService: MapService, private dialog: MatDialog) {}

  zoomIn = () => this.mapService.zoomIn();
  zoomOut = () => this.mapService.zoomOut();
  centerToInsured = () => undefined;
  showLayers = () => this.dialog.open(LayersSelectorComponent);
  toggleLegend = () => (this.showLegend = !this.showLegend);
}
