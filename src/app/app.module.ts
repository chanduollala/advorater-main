import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatCardModule} from "@angular/material/card";
import {MatIconModule} from "@angular/material/icon";
import {MatDividerModule} from "@angular/material/divider";
import {MatButtonModule} from "@angular/material/button";
import {ActivatedRoute, RouterLink, RouterLinkActive, RouterModule, RouterOutlet} from "@angular/router";
import {MatSidenavModule} from "@angular/material/sidenav";
import {FooterComponent} from "./footer/footer.component";
import {ToolbarComponent} from "./toolbar/toolbar.component";
import {MatToolbarModule} from "@angular/material/toolbar";
import {FlexLayoutModule} from "@angular/flex-layout";
import {MatDialog, MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {AppRoutingModule} from "../app-routing/app-routing.module";
import {HttpClientModule} from "@angular/common/http";
import { AboutComponent } from './about/about.component';
import { FaqsComponent } from './faqs/faqs.component';
import {MatExpansionModule} from "@angular/material/expansion";
import { LoginComponent } from './login/login.component';
import { LoginConfirmationComponent } from './login-confirmation/login-confirmation.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { SignupComponent } from './signup/signup.component';
import {MatTabsModule} from "@angular/material/tabs";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {NgOtpInputModule} from "ng-otp-input";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import { ProfileComponent } from './profile/profile.component';
import {StarRatingConfigService, StarRatingModule} from "angular-star-rating";
import { SearchComponent } from './search/search.component';
import {SearchDropdown} from "./c_comp/search-dropdown/search-dropdown.component";
import { CreateAdvocateComponent } from './create-advocate/create-advocate.component';
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatSelectModule} from "@angular/material/select";
import { AddTagComponent } from './c_comp/add-tag/add-tag.component';
import {MatChipsModule} from "@angular/material/chips";
import {HashLocationStrategy, LocationStrategy} from "@angular/common";
import { PaymentComponent } from './payment/payment.component';
import { ViewAdvocateComponent } from './view-advocate/view-advocate.component';
import { NewsComponent } from './news/news.component';
import { CarousalComponent } from './c_comp/carousal/carousal.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FooterComponent,
    ToolbarComponent,
    AboutComponent,
    FaqsComponent,
    LoginComponent,
    LoginConfirmationComponent,
    ResetPasswordComponent,
    SignupComponent,
    ProfileComponent,
    SearchComponent,
    SearchDropdown,
    CreateAdvocateComponent,
    AddTagComponent,
    PaymentComponent,
    ViewAdvocateComponent,
    NewsComponent,
    CarousalComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatCardModule,
    MatIconModule,
    MatDividerModule,
    MatDialogModule,
    MatButtonModule,
    RouterLink,
    RouterLinkActive,
    MatSidenavModule,
    RouterOutlet,
    RouterModule,
    MatToolbarModule,
    FlexLayoutModule,
    MatExpansionModule,
    MatTabsModule,
    ReactiveFormsModule,
    MatInputModule,
    NgOtpInputModule,
    MatSnackBarModule,
    StarRatingModule.forRoot(),
    FormsModule,
    MatTooltipModule,
    MatSelectModule,
    MatChipsModule,

  ],
  providers: [
    {provide: LocationStrategy, useClass: HashLocationStrategy},
    StarRatingConfigService,
    {
      provide: MatDialogRef,
      useValue: {}
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
