import { Injectable } from "@angular/core";
import { Circle, Fill, Stroke, Style, Text } from "ol/style";
import { AccountService } from "../../shared/services/account.service";

/**
 * This service needs to listen to the preferences to update styles on changes
 * ie: vectorPolygons.setStyle(polygonStyleFunction);
 */
@Injectable({
  providedIn: "root"
})
export class StylesService {
  constructor(private userService: AccountService) {}

  getStyle(feature: any): Style {
    const baseStyle = defaultStyle(feature.getGeometry().getType());
    const userPrefs = {};

    if (!userPrefs) {
      return baseStyle;
    }

    // Combine base with user prefs
    return baseStyle;
  }
}

const image = new Circle({
  radius: 5,
  fill: null,
  stroke: new Stroke({ color: "red", width: 1 })
});

const defaultStyle = (shapeType: any): Style => {
  switch (shapeType) {
    case "Point":
      return new Style({
        image: image
      });
    case "LineString":
      return new Style({
        stroke: new Stroke({
          color: "green",
          width: 1
        })
      });
    case "MultiLineString":
      return new Style({
        stroke: new Stroke({
          color: "green",
          width: 1
        })
      });
    case "MultiPoint":
      return new Style({
        image: image
      });
    case "MultiPolygon":
      return new Style({
        stroke: new Stroke({
          color: "yellow",
          width: 1
        }),
        fill: new Fill({
          color: "rgba(255, 255, 0, 0.1)"
        })
      });
    case "Polygon":
      return new Style({
        stroke: new Stroke({
          color: "blue",
          lineDash: [4],
          width: 3
        }),
        fill: new Fill({
          color: "rgba(0, 0, 255, 0.1)"
        }),
        text: new Text({
          font: "12px Calibri,sans-serif",
          overflow: true,
          fill: new Fill({
            color: "#000"
          }),
          stroke: new Stroke({
            color: "#fff",
            width: 3
          }),
          text: "Test"
        })
      });
    case "GeometryCollection":
      return new Style({
        stroke: new Stroke({
          color: "magenta",
          width: 2
        }),
        fill: new Fill({
          color: "magenta"
        }),
        image: new Circle({
          radius: 10,
          fill: null,
          stroke: new Stroke({
            color: "magenta"
          })
        })
      });
    case "Circle":
      return new Style({
        stroke: new Stroke({
          color: "red",
          width: 2
        }),
        fill: new Fill({
          color: "rgba(255,0,0,0.2)"
        })
      });
  }
};
