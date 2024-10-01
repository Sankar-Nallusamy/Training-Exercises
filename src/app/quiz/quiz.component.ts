import { ChangeDetectorRef, Component } from '@angular/core';
import { Question } from '../question';
import { QuizserviceService } from '../quizservice.service';
import { Route, Router } from '@angular/router';
import { DarkmodeService } from '../darkmode.service';
import { FormsModule } from '@angular/forms';
import { QuestionAttempted, UserAttempted } from '../user-attempted';
import { UserserviceService } from '../userservice.service';

@Component({
  selector: 'app-quiz',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './quiz.component.html',
  styleUrl: './quiz.component.scss',
  providers:[QuizserviceService,Router,DarkmodeService,UserserviceService]
})
export class QuizComponent 
{
    once=0
    index=0;
    isValid=true;
    mark:number[]=[]
    eval:QuestionAttempted[]=[]
    set=new Set();
    list:number[]=[]
    options:string[]=[];
    current_option=""
    current_course=localStorage.getItem("current-course")!;
    current_user=localStorage.getItem("current-user")!;
    questions:Question[]=[]
    time=0
    interval:any;
    constructor(private quizservice:QuizserviceService,private route:Router,private db:DarkmodeService,private cd:ChangeDetectorRef,private userservice:UserserviceService){
    }
    ngOnInit()
    {
        this.questions=this.quizservice.findCourse(this.current_course)?.questions!;
        if(this.db.isDarkModeEnabled())
          {
              (document.getElementById('toggle-button') as HTMLInputElement).checked=true;
          }
        this.db.initializeTheme();
        this.time=this.questions.length*30
        this.startTimer()
        while(this.set.size<this.questions.length)
        {
            let rand=Math.floor(Math.random()*this.questions.length);
            if(!this.set.has(rand))
            {
              this.set.add(rand)
              this.list.push(rand)
            }
        }
        for(let i=0;i<this.questions.length;i++)
        {
            this.options.push("");
            this.mark.push(0);
        }
        localStorage.setItem("randlist",JSON.stringify(this.list));
        
    }
    marking(index:number)
    {
        this.mark[index]=1;
    }
    clicked(val:any)
    {
        this.current_option=val;
    }
    nextQuiz()
    {
      if(this.current_option)
      this.options[this.index]=this.current_option;
      if(this.index+1>=this.questions.length)
      {
        this.save()
      }
      this.index++;
      this.progressbar()
      this.current_option=""
      this.once=0;
    }
    prevQuiz()
    {
      if(this.index<=0)
      {
        return;
      }
      else
      {
        this.index--;
      }
      this.progressbar()
      this.current_option=""
      this.once=0
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

  startTimer() {
    this.interval = setInterval(() => {
      if (this.time > 0) {
        this.time--;
      } else {
        window.alert("Times up");
        this.save()
      }
    }, 1000);
  }
  progressbar()
  {
      (document.getElementById("progress-bar") as HTMLDivElement).style.width=((this.index/this.questions.length)*100+"%")
  }
  ngDoCheck()
  {
    console.log(this.options);
    
      if(this.questions[this.list[this.index]].quiztype==="Descriptive")
      {
          let x=(document.getElementById("h") as HTMLTextAreaElement)
          if(x)
          {
              if(this.options[this.index]&&this.once<=0)
              {
                this.once++;
                x.value=this.options[this.index];
              }
          }
      }
      else
      {
          document.querySelectorAll(".options").forEach((e)=>
          {
              let x =e as HTMLButtonElement;
              if(x.innerHTML.substring(2)===this.options[this.index]&&this.once<=0)
              {
                  this.once++;
                  console.log("Here");
                  x.focus()
              }
          })
      }
        console.log("Here");
        document.querySelectorAll(".numbers").forEach((e)=>
        {
           let x=e as HTMLSpanElement;
           let i=parseInt(x.innerHTML)-1;
           if(this.options[i])
            x.style.background="green"
           else if(this.mark[i]===1)
           {
              x.style.background="yellow"
           }
          else
           x.style.background="red" 
        });
  }
  check()
  {
    this.current_option=(document.getElementById("h") as HTMLTextAreaElement).value;
  }
  moveTo(i:number)
  {
    this.index=i;
    this.current_option=""
    this.once=0
  }
  save()
  {
    clearInterval(this.interval)
    localStorage.setItem("options",JSON.stringify(this.options));
    let total=0;
    for(let i=0;i<this.questions.length;i++)
    {
      if(this.questions[i].quiztype==="Descriptive")
      {
        let q:QuestionAttempted={
          title:this.questions[i].question,
          option:this.options[this.list.indexOf(i)],
          mark:parseInt(this.questions[i].mark.toString())
        }
        this.eval.push(q);
        this.isValid=false;
      }
      else
      {
          if(this.questions[i].correct_option===this.options[this.list.indexOf(i)])
          {
            total+=parseInt(this.questions[i].mark.toString());
          }
      }
    }
    let x:UserAttempted={
      username:this.current_user,
      email:this.current_user,
      mark:total,
      eval:this.eval,
      date:new Date().toLocaleString()
    }
    let courses=this.quizservice.getCourse();
    let course=courses.find((e)=>e.title===this.current_course)
    course!.userAttemped=course!.userAttemped.filter((e)=>e.email!==this.current_user);
    course?.userAttemped.push(x);
    this.quizservice.updateLocalstorage(courses);
    let users=this.userservice.getUsers()
    let user=users.find((e)=>e.email===this.current_user);
    user!.CourseAttempted=user?.CourseAttempted?.filter((e)=>e.title!==this.current_course)
    user?.CourseAttempted?.push({title:this.current_course,mark:total.toString(),isValid:this.isValid})
    this.userservice.updateLocalstorage(users);
    this.route.navigate(['course-selection']);
  }
}
