import { NestedTreeControl } from "@angular/cdk/tree";
import { Component, OnInit } from "@angular/core";
import { MatTreeNestedDataSource } from "@angular/material/tree";
import { InsuredTreeNode, InsuredTreeService } from "./insured-tree.service";

@Component({
  selector: "app-insured-tree",
  templateUrl: "./insured-tree.component.html",
  styleUrls: ["./insured-tree.component.css"]
})
export class InsuredTreeComponent implements OnInit {
  hasChild = (_: number, node: InsuredTreeNode) =>
    !!node.children && node.children.length > 0;

  constructor(public treeService: InsuredTreeService) {
    console.log("Insured Tree.");
  }

  ngOnInit() {}
}

