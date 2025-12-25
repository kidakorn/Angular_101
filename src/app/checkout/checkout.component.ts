import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css',
})
export class CheckoutComponent {
  productService = inject(ProductService);
  router = inject(Router);

  name: string = '';
  address: string = '';
  phone: string = '';

  submitOrder() {
    if (!this.name || !this.address || !this.phone) {
      alert('กรุณากรอกข้อมูลให้ครบ!');
      return;
    }

    alert(`ขอบคุณ : คุณ ${this.name} เราได้รับคำสั่งซื้อแล้ว เบอร์ ${this.phone}`);

    this.productService.clearCart();

    this.router.navigate(['/']);
  }
}
