import { Injectable, signal, computed, inject } from '@angular/core';
import { Product } from './product.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ProductService {

  http = inject(HttpClient);

  products = signal<Product[]>([]);

  // GET API
  loadProducts() {
    // ใส่ไว้ใน signal
    this.http.get<any[]>('https://fakestoreapi.com/products').subscribe(data => {
      // Map data
      const myProducts = data.map(item => ({
        id: item.id,
        name: item.title, // แปลง title -> name
        price: Math.round(item.price * 31.07), // แปลง $ -> ฿บาท
        inStock: true,
        image: item.image
      }));
      // ใส่ Signal
      this.products.set(myProducts);
    });
  }

  cartItems = signal<Product[]>([]);

  addToCart(product: Product) {
    this.cartItems.update(items => [...items, product]);

    alert(`หยิบ "${product.name}" ลงตะกร้าแล้ว!`);
  };

  cartTotal = computed(() => {
    return this.cartItems().reduce((acc, curr) => acc + curr.price,0);
  });

  clearCart() {
    this.products.update(items => {
      return items;
    });
    this.cartItems.set([]);
  }

  addProduct(name: string) {
    if (name === '') return;
    // 1. สร้าง Object สินค้าชิ้นใหม่ (เสกข้อมูลที่ขาดไป)
    const newProduct: Product = {
      id: Date.now(), // ใช้เวลาปัจจุบันเป็น ID (จะได้ไม่ซ้ำกัน)
      name: name, // ชื่อที่รับมาจากหน้าจอ
      price: Math.floor(Math.random() * 1000) + 100, // สุ่มราคาเล่นๆ 100-1000 บาท
      inStock: true, // ของมาใหม่ ต้องมีของแน่นอน
      image: ''
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
