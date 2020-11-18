import { Component, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { LineService } from "../line.service";

@Component({
  selector: "app-coverage-information",
  templateUrl: "./coverage-information.component.html",
  styleUrls: ["./coverage-information.component.css"]
})
export class CoverageInformationComponent implements OnInit {
  form!: FormGroup;

  constructor(private lineService: LineService) {
    this.form = lineService.form.get("overview") as FormGroup;
  }

  ngOnInit() {}
}
