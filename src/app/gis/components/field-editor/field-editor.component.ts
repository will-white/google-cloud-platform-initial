import { Location } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-field-editor",
  templateUrl: "./field-editor.component.html",
  styleUrls: ["./field-editor.component.css"]
})
export class FieldEditorComponent implements OnInit {
  activeLink = "Field";
  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {}

  back(): void {
    this.router.navigate(["../../"], { relativeTo: this.route });
  }
}
