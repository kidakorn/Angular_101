import { CommonModule } from '@angular/common';
import { Component, signal, computed, inject } from '@angular/core';
import { ProductService } from './../product.service';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule],

templateUrl: './product-list.html',
  styleUrl: './product-list.css',
})
export class ProductList {
  productService = inject(ProductService);
}
