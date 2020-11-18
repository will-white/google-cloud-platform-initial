import { NestedTreeControl } from "@angular/cdk/tree";
import { Component, VERSION } from "@angular/core";
import { MatTreeNestedDataSource } from "@angular/material/tree";
import {
  animate,
  state,
  style,
  transition,
  trigger
} from "@angular/animations";
import { Observable, of } from "rxjs";
import { DataSource } from "@angular/cdk/table";

@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  name = "Angular " + VERSION.major;
  constructor() {}
}
