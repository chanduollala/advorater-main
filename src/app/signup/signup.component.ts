import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {SignupService} from "../../services/signup-service/signup.service";
import {LoginComponent} from "../login/login.component";
import {EmailsenderService} from "../../services/Email-service/emailsender.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {LoginConfirmationComponent} from "../login-confirmation/login-confirmation.component";
import {LoginService} from "../../services/login-service/login.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  mode: string = ""

  private otp!: string;
  private enteredotp!: string;
  otpSent: boolean = false;


  customer = this.formBuilder.group({
    username: ["", [Validators.email, Validators.required]],
    password_digest: ["", [Validators.compose([Validators.required, Validators.pattern("(?=.*[A-Za-z])(?=.*\\d)[@$%^&*#@!A-Za-z\\d]{8,}")])]],
    user_type: 'C',
    user_detail_attributes: this.formBuilder.group({
        name_attributes: this.formBuilder.group({
          first_name: ["", [Validators.compose([Validators.minLength(3), Validators.required])]],
        }),
        contact_detail_attributes: this.formBuilder.group({
          phone1: ["", [Validators.pattern("^[0-9]{10}$")]],
          contact_email: ""
        })
      }
    )
  })

  advocate = this.formBuilder.group({
    user_attributes: this.formBuilder.group({
      username: ["", [Validators.email, Validators.required]],
      password_digest: ["", [Validators.compose([Validators.required, Validators.pattern("(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}")])]],
      user_type: 'A',
      user_detail_attributes: this.formBuilder.group({
          contact_detail_attributes: this.formBuilder.group({
            contact_email: ''
          })
        }
      )
    })
  })

  c_name = this.customer.get("user_detail_attributes")!.get("name_attributes")!.get("first_name")
  c_username = this.customer.get("username")
  c_password = this.customer.get("password_digest")
  c_phone = this.customer.get("user_detail_attributes")!.get("contact_detail_attributes")!.get("phone1")
  c_contact_email = this.customer.get("user_detail_attributes")!.get("contact_detail_attributes")!.get("contact_email")


  a_username = this.advocate.get("user_attributes")!.get("username")
  a_password = this.advocate.get("user_attributes")!.get("password_digest")
  a_contact_email = this.advocate.get("user_attributes")!.get("user_detail_attributes")!.get("contact_detail_attributes")!.get("contact_email")

  ngOnInit(): void {
    this.c_username?.valueChanges.subscribe((value) => {
      this.c_contact_email?.setValue(value)
    })

    this.a_username?.valueChanges.subscribe((value) => {
      this.a_contact_email?.setValue(value)
    })
  }


  constructor(
    public dialogRef: MatDialogRef<SignupComponent>,
    public dialog: MatDialog,
    private signupService: SignupService,
    private emailService: EmailsenderService,
    private formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,
    private loginService: LoginService,
    private router: Router
  ) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  submit() {

  }

  customerSubmit() {
    console.log(this.customer.value)
    console.log(this.c_username!.valid)
    console.log(this.c_password!.valid)
    console.log(this.c_phone!.valid)
    console.log(this.c_name!.valid)

    console.log(this.otp)

    if (this.otp == this.enteredotp && this.customer.valid) {
      // @ts-ignore
      this.signupService.newCustomer(this.customer!.value!).subscribe(
        async response => {
          console.log(response)
          if (response.id != null) {
            await this.router.navigate(['/home']).then(async ()=>{
                // @ts-ignore
              await this.loginService.initiateLogin(this.c_username?.value!, this.c_password?.value!).then(()=>{
                this.displayConfirmation()
              })
              }
            )
              // @ts-ignore
          } else {
            console.log(response.error);
          }
        },
        error => {
          console.log("error while signing up user");
        }
      );
    } else {
      this._snackBar.open("Incorrect OTP")
    }

  }

  advocateSubmit() {
    console.log(this.advocate.value)
    if (this.otp == this.enteredotp && this.advocate.valid) {
      this.signupService.newAdvocateStep1(this.advocate.value).subscribe(
        async response => {
          console.log(response)
          if (response.id != null) {
            this._snackBar.open('Account created successfully','',{
              duration: 3000
            });
            this.router.navigate([`/adv_create/${response.id}`]).then(() => {
              // @ts-ignore
              this.loginService.initiateLogin(this.a_username?.value!, this.a_password?.value!).then(()=>{

              })
            })

          } else
            console.log(response.error)
        }
      );
    }
  }

  gotoLogin() {
    this.router.navigate(['/home']).then(r => {
      const dialogRef = this.dialog.open(LoginComponent, {
        width: '450px',
        data: {},
      });

      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
      });
    })


  }

  displayConfirmation() {
    const dialogRef = this.dialog.open(LoginConfirmationComponent, {
      width: '450px',
      height: '200px',
      data: {},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  sendOTP(email: string, user: any) {
    if (user.valid) {
      this.otp = (Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000).toString();
      console.log(this.otp)
      if (email) {
        this.emailService.verifyEmail(email, this.otp)
      }
      this.otpSent = true
    }
  }

  onOtpChange($event: string) {
    this.enteredotp = $event
  }

  clear() {
    this.customer.reset()
    this.advocate.reset()
  }

}
