import {
  animate,
  state,
  style,
  transition,
  trigger
} from "@angular/animations";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "policy-lines",
  templateUrl: "./lines.component.html",
  styleUrls: ["./lines.component.scss"],
  animations: [
    trigger("detailExpand", [
      state("collapsed", style({ height: "0px", minHeight: "0" })),
      state("expanded", style({ height: "*" })),
      transition(
        "expanded <=> collapsed",
        animate("225ms cubic-bezier(0.4, 0.0, 0.2, 1)")
      )
    ])
  ]
})
export class LinesComponent implements OnInit {
  firstRowColumns = [
    "number",
    "unitstructureCode",
    "basicNumber",
    "practice",
    "fsn-plss",
    "yield",
    "options",
    "acres",
    "actions"
  ];
  secondRowColumns = [
    "optionalNumber",
    "type",
    "farmname",
    "subCountyCode",
    "share",
    "plantDate"
  ];
  tableDataSource = lines;
  expandedElement: Line | null;

  constructor() {}

  ngOnInit() {}
}

export interface Line {
  id: number;
  number: number;
  unit: {
    code: string;
    basic: number;
    optional: number;
  };
  practice: string;
  type: string;
  fsn: string;
  plss: string;
  farmName: string;
  yield: number;
  subCountyCode: string;
  options: string[];
  share: number;
  acres: number;
  planted: string;
}

const lines: Line[] = [
  {
    id: 945,
    number: 1,
    unit: { code: "BU", basic: 1, optional: 0 },
    practice: "003",
    type: "999",
    fsn: "N/A",
    plss: "N/A",
    farmName: "Test Farm",
    yield: 16,
    subCountyCode: null,
    options: null,
    share: 1,
    acres: 100.02,
    planted: "2020-12-12"
  },
  {
    id: 1101,
    number: 2,
    unit: { code: "BU", basic: 1, optional: 0 },
    practice: "003",
    type: "999",
    fsn: "N/A",
    plss: "N/A",
    farmName: "Test Farm",
    yield: 16,
    subCountyCode: null,
    options: null,
    share: 1,
    acres: 100.02,
    planted: "2020-12-12"
  },
  {
    id: 2971,
    number: 3,
    unit: { code: "BU", basic: 1, optional: 0 },
    practice: "003",
    type: "999",
    fsn: "N/A",
    plss: "N/A",
    farmName: "Test Farm",
    yield: 16,
    subCountyCode: null,
    options: null,
    share: 1,
    acres: 100.02,
    planted: "2020-12-12"
  },
  {
    id: 5643,
    number: 4,
    unit: { code: "BU", basic: 1, optional: 0 },
    practice: "003",
    type: "999",
    fsn: "N/A",
    plss: "N/A",
    farmName: "Test Farm",
    yield: 16,
    subCountyCode: null,
    options: null,
    share: 1,
    acres: 100.02,
    planted: "2020-12-12"
  },
  {
    id: 8976,
    number: 5,
    unit: { code: "BU", basic: 1, optional: 0 },
    practice: "003",
    type: "999",
    fsn: "N/A",
    plss: "N/A",
    farmName: "Test Farm",
    yield: 16,
    subCountyCode: null,
    options: null,
    share: 1,
    acres: 100.02,
    planted: "2020-12-12"
  }
];
