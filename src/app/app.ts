import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Navbar } from './navbar/navbar';
import { ProductList } from "./product-list/product-list";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, Navbar, ProductList],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('my-frist-app');
  count = signal(0);

  increase() {
    this.count.update(value => value + 1)
    console.log('กดแล้วนะ!');
  }

  decrease() {
    this.count.update(value => value - 1)
  }

}
