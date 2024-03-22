import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  public darkMode: boolean = false;

  constructor() { }

  toggleDarkMode() {
    this.darkMode = !this.darkMode;
    console.log('Dark mode: ', this.darkMode);

    if (this.darkMode) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }

}
