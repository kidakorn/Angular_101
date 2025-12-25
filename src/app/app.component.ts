import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { ProductListComponent } from "./product-list/product-list.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class App {
  protected readonly title = signal('my-frist-app');
  // count = signal(0);

  // increase() {
  //   this.count.update(value => value + 1)
  //   console.log('กดแล้วนะ!');
  // }

  // decrease() {
  //   this.count.update(value => value - 1)
  // }

}
