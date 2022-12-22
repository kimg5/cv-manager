import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthService } from '../service/auth.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  registerForm = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
    email: ['', Validators.required],
    card: ['', Validators.required]
  });
  constructor(private route: ActivatedRoute,
    private router: Router, private fb: FormBuilder, public messageService: MessageService, private authService: AuthService) { 
  }

  register() {
    this.authService.register(this.registerForm.value).subscribe(resp =>{
      this.messageService.add({severity:'info', summary:'Service Message', detail:resp.message});
      if(resp.success){
        this.router.navigate(['/login']);
      }
    });

  }
  cancel() {
    this.router.navigate(['/register']);
  }  
}
