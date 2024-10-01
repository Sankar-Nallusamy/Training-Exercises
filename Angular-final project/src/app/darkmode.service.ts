// theme.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DarkmodeService 
{
  private darkModeKey = 'dark-mode-enabled';

  constructor() {}

  setDarkMode(enabled: boolean): void {
    if (enabled) {
      document.getElementById("body")?.setAttribute("data-theme","dark");
      localStorage.setItem(this.darkModeKey, 'true');
    } else {
      document.getElementById("body")?.setAttribute("data-theme","light");
      localStorage.setItem(this.darkModeKey, 'false');
    }
  }

  isDarkModeEnabled(): boolean {
    return localStorage.getItem(this.darkModeKey) === 'true';
  }

  initializeTheme(): void {
    const isDarkMode = this.isDarkModeEnabled();

    this.setDarkMode(isDarkMode)
  }
}
