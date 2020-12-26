import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { AppHttpService } from 'src/app/_services/app-http.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  constructor(private _http: AppHttpService) {
    this.registerForm = new FormGroup({
      action: new FormControl('iblahSignUp', Validators.required),
      email: new FormControl('', Validators.required),
      name: new FormControl('', Validators.required),
      fname: new FormControl('', Validators.required),
      lname: new FormControl('', Validators.required),
      password: new FormControl('', [Validators.required]),
      cpassword: new FormControl('', Validators.required),
      contact: new FormControl('', Validators.required),
      prefix: new FormControl('', Validators.required),
      phone: new FormControl('', Validators.required),
      dob: new FormControl('', Validators.required),
      gender: new FormControl('', Validators.required),
      address: new FormControl('')
    });
  }

  rf(name: string): FormControl { return this.registerForm.controls[name] as FormControl }

  nameValueChange() {
    this.rf('name').setValue(this.rf('fname').value + " " + this.rf('lname').value);
  }

  contactValueChange() {
    this.rf('contact').setValue(this.rf('prefix').value + " " + this.rf('phone').value);
  }

  register() {
    console.log(this.rf('password').value, this.rf('cpassword').value)
    if (this.registerForm.valid) {
      this._http.request('userapi.php', this.registerForm.value).subscribe((response) => {
        console.log(response);
      })
    } else if (this.rf('password').value !== this.rf('cpassword').value) {
      console.log("Password not match")
    } else {
      console.log(this.registerForm)
    }
  }

  ngOnInit() {
  }

}
