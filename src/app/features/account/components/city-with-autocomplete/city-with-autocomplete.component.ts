import { Component, OnInit, Input, OnDestroy } from "@angular/core";
import { Observable, Subscription, of } from "rxjs";
import { FormGroup, FormControl } from "@angular/forms";
import {
  filter,
  switchMap,
  catchError,
  distinctUntilChanged,
  debounceTime,
} from "rxjs/operators";
import { AutocompleteService } from "../../services/autocomplete.service";

@Component({
  selector: "app-city-with-autocomplete",
  template: `
    <div [formGroup]="form">
      <mat-form-field>
        <input
          type="text"
          [name]="name"
          [formControl]="cityControl"
          [matAutocomplete]="cityAuto"
          matInput
          placeholder="Votre ville"
          i18n-placeholder="@@registerCity"
        />
      </mat-form-field>
      <mat-autocomplete #cityAuto>
        <mat-option
          *ngFor="let suggestion of citySuggestions"
          [value]="suggestion"
          >{{ suggestion }}</mat-option
        >
      </mat-autocomplete>
    </div>
  `,
  styleUrls: ["./city-with-autocomplete.component.css"],
})
export class CityWithAutocompleteComponent implements OnInit, OnDestroy {
  @Input() form: FormGroup;
  @Input() name = "city";
  cityControl = new FormControl("");
  @Input() api: (value: string) => Observable<string[]>;
  citySuggestions: string[] = [];
  citySubscription: Subscription;

  constructor(private autocomplete: AutocompleteService) {}

  ngOnDestroy(): void {
    this.citySubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.citySubscription = (this.cityControl.valueChanges as Observable<
      string
    >)
      .pipe(
        filter((value) => value.length > 2),
        debounceTime(500),
        switchMap((value) => this.autocomplete.getCitySuggestions(value)),
        catchError(() => of([]))
      )
      .subscribe((res) => {
        this.citySuggestions = res;
      });
  }
}
