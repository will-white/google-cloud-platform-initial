import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-insurance",
  templateUrl: "./insurance.component.html",
  styleUrls: ["./insurance.component.css"]
})
export class InsuranceComponent implements OnInit {
  id = 0;
  navLinks = [
    { label: "Coverage Information", path: "info" },
    { label: "Written Agreements", path: "agreements" },
    { label: "Contracts", path: "contracts" },
    { label: "Pending Changes", path: "changes" },
    { label: "Miscellaneous Dates", path: "dates" }
  ];

  constructor(private route: ActivatedRoute) {
    this.route.paramMap.subscribe(paramMap => {
      this.id = +paramMap.get("insuranceID") || 0;
    });
  }

  ngOnInit() {}
}
