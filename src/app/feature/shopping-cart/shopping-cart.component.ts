import { CommonModule } from '@angular/common';
import { Component, effect, inject } from '@angular/core';
import { ShoppingCartService } from './services/shopping-cart.service';
import { testin123 as testingExternalSignal } from './testing';

@Component({
  selector: 'app-shopping-cart',
  imports: [CommonModule],
  templateUrl: './shopping-cart.component.html',
  styleUrl: './shopping-cart.component.scss',
})
export class ShoppingCartComponent {
  cartService = inject(ShoppingCartService);
  // Variables para el carrito y el precio total
  cartItems$ = this.cartService.getCartItems$();
  // totalPrice = this.cartService.getTotalPrice();
  cartItemCount = this.cartService.cartItemCount;

  constructor() {
    effect(() => {
      console.log('test --->', testingExternalSignal());
    });
  }

  ngOnInit(): void {}

  // Método para agregar un producto al carrito
  addProduct(productId: number) {
    this.cartService.addProductToCart(productId);

    testingExternalSignal.set('Cambio');
  }

  // Método para eliminar un producto del carrito
  removeProduct(productIndex: number) {
    this.cartService.removeProductFromCart(productIndex);
  }
}
