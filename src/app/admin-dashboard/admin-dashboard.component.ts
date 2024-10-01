import { Component } from '@angular/core';
import { DarkmodeService } from '../darkmode.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.scss',
  providers:[DarkmodeService,Router]
})
export class AdminDashboardComponent 
{
    isDarkMode=false;
    constructor(private themeService:DarkmodeService,private route:Router){}
    ngOnInit(): void {
      this.isDarkMode = this.themeService.isDarkModeEnabled();
      this.themeService.initializeTheme();
    }
  
    toggleDarkMode(): void {
      this.isDarkMode = !this.isDarkMode;
      this.themeService.setDarkMode(this.isDarkMode);
      console.log("Im here")
    }
    go()
    {
        this.route.navigate(['admin/evaluate'])
    }
}
