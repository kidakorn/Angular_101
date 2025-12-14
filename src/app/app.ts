import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
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

  products = signal([
    'เมาส์ไร้สาย',
    'คีย์บอร์ด',
    'หน้าจอ monitor',
    'สาย HDMI',
  ]);

  // รับค่า name ที่ส่งมาจากหน้าจอ (ระบุว่าเป็น string)
  addProduct(name: string){
    if (name === '') return; // ถ้าไม่ได้พิมพ์อะไรมา ไม่ต้องทำต่อ
    // การอัปเดต Array ใน Signal
    // เราเอาของเก่า (...) มารวมกับของใหม่ (name)
    this.products.update(oldItem => [...oldItem, name]);
  }

}
