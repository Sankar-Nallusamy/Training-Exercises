import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserserviceService } from '../userservice.service';
import { QuizserviceService } from '../quizservice.service';
import { Course } from '../course';
import { CourseAttemped } from '../course-attemped';
import { UserAttempted } from '../user-attempted';

@Component({
  selector: 'app-evaluvate',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './evaluvate.component.html',
  styleUrl: './evaluvate.component.scss',
  providers:[UserserviceService,QuizserviceService]
})
export class EvaluvateComponent 
{
    course=""
    courses:Course[]=[]
    courseAttempted:UserAttempted[]=[]
    totalmark=0;
    constructor(private quizservice:QuizserviceService,private userservice:UserserviceService){}
    ngOnInit()
    {
      this.courses=this.quizservice.getCourse();
    }
    ngDoCheck()
    {
      if(this.courses.find((e)=>e.title===this.course))
      {
          this.courseAttempted=this.courses.find((e)=>e.title===this.course)?.userAttemped|| this.courseAttempted;
      }
    }
    save(index:number)
    {
        document.querySelectorAll(".marks").forEach((e,i)=>{
            if(i===index)
            {
                let x=e as HTMLInputElement;                
                this.totalmark+=parseInt(x.value);
                x.value='';
            }
        })
    }
    saveAll(email:String)
    {
        let users=this.userservice.getUsers()
        let user=users.find((e)=>e.email===email);
        user?.CourseAttempted?.forEach((e)=>
        {
            if(e.title===this.course)
            {
               let x =parseInt(e.mark.toString());
               x+=this.totalmark;
               e.mark=x.toString();
               e.isValid=true;
            }
            console.log(e.mark);
        })
        this.courseAttempted.forEach((e)=>
        {
            if(e.email===email)
            {
               e.mark+=this.totalmark;
               e.eval=[];
            }
        })
        console.log(this.courseAttempted,user?.CourseAttempted);
        this.totalmark=0;
        this.userservice.updateLocalstorage(users)
        this.quizservice.updateLocalstorage(this.courses)
    }
}
