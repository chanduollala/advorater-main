import {Component, Inject, OnInit} from '@angular/core';
import {LoginService} from "../../services/login-service/login.service";
import {FormBuilder, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {HttpClient} from "@angular/common/http";
import {LoginConfirmationComponent} from "../login-confirmation/login-confirmation.component";
import {ResetPasswordComponent} from "../reset-password/reset-password.component";
import {SignupComponent} from "../signup/signup.component";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  hide: boolean = true

  ngOnInit(): void {


  }

  login_form = this._formBuilder.group({
    username: ['', Validators.compose([Validators.required, Validators.email])],
    password: ['', Validators.required]
  });

  username = this.login_form.get('username')
  password = this.login_form.get('password')


  constructor(
    public dialogRef: MatDialogRef<LoginComponent>,
    public dialog: MatDialog,
    private loginService: LoginService,
    private _formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private httpClient: HttpClient,
    private formBuilder: FormBuilder,
    private snack: MatSnackBar
  ) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }




  displayConfirmation() {
    this.dialogRef.close();
    const dialogRef = this.dialog.open(LoginConfirmationComponent, {
      width: '450px',
      maxWidth: '100%',
      data: {},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  passwordCheck!: boolean;


  login() {
    let usernameCheck!: boolean;
    console.log("user")
    console.log(usernameCheck)

    if (this.login_form.get('username')?.value == "") {
      this.snackBar.open("Please enter username", "CLOSE");
    }
    if (this.login_form.get('password')?.value == "") {
      this.snackBar.open("Please enter password", "CLOSE");
    }
    if (this.login_form.valid) {
      this.loginService.initiateLogin(this.login_form.get('username')!.value!, this.login_form.get('password')!.value!)
    } else {
      console.log("error")
      this.snackBar.open("Check ");
    }

  }

  forgotPassword() {
    this.snackBar.open("A link has been sent to your email to reset password, please check", "CLOSE");
    this.dialogRef.close();
    const dialogRef = this.dialog.open(ResetPasswordComponent, {
      width: '450px',
      maxWidth: '100%',
      data: {},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

}
