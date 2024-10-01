import {RouterModule, Routes } from '@angular/router';
import { LandingpageComponent } from './landingpage/landingpage.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { CreateQuizComponent } from './create-quiz/create-quiz.component';
import { EditQuizComponent } from './edit-quiz/edit-quiz.component';
import { CourseSelectionComponent } from './course-selection/course-selection.component';
import { QuizComponent } from './quiz/quiz.component';
import { QuizsummaryComponent } from './quizsummary/quizsummary.component';
import { LeaderboardComponent } from './leaderboard/leaderboard.component';
import { authGuard } from './auth.guard';
import { EvaluvateComponent } from './evaluvate/evaluvate.component';

export const routes: Routes = [
    { path: '', redirectTo: 'landing-page', pathMatch: 'full' },
    {path:"landing-page",component:LandingpageComponent},
    {path:"login",component:LoginComponent},
    {path:"signup",component:SignupComponent},
    {path:'admin',component:AdminDashboardComponent,canActivate:[authGuard]},
    {path:'admin/createquiz',component:CreateQuizComponent,canActivate:[authGuard]},
    {path:'admin/editquiz',component:EditQuizComponent,canActivate:[authGuard]},
    {path:'course-selection',component:CourseSelectionComponent},
    {path:'quiz',component:QuizComponent},
    {path:'quiz-summary',component:QuizsummaryComponent},
    {path:'admin/leaderboard',component:LeaderboardComponent,canActivate:[authGuard]},
    {path:'admin/evaluate',component:EvaluvateComponent,canActivate:[authGuard]},
];
