import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { QuizserviceService } from '../quizservice.service';
import { Course } from '../course';
import { Question } from '../question';
import { Router } from '@angular/router';
import { DarkmodeService } from '../darkmode.service';
@Component({
  selector: 'app-create-quiz',
  standalone: true,
  imports: [FormsModule,ReactiveFormsModule],
  templateUrl: './create-quiz.component.html',
  styleUrl: './create-quiz.component.scss',
  providers:[QuizserviceService,Router,DarkmodeService]
})
export class CreateQuizComponent 
{
  quiztype=""
  constructor(private quizservice:QuizserviceService,private router:Router,private db:DarkmodeService){}
  questions:Question[]=[];
  Quiz:Course[]=[]
  quizTitle='';
  description=''
  isSaving=false;
  isCreating=false;
  createForm=new FormGroup({
    title:new FormControl('',[Validators.required]),
    option1:new FormControl('',[Validators.required]),
    option2:new FormControl('',[Validators.required]),
    option3:new FormControl('',[Validators.required]),
    option4:new FormControl('',[Validators.required]),
    correct_answer:new FormControl('',[Validators.required]),
    mark:new FormControl('',[Validators.required])
  });
  ngOnInit()
  {
    if(this.db.isDarkModeEnabled())
      {
          (document.getElementById('toggle-button') as HTMLInputElement).checked=true;
      }
      this.db.initializeTheme();
    this.Quiz=this.quizservice.getCourse();
    console.log(this.Quiz)
  }
  createQuiz()
  {
      if(this.quizTitle &&!this.quizservice.isExisting(this.quizTitle))
      {
        this.isCreating=true;
        this.isSaving=true;
        (document.getElementById("error") as HTMLParagraphElement).style.display="none";
      }
      else
      {
          (document.getElementById("error") as HTMLParagraphElement).style.display="block";
      }
  }
  saveQuiz()
  {
      let course:Course={
        title:this.quizTitle,
        Description:this.description,
        questions:this.questions,
        userAttemped:[]
      }
      this.isCreating=false;
      this.isSaving=false
      this.quizservice.addCourse(this.Quiz,course)
      this.router.navigate(['admin'])
  }
  saveQuestion()
  {
    console.log("In here")
    if(this.quiztype==="MCQ")
    {
        let crt_answer=(document.getElementById(this.createForm.value.correct_answer!) as HTMLInputElement).value;
        let question:Question={
          question:this.createForm.value.title!,
          isValidated:true,
          quiztype:this.quiztype,
          mark:this.createForm.value.mark!,
          correct_option:crt_answer,
          option1:this.createForm.value.option1!,
          option2:this.createForm.value.option2!,
          option3:this.createForm.value.option3!,
          option4:this.createForm.value.option4!
        }
        this.questions.push(question);
    }
    else if(this.quiztype=="Descriptive")
    {
          let question:Question={
            question:this.createForm.value.title!,
            isValidated:false,
            quiztype:this.quiztype,
            mark:this.createForm.value.mark!,
          }
          this.questions.push(question);
    }
    else
    {
      let question:Question={
        question:this.createForm.value.title!,
        isValidated:true,
        quiztype:this.quiztype,
        mark:this.createForm.value.mark!,
        correct_option:this.createForm.value.correct_answer!
      }
      this.questions.push(question);
    }
      this.createForm.reset()
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
}
