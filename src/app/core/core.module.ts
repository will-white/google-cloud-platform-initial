import { NgModule } from "@angular/core";
import { SharedModule } from "../shared/shared.module";
import { NavBarComponent } from "./components/nav-bar/nav-bar.component";
import { NavagationPendingComponent } from "./components/navagation-pending/navagation-pending.component";
import { RequestPendingComponent } from "./components/request-pending/request-pending.component";
import { YearPickerComponent } from "./components/year-picker/year-picker.component";

@NgModule({
  imports: [SharedModule],
  declarations: [
    NavBarComponent,
    NavagationPendingComponent,
    RequestPendingComponent,
    YearPickerComponent
  ],
  exports: [NavBarComponent]
})
export class CoreModule {}
