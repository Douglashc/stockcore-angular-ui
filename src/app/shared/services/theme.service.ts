import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  private readonly themeKey = 'stockcore-theme';
  private isDark: boolean = true;

  constructor() {
    this.initTheme();
  }

  private initTheme(): void {

    const savedTheme = localStorage.getItem(this.themeKey);
    
    if (savedTheme) {
      this.isDark = savedTheme === 'dark';
    } else {
      localStorage.setItem(this.themeKey, 'dark');
    }

    this.applyTheme();
  }

  get currentTheme(): boolean {
    return this.isDark;
  }

  toggleTheme(): void {
    this.isDark = !this.isDark;
    localStorage.setItem(this.themeKey, this.isDark ? 'dark' : 'light');
    this.applyTheme();
  }

  private applyTheme(): void {
    const htmlElement = document.documentElement;
    if (this.isDark) {
      htmlElement.classList.add('dark');
    } else {
      htmlElement.classList.remove('dark');
    }
  }
}