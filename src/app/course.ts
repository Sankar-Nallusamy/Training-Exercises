import { Question } from "./question";
import { UserAttempted } from "./user-attempted";

export interface Course 
{
    title:String,
    Description?:String,
    questions:Question[],
    userAttemped:UserAttempted[]
}
