import { Component, OnInit } from '@angular/core';
import {Advocate, Customer} from "../../models/advocate";
import {ProfileService} from "../../services/profile_sevice/profile.service";
import {ActivatedRoute, Router} from "@angular/router";
import {AdvocateService} from "../../services/advocate-service/advocate.service";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {LoginService} from "../../services/login-service/login.service";

@Component({
  selector: 'app-view-advocate',
  templateUrl: './view-advocate.component.html',
  styleUrls: ['./view-advocate.component.css']
})
export class ViewAdvocateComponent implements OnInit {

  public advocate!: Advocate;
  id

  current_year = new Date().getFullYear()

  customer!: Customer

  private interaction_types: any= {
    1: 'Appointment Request',
    2: 'Consultation',
    3: 'Feedback'
  };

  constructor(private advocateService: AdvocateService,private profileService:ProfileService, private router: Router, private activatedRoute: ActivatedRoute,
              private formBuilder: FormBuilder, private loginService: LoginService) {
    this.id=this.activatedRoute.snapshot.paramMap.get("id");
    console.log(this.id)

    this.advocateService.getAdvocateDetail(Number.parseInt(this.id!)).subscribe(
      (response)=>{
        console.log(response)
        if (response.id != null)
          this.advocate = new Advocate(response);
          this.contact_form.get('advocate_id')?.setValue(this.advocate.id!)
        console.log(this.advocate)
      }
    )

    this.email!.valueChanges.subscribe((value)=>{
      this.username?.setValue(value)
    })


    if(this.loginStatus){
      this.profileService.loadCustomer(Number.parseInt(sessionStorage.getItem('user_id')!)).subscribe(
        (response)=>{
          this.advocateService.getInteractions(Number.parseInt(this.id!), Number.parseInt(sessionStorage.getItem('user_id')!)).subscribe(
            (response)=>{
              if (response?.length>0) {
                for (let i = 0; i < response.length; i++) {
                  this.advocate.interactions.push({
                    id: response[i]?.id,
                    advocate_id: response[i]?.advocate_id,
                    user_id: response[i]?.user_id,
                    message: response[i]?.message,
                    interaction_type: this.interaction_types[response[i]?.interaction_type],
                    updated_at: new Date(response[i]?.updated_at).toString()
                  })
                }
              }
            }
          )
          console.log(response)
          this.customer = new Customer(response)

          this.username?.setValue(this.customer.username!)
          this.phone?.setValue(this.customer.phone1!)
          this.email?.setValue(this.customer.username!)
          this.name?.setValue(this.customer.name!)

          this.user_attributes.disable()
        }
      )
    }

  }

  ngOnInit(): void {
  }

  user_attributes = this.formBuilder.group({
    username: [''],
    password_digest: ['12345678'],
    user_type: ['C'],
    user_detail_attributes: this.formBuilder.group({
      name_attributes: this.formBuilder.group({
        first_name: ['']
      }),
      contact_detail_attributes: this.formBuilder.group({
        phone1: [''],
        contact_email: ['']
      })
    })
  })


  contact_form = this.formBuilder.group({
    advocate_id: [0],
    message: [''],
    interaction_type: [1]
  })


  username = this.user_attributes.get('username')
  password = this.user_attributes.get('password_digest')
  name = this.user_attributes.get('user_detail_attributes')?.get('name_attributes')?.get('first_name')
  phone = this.user_attributes.get('user_detail_attributes')?.get('contact_detail_attributes')?.get('phone1')
  email = this.user_attributes.get('user_detail_attributes')?.get('contact_detail_attributes')?.get('contact_email')

  interaction_type = this.contact_form.get('interaction_type')
  message = this.contact_form.get('message')





  get contact_form1 (): FormGroup{
    return this.contact_form as FormGroup
  }


  get loginStatus():boolean{
    return (sessionStorage.getItem('login_status') == 'Yes')
  }


  setUser(){
    if (this.loginStatus){
      console.log('user_id')
      this.contact_form1.addControl('user_id', new FormControl(Number.parseInt(sessionStorage.getItem('user_id')!)))
    }
    else{
      console.log('user')
      this.contact_form1.addControl('user_attributes', this.user_attributes)
    }

    console.log(this.contact_form.value)
  }


  submit(){
    this.setUser()
    this.advocateService.newInteraction(this.contact_form.value).subscribe((response)=>{
      console.log(response)
      alert('Message sent successfully')
      if(!this.loginStatus)
        console.log(this.username?.value!, this.password?.value!)
        this.loginService.initiateLogin(this.username?.value!, this.password?.value!)

      window.location.reload()
    })
  }





}
