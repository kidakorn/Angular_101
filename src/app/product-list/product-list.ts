import { Component, signal, computed } from '@angular/core';
import { Product } from '../product.model';

@Component({
  selector: 'app-product-list',
  imports: [],
  templateUrl: './product-list.html',
  styleUrl: './product-list.css',
})
export class ProductList {
  products = signal<Product[]>([
    { id: 1, name: 'เมาส์ไร้สาย', price: 590, inStock: true },
    { id: 2, name: 'คีย์บอร์ด', price: 1200, inStock: true },
    { id: 3, name: 'หน้าจอ monitor', price: 4500, inStock: false },
    { id: 4, name: 'สาย HDMI', price: 290, inStock: true },
  ]);
  
  addProduct(name: string) {
    if (name === '') return;
    // 1. สร้าง Object สินค้าชิ้นใหม่ (เสกข้อมูลที่ขาดไป)
    const newProduct: Product = {
      id: Date.now(), // ใช้เวลาปัจจุบันเป็น ID (จะได้ไม่ซ้ำกัน)
      name: name, // ชื่อที่รับมาจากหน้าจอ
      price: Math.floor(Math.random() * 1000) + 100, // สุ่มราคาเล่นๆ 100-1000 บาท
      inStock: true // ของมาใหม่ ต้องมีของแน่นอน
    };
    this.products.update(oldItem => [...oldItem, newProduct]);
  }

  // รับ ID เข้ามา (รู้ว่าเป็น number เพราะ id เราเป็นตัวเลข)
  removeProduct(idToRemove: number) {
    // สั่ง update ค่าใน signal
    this.products.update(oldItem => 
      // กรองเอาเฉพาะตัวที่ "ID ไม่ตรงกับตัวที่จะลบ" เก็บไว้
      oldItem.filter(item => item.id !== idToRemove)
    );
  }

  totalPrice = computed(() => {
    // ใช้ reduce เพื่อวนลูปบวกเลข (ท่ามาตรฐาน JavaScript)
    return this.products().reduce((acc, curr) => acc + curr.price, 0);
  });
}
