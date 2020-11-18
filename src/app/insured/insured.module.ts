import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { InsuredComponent } from "./insured.component";
import { SharedModule } from "../shared/shared.module";
import { InsuredRoutingModule } from "./insured.routing.module";
import { OverviewComponent } from "./overview/overview.component";
import { SbiComponent } from "./sbi/sbi.component";
import { ManagementComponent } from './management/management.component';
import { FarmingOperationComponent } from './farming-operation/farming-operation.component';
import { DigitalDocumentsComponent } from './digital-documents/digital-documents.component';

@NgModule({
  imports: [SharedModule, InsuredRoutingModule],
  declarations: [InsuredComponent, OverviewComponent, SbiComponent, ManagementComponent, FarmingOperationComponent, DigitalDocumentsComponent]
})
export class InsuredModule {}
