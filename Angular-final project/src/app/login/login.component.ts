import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserserviceService } from '../userservice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true, 
  imports: [CommonModule, ReactiveFormsModule], 
  providers:[UserserviceService,Router]
})
export class LoginComponent {
  loginForm: FormGroup;
  isValid=true
  constructor(private fb: FormBuilder,private userservice:UserserviceService,private router:Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
    localStorage.setItem("isAdmin","false")
  }

  onSubmit() 
  {
    if (this.loginForm.invalid) 
    {
        this.isValid=false;
        return
    }
    if(this.loginForm.value.email==="admin@gmail.com"&&this.loginForm.value.password==="123456")
    {
        localStorage.setItem("isAdmin","true")
        this.router.navigate(["admin"])
    }
    if(!this.userservice.findUser(this.userservice.getUsers(),this.loginForm.value.email))
    {
      this.isValid=false;
      return
    }
    let user=this.userservice.findUser(this.userservice.getUsers(),this.loginForm.value.email)
    if(user!.password!==this.loginForm.value.password)
    {
      this.isValid=false;
    }
    localStorage.setItem("current-user",this.loginForm.value.email)
      this.router.navigate(["course-selection"])
  }
}
