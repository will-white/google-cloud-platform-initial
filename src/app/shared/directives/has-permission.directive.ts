import {
  Directive,
  ElementRef,
  OnInit,
  Input,
  TemplateRef,
  ViewContainerRef,
  Optional
} from "@angular/core";
import { ControlContainer, FormControl, NgControl } from "@angular/forms";
import { AccountService, Permission } from "../services/account.service";

/* Basic idea is user has ability to view if they can edit.
 * Inspiration from:
 * https://devblogs.microsoft.com/premier-developer/angular-how-to-implement-role-based-security/
 * https://blog.ng-book.com/managing-user-permissions-in-angular-using-akita/
 */
@Directive({
  selector: "[hasPermission]"
})
export class HasPermissionDirective implements OnInit {
  // tslint:disable-next-line: no-input-rename
  @Input("editPermission") editablePermissions: Permission[] = [];
  // tslint:disable-next-line: no-input-rename
  @Input("viewPermission") visiblePermissions: Permission[] = [];

  constructor(
    private el: ElementRef<HTMLElement | HTMLInputElement>,
    @Optional() private control: NgControl,
    @Optional() private controlContainer: ControlContainer,
    private accountService: AccountService
  ) {}

  ngOnInit(): void {
    console.log("Permissions!");
    this.visiblePermissions.push(...this.editablePermissions);
    if (this.accountService.hasPermission(...this.visiblePermissions)) {
      console.log("Use can view it.");
      // User can see view/control/input but might not be allowed to edit it
      if (!this.accountService.hasPermission(...this.editablePermissions)) {
        // User might not be allowed to edit

        // FormGroup/FormArray
        if (this.controlContainer) {
          this.controlContainer.control.disable();
        }

        // FormControl
        if (this.control) {
          this.control.control.disable();
        }

        // Catch all
        if (this.el) {
          (this.el.nativeElement as HTMLInputElement).disabled = true;
        }
      }
    } else {
      console.log("User cannot view it.");
      // FormControl
      if (this.control) {
        this.control.control.disable();
        // FormGroup/FormArray
      } else if (this.controlContainer) {
        console.log("User controlContainer view it.");
        this.controlContainer.control.disable();
      }

      if (this.el) {
        const matFormField = this.el.nativeElement.closest("mat-form-field");
        if (matFormField) {
          matFormField.remove();
        } else {
          this.el.nativeElement.remove();
        }
      }
    }
  }
}
