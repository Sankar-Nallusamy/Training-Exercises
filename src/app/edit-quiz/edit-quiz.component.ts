import { Component } from '@angular/core';
import { QuizserviceService } from '../quizservice.service';
import { Course } from '../course';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Question } from '../question';
import { DarkmodeService } from '../darkmode.service';
import { UserserviceService } from '../userservice.service';

@Component({
  selector: 'app-edit-quiz',
  standalone: true,
  imports: [FormsModule,ReactiveFormsModule],
  templateUrl: './edit-quiz.component.html',
  styleUrl: './edit-quiz.component.scss',
  providers:[QuizserviceService,FormBuilder,DarkmodeService,UserserviceService]
})
export class EditQuizComponent 
{
    editIndex=-1
    quiztype=""
    isEditing=false;
    isAdding=false;
    current_course=""
    courses:Course[]=[]
    questions:Question[]=[]
    createQuestionForm: FormGroup=new FormGroup({});
    constructor(private quizservice:QuizserviceService,private fb:FormBuilder,private db:DarkmodeService,private userservice:UserserviceService){}
    ngOnInit()
    {
      this.courses=this.quizservice.getCourse();
        this.createQuestionForm = this.fb.group({
          questionText: ['', Validators.required],
          option1: ['', Validators.required],
          option2: ['', Validators.required],
          option3: ['', Validators.required],
          option4: ['', Validators.required],
          correctAnswer: ['', Validators.required],
          questionMark: [null, [Validators.required, Validators.min(1)]],
        });
        (document.getElementById("body") as HTMLDivElement).setAttribute("data-theme","light")
        if(this.db.isDarkModeEnabled())
          {
              (document.getElementById('toggle-button') as HTMLInputElement).checked=true;
          }
          this.db.initializeTheme();
    }
    ngDoCheck()
    {
      this.questions=this.courses.find((e)=>e.title===this.current_course)?.questions!  
      
    }
    edit(index:number)
    {
        this.isEditing=true;
        this.editIndex=index;
        this.quiztype=this.questions[index].quiztype.toString();
        this.createQuestionForm.patchValue({
          questionText: this.questions[index].question,
          option1: this.questions[index].option1,
          option2: this.questions[index].option2,
          option3:this.questions[index].option3 ,
          option4: this.questions[index].option4,
          correctAnswer: this.questions[index].correct_option,
          questionMark: this.questions[index].mark,
        })
    }
    delete(index:number)
    {
        this.questions.splice(index,1);
        this.quizservice.updateLocalstorage(this.courses)
    }
    deleteCourse()
    {
        let users=this.userservice.getUsers();
        users.forEach((user)=>
        {
          user.CourseAttempted=user.CourseAttempted?.filter((e)=>e.title!==this.current_course)
        })
        this.userservice.updateLocalstorage(users);
        this.courses=this.courses.filter((e)=>e.title!==this.current_course)
        this.quizservice.updateLocalstorage(this.courses);
        alert("Course deleted successfully")
        this.current_course=""
    }
    addQuestion()
    {
      if(!this.current_course)
      {
        alert("Select a course first")
        return;
      }
      this.isAdding=true;
    }
    handleSubmit()
    {
          if(this.isEditing)
          {
              if(this.quiztype==="MCQ")
              {
                let crt_answer=(document.getElementById(this.createQuestionForm.value.correctAnswer!) as HTMLInputElement).value;
                let question:Question={
                  question:this.createQuestionForm?.value.questionText,
                  quiztype:this.quiztype,
                  isValidated:true,
                  option1:this.createQuestionForm?.value.option1,
                  option2:this.createQuestionForm?.value.option2,
                  option3:this.createQuestionForm?.value.option3,
                  option4:this.createQuestionForm?.value.option4,
                  correct_option:crt_answer,
                  mark:this.createQuestionForm?.value.questionMark
                }
                this.questions[this.editIndex]=question;
                this.quizservice.updateLocalstorage(this.courses)
                this.createQuestionForm?.reset();
              }
              else if(this.quiztype==="Descriptive")
              {
                let question:Question={
                  question:this.createQuestionForm?.value.questionText,
                  quiztype:this.quiztype,
                  isValidated:false,
                  mark:this.createQuestionForm?.value.questionMark
                }
                this.questions[this.editIndex]=question;
                this.quizservice.updateLocalstorage(this.courses)
                this.createQuestionForm?.reset();
              }
              else
              {
                let question:Question={
                  question:this.createQuestionForm?.value.questionText,
                  quiztype:this.quiztype,
                  isValidated:true,
                  correct_option:this.createQuestionForm?.value.correctAnswer,
                  mark:this.createQuestionForm?.value.questionMark
                }
                this.questions[this.editIndex]=question;
                this.quizservice.updateLocalstorage(this.courses)
                this.createQuestionForm?.reset();
              }
          }
          else
          {
            if(this.quiztype==="MCQ")
              {
                let question:Question={
                  question:this.createQuestionForm?.value.questionText,
                  quiztype:this.quiztype,
                  isValidated:true,
                  option1:this.createQuestionForm?.value.option1,
                  option2:this.createQuestionForm?.value.option2,
                  option3:this.createQuestionForm?.value.option3,
                  option4:this.createQuestionForm?.value.option4,
                  correct_option:this.createQuestionForm?.value.correctAnswer,
                  mark:this.createQuestionForm?.value.questionMark
                }
                this.questions.push(question)
                this.quizservice.updateLocalstorage(this.courses)
                this.createQuestionForm?.reset();
              }
              else if(this.quiztype==="Descriptive")
              {
                let question:Question={
                  question:this.createQuestionForm?.value.questionText,
                  quiztype:this.quiztype,
                  isValidated:false,
                  mark:this.createQuestionForm?.value.questionMark
                }
                this.questions.push(question)
                this.quizservice.updateLocalstorage(this.courses)
                this.createQuestionForm?.reset();
              }
              else
              {
                let question:Question={
                  question:this.createQuestionForm?.value.questionText,
                  quiztype:this.quiztype,
                  isValidated:true,
                  correct_option:this.createQuestionForm?.value.correctAnswer,
                  mark:this.createQuestionForm?.value.questionMark
                }
                this.questions.push(question)
                this.quizservice.updateLocalstorage(this.courses)
                this.createQuestionForm?.reset();
              }
          }
            this.isAdding=false
          this.isEditing=false
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
    resetForms()
    {
        this.isAdding=false;
        this.isEditing=false;
    }
}
