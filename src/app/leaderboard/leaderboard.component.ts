import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { QuizserviceService } from '../quizservice.service';
import { Course } from '../course';
import { UserAttempted } from '../user-attempted';
import { DarkmodeService } from '../darkmode.service';

@Component({
  selector: 'app-leaderboard',
  standalone: true,
  imports: [FormsModule,ReactiveFormsModule],
  templateUrl: './leaderboard.component.html',
  styleUrl: './leaderboard.component.scss',
  providers:[QuizserviceService,FormBuilder,DarkmodeService]
})
export class LeaderboardComponent
{
    editIndex=-1
    isEditing=false
    current_course=""
    showAll=true;
    courses:Course[]=[]
    userAttempt:UserAttempted[]=[]
    userForm: FormGroup=new FormGroup({});
    rank=0
    prev=-1;
    constructor(private quizservice:QuizserviceService,private fb:FormBuilder,private db:DarkmodeService){}
    ngOnInit()
    {
        this.courses=this.quizservice.getCourse()
        this.userForm = this.fb.group({
          username: ['', Validators.required],
          email: ['', [Validators.required, Validators.email]],
          score: [null, [Validators.required, Validators.min(0)]],
        });
        if(this.db.isDarkModeEnabled())
          {
              (document.getElementById('toggle-button') as HTMLInputElement).checked=true;
          }
        this.db.initializeTheme();
    }
    handleChange()
    { 
      this.isEditing=false;
        if(this.current_course==="Select All")
        {
            this.showAll=true;
            return;
        }
        this.userAttempt=this.courses.find((e)=>e.title===this.current_course)?.userAttemped!;
        this.userAttempt.sort((a,b)=>b.mark-a.mark)
        this.showAll=false;
    }
    edit(index:number)
    {
        this.isEditing=true
        this.editIndex=index;
        this.userForm.patchValue({
          username:this.userAttempt[index].username,
          email:this.userAttempt[index].email,
          score:this.userAttempt[index].mark
        })
    }
    delete(index:number)
    {
        if(this.isEditing)
        {
          alert("Editing in progress");
          return;
        }
        this.userAttempt.splice(index,1);
        this.quizservice.updateLocalstorage(this.courses)
    }
    handleSubmit()
    {
        this.isEditing=false
        this.userAttempt[this.editIndex].username=this.userForm.value.username;
        this.userAttempt[this.editIndex].email=this.userForm.value.email;
        this.userAttempt[this.editIndex].mark=this.userForm.value.score;
        this.quizservice.updateLocalstorage(this.courses)
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
    checkRank(curr_mark:number)
    {
          if(curr_mark!==this.prev)
          {
            this.prev=curr_mark;
            this.rank++;
          }
    }
    resetRank()
    {
      this.prev=-1
      this.rank=0;
    }
}
