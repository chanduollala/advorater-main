import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from "../app/home/home.component";
import {AboutComponent} from "../app/about/about.component";
import {FaqsComponent} from "../app/faqs/faqs.component";
import {SignupComponent} from "../app/signup/signup.component";
import {ProfileComponent} from "../app/profile/profile.component";
import {SearchComponent} from "../app/search/search.component";
import {CreateAdvocateComponent} from "../app/create-advocate/create-advocate.component";
import {PaymentComponent} from "../app/payment/payment.component";
import {ViewAdvocateComponent} from "../app/view-advocate/view-advocate.component";
import {NewsComponent} from "../app/news/news.component";

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'about', component: AboutComponent},
  {path: 'faqs', component: FaqsComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'profile', component: ProfileComponent},
  {path: 'search', component: SearchComponent},
  {path: 'search/:tag_id', component: SearchComponent},
  {path: 'adv_create/:id', component:CreateAdvocateComponent},
  {path: 'contact_us', component: CreateAdvocateComponent},
  {path: 'payment/:id', component:PaymentComponent},
  {path: 'view_advocate/:id', component: ViewAdvocateComponent},
  {path: 'news', component: NewsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})

export class AppRoutingModule {
}
