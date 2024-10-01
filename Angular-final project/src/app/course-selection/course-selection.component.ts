import { Component } from '@angular/core';
import { QuizserviceService } from '../quizservice.service';
import { UserserviceService } from '../userservice.service';
import { Router } from '@angular/router';
import { User } from '../user';
import { Course } from '../course';
import { DarkmodeService } from '../darkmode.service';

@Component({
  selector: 'app-course-selection',
  standalone: true,
  imports: [],
  templateUrl: './course-selection.component.html',
  styleUrl: './course-selection.component.scss',
  providers:[QuizserviceService,UserserviceService,Router,DarkmodeService]
})
export class CourseSelectionComponent 
{
    user:User={}
    courses:Course[]=[]
    current_user=""
    recentQuiz=this.user?.CourseAttempted || []
    constructor(private quizservice:QuizserviceService,private userservice:UserserviceService,private route:Router,private db:DarkmodeService){}

    ngOnInit()
    {
        this.user=this.userservice.findUser(this.userservice.getUsers(),localStorage.getItem("current-user")!)!
        this.courses=this.quizservice.getCourse();
        this.recentQuiz=this.user?.CourseAttempted || [];
        if(this.db.isDarkModeEnabled())
        {
            (document.getElementById('toggle-button') as HTMLInputElement).checked=true;
        }
        this.db.initializeTheme();
        this.current_user=localStorage.getItem("current-user")||"";
    }
    ngDoCheck()
    {
        console.log("here");
        
        document.querySelectorAll(".h").forEach((e)=>{
            let x=e as HTMLButtonElement;
            console.log(x.disabled);
            
            if(x.disabled)
            {
                x.style.background="red";
            }
        })  
    }
    toogleMode()
    {
        if((document.getElementById('toggle-button') as HTMLInputElement).checked)
        {
            localStorage.setItem("dark-mode-enabled","true")
            this.db.initializeTheme();
        }
        else
        {
            localStorage.setItem("dark-mode-enabled","false")
            this.db.initializeTheme();
        }
    }
    startQuiz(course_name:String)
    {
        localStorage.setItem("current-course",course_name.toString());
        this.route.navigate(['quiz'])
    }
    go(title:String)
    {
        console.log(title);
        
        let x=this.courses.find((e)=>e.title===title)
        console.log(this.current_user);
        
        let y=x?.userAttemped.find((e)=>e.email===this.current_user)
        if(y!.eval!.length>0)
        {
            alert("Your results are being evaluated");
            return;
        }
        localStorage.setItem("current-course",title.toString())
        this.route.navigate(["quiz-summary"])
    }
}
