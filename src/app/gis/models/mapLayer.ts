import BaseLayer from "ol/layer/Base";
import { MapLayerGroup, MapLayerType } from ".";
import { Subject } from "rxjs";

export class MapLayer {
  public className: string;
  public olLayer?: BaseLayer = undefined;
  public unsubscribe = new Subject();
  public selected = false;

  constructor(
    public group: MapLayerGroup,
    public type: MapLayerType,
    public label: string,
    public url?: string,
    public queryable: boolean = false,
    className?: string
  ) {
    if (!className) {
      this.className = this.name;
    } else {
      this.className = className;
    }
  }

  get name(): string {
    return this.type
      .toString()
      .replace(/([a-z])([A-Z])/g, "$1-$2")
      .toLowerCase();
  }

  dispose(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();

    if (this.olLayer) {
      this.olLayer.dispose();
      this.olLayer = undefined;
    }
  }
}
