export interface QuestionAttempted
{
    title:String,
    option:String,
    mark:number,
}
export interface UserAttempted 
{
    username:String,
    email:String,
    mark:number,
    date:String,
    eval?:QuestionAttempted[],
}
