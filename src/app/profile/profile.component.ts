import { Component, OnInit } from '@angular/core';
import {ProfileService} from "../../services/profile_sevice/profile.service";
import {Advocate, Customer} from "../../models/advocate";
import {dateTimestampProvider} from "rxjs/internal/scheduler/dateTimestampProvider";
import {Router} from "@angular/router";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  public advocate!: Advocate;
  private user_type: string;

  current_year = new Date().getFullYear()
  public customer!: Customer;



  interactions: {
    id?: number
    advocate_id?: number;
    user_id?: number;
    message?: string;
    interaction_type?: number;
    updated_at?: string
    advocate_name?: string
    customer_name?: string
  }[] =[];

  private interaction_types: any= {
    1: 'Appointment Request',
    2: 'Consultation',
    3: 'Feedback'
  };


  constructor(private profileService: ProfileService, private router: Router) {
    this.user_type = sessionStorage.getItem('user_type')!
    if(this.user_type=='C'){
      this.profileService.loadCustomer(Number.parseInt(sessionStorage.getItem('user_id')!)).subscribe(
        (response)=>{
          console.log(response)
          if (response.id != null)
            this.customer = new Customer(response);
          console.log(this.customer)
          this.profileService.getCustomerInteractions(Number.parseInt(sessionStorage.getItem('user_id')!)).subscribe(
            (response)=> {
              console.log(response)
              if (response?.length>0) {
                for (let i = 0; i < response.length; i++) {
                  this.interactions.push({
                    id: response[i]?.id,
                    advocate_id: response[i]?.advocate_id,
                    user_id: response[i]?.user_id,
                    message: response[i]?.message,
                    interaction_type: this.interaction_types[response[i]?.interaction_type],
                    updated_at: new Date(response[i]?.updated_at).toString(),
                    advocate_name: response[i]?.advocate.user.user_detail.name.first_name+ ' '+response[i]?.advocate.user.user_detail.name.last_name,
                    customer_name: response[i]?.user.user_detail.name.first_name
                  })
                  console.log(this.interactions)
                }
              }
            }
          )
        }
      )
    }
    else if(this.user_type=='A'){
      this.profileService.loadAdvocateForProfile(Number.parseInt(sessionStorage.getItem('user_id')!)).subscribe(
        (response) => {
          console.log(response)
          if (response.id != null)
            this.advocate = new Advocate(response);
          console.log(this.advocate)
          this.profileService.getAdvocateInteractions(this.advocate.id!).subscribe(
            (response)=>{
              console.log(response)
              if (response?.length>0) {
                for (let i = 0; i < response.length; i++) {
                  this.interactions.push({
                    id: response[i]?.id,
                    advocate_id: response[i]?.advocate_id,
                    user_id: response[i]?.user_id,
                    message: response[i]?.message,
                    interaction_type: this.interaction_types[response[i]?.interaction_type],
                    updated_at: new Date(response[i]?.updated_at).toString(),
                    advocate_name: response[i]?.advocate.user.user_detail.name.first_name+ ' '+response[i]?.advocate.user.user_detail.name.last_name,
                    customer_name: response[i]?.user.user_detail.name.first_name
                  })
                  console.log(this.interactions)
                }
              }
            })
        }
      )
    }

    if(this.user_type=='A' || this.user_type=='C'){

    }

  }

  ngOnInit(): void {
  }


  logout() {
    this.profileService.logout()
  }

  contiueReg() {
    this.router.navigate([`/adv_create/${this.advocate.id}`])
  }

  goToPayment() {
    this.router.navigate([`/payment/${this.advocate.user_id}`])
  }
}
