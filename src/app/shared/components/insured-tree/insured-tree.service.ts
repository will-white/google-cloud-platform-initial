import { NestedTreeControl } from "@angular/cdk/tree";
import { Injectable } from "@angular/core";
import { MatTreeNestedDataSource } from "@angular/material/tree";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class InsuredTreeService {
  treeControl = new NestedTreeControl<InsuredTreeNode>(node => node.children);
  dataSource = new MatTreeNestedDataSource<InsuredTreeNode>();

  constructor() {
    console.log("Tree Service");
    this.dataSource.data = TREE_DATA;
  }
}

export interface InsuredTreeNode {
  name: string;
  children?: InsuredTreeNode[];
  type?: NodeType;
  id?: number;
}

export enum NodeType {
  Insured,
  SBI,
  Policy,
  CountyCommodity,
  Claim
}

const TREE_DATA: InsuredTreeNode[] = [
  {
    name: "Fruit",
    children: [{ name: "Apple" }, { name: "Banana" }, { name: "Fruit loops" }]
  },
  {
    name: "GROSS, STEVE",
    children: [
      {
        name: "SBIs",
        children: [{ name: "GROSS, SHARON" }, { name: "DOE, JOHN" }]
      },
      {
        name: "AL-914066",
        children: [
          { name: "Etowah-Corn" },
          { name: "Etowah-Cotton" },
          { name: "Etowah-Soybeans" }
        ]
      },
      {
        name: "AL-920414",
        children: [{ name: "Etowah-Wheat" }]
      }
    ]
  }
];
