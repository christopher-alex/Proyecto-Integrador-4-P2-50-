import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';
import { AuthTokenDecoder } from '../auth-token-decoder';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  hide = true;
  rotate = 'start';
  formGroup: FormGroup;

  constructor(
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder,
    private authTokenDecoder: AuthTokenDecoder
  ) {
    this.initForm();
  }

  initForm() {
    this.formGroup = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      terms_and_conditions: [null, [Validators.required]],
    });
  }

  ngOnInit(): void {}

  login(): void {
    if (this.formGroup.valid) {
      this.authService
        .login(this.formGroup.value.email, this.formGroup.value.password)
        .subscribe((res: any) => {
          if (res.status === 'success') {
            const user = this.authTokenDecoder.decodeToken(res.data.token).user;
            console.log(res);
            if (user.role === 'provider') {
              this.router.navigate(['/layout']);
            } else {
              this.router.navigate(['/cine']);
            }
          }
        });
    }
  }
}
