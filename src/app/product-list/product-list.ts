import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-product-list',
  imports: [],
  templateUrl: './product-list.html',
  styleUrl: './product-list.css',
})
export class ProductList {
  products = signal([
    'เมาส์ไร้สาย',
    'คีย์บอร์ด',
    'หน้าจอ monitor',
    'สาย HDMI',
  ]);

  // รับค่า name ที่ส่งมาจากหน้าจอ (ระบุว่าเป็น string)
  addProduct(name: string) {
    if (name === '') return; // ถ้าไม่ได้พิมพ์อะไรมา ไม่ต้องทำต่อ
    // การอัปเดต Array ใน Signal
    // เราเอาของเก่า (...) มารวมกับของใหม่ (name)
    this.products.update(oldItem => [...oldItem, name]);
  }
}
