import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });
  constructor(private route: ActivatedRoute,
    private router: Router, private fb: FormBuilder, public messageService: MessageService, private authService: AuthService) { }

  login() {
    console.log(this.loginForm.value);
    this.authService.login(this.loginForm.value);

  }
  register() {
  }  
}
