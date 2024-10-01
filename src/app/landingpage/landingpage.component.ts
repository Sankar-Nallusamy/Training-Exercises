import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { QuizserviceService } from '../quizservice.service';
import { UserserviceService } from '../userservice.service';


@Component({
  selector: 'app-landingpage',
  standalone: true,
  imports: [],
  templateUrl: './landingpage.component.html',
  styleUrl: './landingpage.component.scss',
  providers:[Router,QuizserviceService,UserserviceService]
})
export class LandingpageComponent 
{
  constructor(private route:Router,private quizservice:QuizserviceService,private userservice:UserserviceService){}
    login()
    {
        this.route.navigate(["login"])
    }
    signup()
    {
      this.route.navigate(["signup"]);
    }
    ngOnInit()
    {
        this.quizservice.initateQuiz()
        this.userservice.initiateUSer();
    }
}
