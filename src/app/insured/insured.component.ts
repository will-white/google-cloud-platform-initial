import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-insured",
  templateUrl: "./insured.component.html",
  styleUrls: ["./insured.component.css"]
})
export class InsuredComponent implements OnInit {
  navLinks = [
    { label: "Overview", path: "overview" },
    { label: "Farm Operation", path: "farming-operation" },
    { label: "Digital Documents", path: "digital-documents" },
    { label: "SBIs", path: "sbis" },
    { label: "Account Management", path: "account-management" },
    { label: "Pending Changes", path: "changes" }
  ];

  constructor() {
    console.log("insured");
  }

  ngOnInit() {}
}
