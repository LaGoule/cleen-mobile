import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TodoListComponent } from './@components/todo-list/todo-list.component';
// import { BrowserModule } from '@angular/platform-browser';
import { IonicModule } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { add, list, calendar, ribbon, personCircle, } from 'ionicons/icons';
addIcons({ add, list, calendar, ribbon, personCircle, });

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    TodoListComponent,
    IonicModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Cleen';
}
