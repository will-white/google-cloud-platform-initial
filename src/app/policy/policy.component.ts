import { NestedTreeControl } from "@angular/cdk/tree";
import { Component, OnInit } from "@angular/core";
import { MatTreeNestedDataSource } from "@angular/material/tree";

@Component({
  selector: "app-policy",
  templateUrl: "./policy.component.html",
  styleUrls: ["./policy.component.css"]
})
export class PolicyComponent {
  navLinks = [
    { icon: "map", text: "Policy", route: "./" },
    { icon: "assessment", text: "Estimates", route: "/estimates" },
    { icon: "wysiwyg", text: "Reports", route: "/reports" },
    { icon: "bar_chart", text: "Charts", route: "/charts" },
    { icon: "map", text: "Test Policy", route: "/policy/0" }
  ];
}
