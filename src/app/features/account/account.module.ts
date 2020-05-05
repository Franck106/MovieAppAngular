import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatInputModule } from "@angular/material/input";
import { TextFieldModule } from "@angular/cdk/text-field";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatCardModule } from "@angular/material/card";
import { MatButtonModule } from "@angular/material/button";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatRadioModule } from "@angular/material/radio";
import { MatSelectModule } from "@angular/material/select";
import { MatSnackBarModule } from "@angular/material/snack-bar";

import { AccountRoutingModule } from "./account-routing.module";
import { RegisterPage } from "./pages/register/register.page";
import { LoginPage } from "./pages/login/login.page";
import { ProfilePage } from "./pages/profile/profile.page";
import { LogoutPage } from "./pages/logout/logout.page";
import { EmailWithValidationComponent } from "./components/email-with-validation/email-with-validation.component";
import { CityWithAutocompleteComponent } from "./components/city-with-autocomplete/city-with-autocomplete.component";
import { ErrorsComponent } from "./components/errors/errors.component";
import { PasswordWithConfirmationComponent } from "./components/password-with-confirmation/password-with-confirmation.component";

@NgModule({
  declarations: [
    RegisterPage,
    LoginPage,
    ProfilePage,
    LogoutPage,
    EmailWithValidationComponent,
    CityWithAutocompleteComponent,
    ErrorsComponent,
    PasswordWithConfirmationComponent,
  ],
  imports: [
    CommonModule,
    MatInputModule,
    TextFieldModule,
    MatAutocompleteModule,
    MatCardModule,
    MatButtonModule,
    MatCheckboxModule,
    MatSelectModule,
    MatRadioModule,
    MatSnackBarModule,
    AccountRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class AccountModule {}
