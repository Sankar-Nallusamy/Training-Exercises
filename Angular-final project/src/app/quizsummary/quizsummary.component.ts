import { ChangeDetectorRef, Component } from '@angular/core';
import { UserserviceService } from '../userservice.service';
import { QuizserviceService } from '../quizservice.service';
import { UserAttempted } from '../user-attempted';
import { DarkmodeService } from '../darkmode.service';

@Component({
  selector: 'app-quizsummary',
  standalone: true,
  imports: [],
  templateUrl: './quizsummary.component.html',
  styleUrl: './quizsummary.component.scss',
  providers:[UserserviceService,QuizserviceService,DarkmodeService]
})
export class QuizsummaryComponent 
{
    current_course=localStorage.getItem("current-course")||""
    current_user=localStorage.getItem("current-user")
    constructor(private userservice:UserserviceService,private quizservice:QuizserviceService,private db:DarkmodeService,private cdr: ChangeDetectorRef){}
    user_mark=0
    total_mark=0
    leaderboard:UserAttempted[]=[]
    prev=-1
    rank=0  
    list:number[]=[];
    ngOnInit()
    {
       let questions=this.quizservice.findCourse(this.current_course?.toString())?.questions!
       let index=0;
       for(let i of questions)
       {
          this.total_mark+=parseInt(i.mark.toString());
          index++;
       }
      this.leaderboard=this.quizservice.findCourse(this.current_course)?.userAttemped || []
      this.leaderboard.forEach((e)=>{
        if(e.email===this.current_user)
          this.user_mark=e.mark;
      })
      this.leaderboard.sort((a,b)=>b.mark-a.mark)
      if(this.db.isDarkModeEnabled())
        {
            (document.getElementById('toggle-button') as HTMLInputElement).checked=true;
        }
      this.db.initializeTheme();
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
    checkRank(curr_mark:number):number
    {
          this.cdr.detach()
          if(curr_mark!==this.prev)
          {
            this.prev=curr_mark;
            this.rank++;
          }
          return this.rank;
    }
  
}
