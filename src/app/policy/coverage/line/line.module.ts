import { NgModule } from "@angular/core";
import { CoverageInformationComponent } from "./overview/coverage-information.component";
import { DescriptionComponent } from "./description/description.component";
import { FieldsComponent } from "./fields/fields.component";
import { AphComponent } from "./aph/aph.component";
import { AdditionalCoverageComponent } from "./additional-coverage/additional-coverage.component";
import { WrittenAgreementsComponent } from "./written-agreements/written-agreements.component";
import { SharedModule } from "../../../shared/shared.module";
import { LineRoutingModule } from "./line.routing.module";
import { LineComponent } from "./line.component";
import { LineService } from './line.service';

@NgModule({
  imports: [SharedModule, LineRoutingModule],
  declarations: [
    LineComponent,
    CoverageInformationComponent,
    DescriptionComponent,
    FieldsComponent,
    AphComponent,
    AdditionalCoverageComponent,
    WrittenAgreementsComponent
  ],
  providers: [LineService]
})
export class LineModule {}
