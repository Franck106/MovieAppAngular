import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
} from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";

@Component({
  selector: "app-password-with-confirmation",
  template: `
    <div [formGroup]="form">
      <!-- TODO: Add group name -->
      <div [formGroupName]="groupName">
        <mat-form-field>
          <!-- TODO: Add formControlName -->
          <input
            type="password"
            [formControlName]="fieldName1"
            matInput
            required
            autocomplete="off"
            placeholder="Votre mot de passe"
            i18n-placeholder="@@reactivePassword"
          />
          <mat-error *ngIf="passwordMissing" i18n="@@reactivePasswordMissing"
            >Le mot de passe est obligatoire</mat-error
          >
        </mat-form-field>
        <mat-form-field>
          <!-- TODO: Add formControlName -->
          <input
            type="password"
            [formControlName]="fieldName2"
            matInput
            autocomplete="off"
            placeholder="Confirmez-le"
            i18n-placeholder="@@reactivePasswordConfirm"
          />
        </mat-form-field>
        <mat-error
          *ngIf="passwordsNotMatching"
          i18n="@@reactivePassordNotMatching"
          >Les deux mots de passse ne sont pas identiques</mat-error
        >
      </div>
    </div>
  `,
  styleUrls: ["./password-with-confirmation.component.css"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PasswordWithConfirmationComponent implements OnInit {
  @Input() form: FormGroup;
  @Input() groupName = "password";
  @Input() fieldName1 = "password1";
  @Input() fieldName2 = "password2";

  constructor() {}

  get group(): FormGroup {
    return this.form.get(this.groupName) as FormGroup;
  }

  get passwordsNotMatching(): boolean {
    return this.group.hasError("passwordsNotMatching");
  }

  get controls(): FormControl[] {
    return Object.values(this.group.controls) as FormControl[];
  }

  get passwordMissing(): boolean {
    const [password1] = this.controls;
    return password1.hasError("required") && password1.dirty;
  }

  ngOnInit(): void {
    const group = this.form.get(this.groupName) as FormGroup;
    group.setValidators([
      () => {
        const password1 = group.get(this.fieldName1) as FormControl;
        const password2 = group.get(this.fieldName2) as FormControl;
        return password1.value === password2.value
          ? null
          : { passwordsNotMatching: true };
      },
    ]);
  }
}
