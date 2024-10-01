// signup.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { User } from '../user';
import { UserserviceService } from '../userservice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  standalone:true,
  styleUrl: './signup.component.scss',
  imports:[FormsModule,ReactiveFormsModule],
  providers:[Router]
})
export class SignupComponent implements OnInit {
  signupForm!: FormGroup;
  users:User[]=[];
  isValiduser=true;
  constructor(private fb: FormBuilder,private userservice:UserserviceService,private router:Router) {}

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, { validator: this.passwordMatchValidator });
    this.users=this.userservice.getUsers();
  }
  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { mismatch: true };
  }

  onSubmit(): void 
  {
    if(this.userservice.isExisting(this.users,this.signupForm.value.email))
    {
        this.isValiduser=false;
        return;
    }
    if (this.signupForm.valid) 
    {
        let user:User={
          name:this.signupForm.value?.fullName,
          email:this.signupForm.value?.email,
          password:this.signupForm.value?.password,
          CourseAttempted:[]
        }
        this.userservice.addUser(this.users,user);
        alert("Signup successfull")
        this.router.navigate(['login'])
    }
  }
}
