import { Component, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { LineService } from "./line.service";

@Component({
  selector: "app-line",
  templateUrl: "./line.component.html",
  styleUrls: ["./line.component.css"]
})
export class LineComponent implements OnInit {
  id = 0;
  navLinks = [
    { label: "Coverage Information", path: "info" },
    { label: "Miscellaneous", path: "additional" },
    { label: "Description", path: "description" },
    { label: "Written Agreements", path: "agreements" },
    { label: "APH", path: "aph" },
    { label: "Fields", path: "fields" }
  ];

  form!: FormGroup;

  constructor(private route: ActivatedRoute, private lineService: LineService) {
    this.form = lineService.form;
    this.route.paramMap.subscribe(paramMap => {
      this.id = +paramMap.get("lineID") || 0;
    });
  }

  ngOnInit() {}

  tabLoadTimes: Date[] = [];

  getTimeLoaded(index: number) {
    if (!this.tabLoadTimes[index]) {
      this.tabLoadTimes[index] = new Date();
    }

    return this.tabLoadTimes[index];
  }
}
