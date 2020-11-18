import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MaterialModule } from "./modules/material.module";
import { FlexLayoutModule } from "@angular/flex-layout";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SideNavPanelContainerComponent } from "./components/side-nav-panel-container/side-nav-panel-container.component";
import { NotificationService } from "./services/notification.service";
import { HasPermissionDirective } from "./directives/has-permission.directive";
import { InsuredTreeComponent } from "./components/insured-tree/insured-tree.component";
import { RestrictedDateComponent } from "./components/restricted-date/restricted-date.component";
import { HoverableMenuComponent } from "./components/hoverable-menu/hoverable-menu.component";
import { RouterModule } from "@angular/router";
import { InsuredTreeService } from './components/insured-tree/insured-tree.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    FlexLayoutModule,
    RouterModule
  ],
  declarations: [
    SideNavPanelContainerComponent,
    HasPermissionDirective,
    InsuredTreeComponent,
    RestrictedDateComponent,
    HoverableMenuComponent
  ],
  exports: [
    SideNavPanelContainerComponent,
    HasPermissionDirective,
    InsuredTreeComponent,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    FlexLayoutModule
  ],
  providers: [NotificationService]
})
export class SharedModule {}
