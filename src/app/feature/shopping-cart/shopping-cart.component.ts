import { CommonModule } from '@angular/common';
import { Component, computed, effect, inject } from '@angular/core';
import { sharedMessage } from '../../shared/state/global-state';
import { ShoppingCartService } from './services/shopping-cart.service';

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
  totalPrice = computed(() => this.cartService.getTotalPrice());
  cartItemCount = this.cartService.cartItemCount;

  constructor() {
    effect(() => {
      console.log('test --->', sharedMessage());
    });
  }

  ngOnInit(): void {}

  // Método para agregar un producto al carrito
  addProduct(productId: number) {
    this.cartService.addProductToCart(productId);

    sharedMessage.set('Cambio');
  }

  // Método para eliminar un producto del carrito
  removeProduct(productIndex: number) {
    this.cartService.removeProductFromCart(productIndex);
  }
}
