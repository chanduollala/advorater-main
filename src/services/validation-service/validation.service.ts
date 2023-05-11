import {Injectable} from '@angular/core';
import {ValidatorFn, AbstractControl} from '@angular/forms';
import {FormGroup} from '@angular/forms';

@Injectable({
    providedIn: 'root'
})
export class ValidationService {

    constructor() {
    }

    patternValidator(): ValidatorFn {
        // @ts-ignore
        return (control: AbstractControl): { [key: string]: any } => {
            if (!control.value) {
                // @ts-ignore
                return null;
            }
            const regex = new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$');
            //any one uppercase, one lowercase, one digit, atleast 8 chars
            const valid = regex.test(control.value);
            // @ts-ignore
            return valid ? null : {invalidPassword: true};
        };
    }

    /*

    MatchPassword(password: string, confirmPassword: string) {
      return (formGroup: FormGroup) => {
        const passwordControl = formGroup.controls[password];
        const confirmPasswordControl = formGroup.controls[confirmPassword];

        if (!passwordControl || !confirmPasswordControl) {
          return null;
        }

        if (confirmPasswordControl.errors && !confirmPasswordControl.errors.passwordMismatch) {
          return null;
        }

        if (passwordControl.value !== confirmPasswordControl.value) {
          confirmPasswordControl.setErrors({ passwordMismatch: true });
        } else {
          confirmPasswordControl.setErrors(null);
        }
      }
    }



    userNameValidator(userControl: AbstractControl) {
      return new Promise(resolve => {
        setTimeout(() => {
          if (this.validateUserName(userControl.value)) {
            resolve({ userNameNotAvailable: true });
          } else {
            resolve(null);
          }
        }, 1000);
      });
    }


    validateUserName(userName: string) {
      const UserList = ['ankit', 'admin', 'user', 'superuser'];
      return (UserList.indexOf(userName) > -1);
    }
     */
}

