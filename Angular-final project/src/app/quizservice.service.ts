import { Injectable } from '@angular/core';
import { Course } from './course';

@Injectable({
  providedIn: 'root'
})
export class QuizserviceService 
{

  constructor() { }

  initateQuiz()
  {
    if(localStorage.getItem("Quiz"))
      return
      localStorage.setItem("Quiz","[]");
  }
  isExisting(name:String)
  {
      const Quiz:Course[]=JSON.parse(localStorage.getItem("Quiz") || "[]");
      return Quiz.find((course)=>course.title===name) ? true:false;
  }
  addCourse(Quiz:Course[],course:Course)
  {
      Quiz.push(course)
      localStorage.setItem("Quiz",JSON.stringify(Quiz));
  }
  getCourse():Course[]
  {
    if(localStorage.getItem("Quiz"))
      return JSON.parse(localStorage.getItem("Quiz")||"[]");
    else
      return []
  }
  findCourse(name:String)
  {
    const Quiz:Course[]=JSON.parse(localStorage.getItem("Quiz") || "[]");
    return Quiz.find(e=>e.title===name);
  }
  updateLocalstorage(Quiz:Course[])
  {
    localStorage.setItem("Quiz",JSON.stringify(Quiz));
  }
}
