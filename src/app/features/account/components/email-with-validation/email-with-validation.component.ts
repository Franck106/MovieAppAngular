import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  ChangeDetectorRef,
} from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
import { Observable } from "rxjs";

@Component({
  selector: "app-email-with-validation",
  template: `
    <div [formGroup]="form">
      <mat-form-field>
        <input
          type="email"
          matInput
          [formControlName]="name"
          required
          autocomplete="email"
          placeholder="Votre adresse e-mail"
          i18n-placeholder="@@reactiveEmail"
        />
        <mat-error *ngIf="emailMissing" i18n="@@reactiveEmailMissing"
          >L'e-mail est obligatoire</mat-error
        >
      </mat-form-field>
    </div>
  `,
  styleUrls: ["./email-with-validation.component.css"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmailWithValidationComponent implements OnInit {
  @Input() form: FormGroup;
  @Input() name = "email";
  @Input() api: (value: string) => Observable<boolean>;

  constructor(private changeDetector: ChangeDetectorRef) {}

  get control(): FormControl {
    return this.form.get(this.name) as FormControl;
  }

  get emailMissing(): boolean {
    return this.control.hasError("required") && this.control.dirty;
  }

  ngOnInit(): void {}
}
