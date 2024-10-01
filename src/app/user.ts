import { CourseAttemped } from "./course-attemped";
export interface User 
{
    name?:String,
    email?:String,
    password?:String,
    CourseAttempted?:CourseAttemped[], 
}
