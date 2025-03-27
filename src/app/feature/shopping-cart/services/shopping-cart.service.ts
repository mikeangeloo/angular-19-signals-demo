import { computed, effect, Injectable, signal } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';

interface Product {
  name: string;
  price: number;
}

@Injectable({
  providedIn: 'root',
})
export class ShoppingCartService {
  // Signal para los productos en el carrito
  private cartItems = signal<Product[]>([]);
  // Signal para el precio total
  public totalPrice = signal<number>(0);

  // Computed: Número total de productos
  cartItemCount = computed(() => this.cartItems().length);

  // Efecto: cada vez que el total de precio cambie, se realiza alguna acción
  constructor() {
    effect(() => {
      console.log(`El total del carrito ha cambiado a: ${this.totalPrice()}`);
    });
  }

  // Método para agregar productos al carrito
  addProductToCart(productId: number) {
    this.fetchProductPrice(productId).subscribe((price) => {
      const newProduct: Product = { name: `Producto ${productId}`, price };
      this.cartItems.update((currentItems) => [...currentItems, newProduct]); // Actualiza el carrito
      console.log('cartItems', this.cartItems());
      this.updateTotalPrice(); // Recalcula el precio total
    });
  }

  // Método para eliminar productos del carrito
  removeProductFromCart(productIndex: number) {
    this.cartItems.update((currentItems) => {
      currentItems.splice(productIndex, 1);
      return [...currentItems]; // Devolvemos una nueva lista
    });
    this.updateTotalPrice();
  }

  // Método para obtener los productos en el carrito
  getCartItems$() {
    return toObservable(this.cartItems);
  }

  // Método para obtener el precio total
  getTotalPrice$() {
    return this.totalPrice();
  }

  // Método simulado que simula una llamada a la API para obtener el precio
  private fetchProductPrice(productId: number) {
    return of(100).pipe(delay(1000)); // Simulamos un retraso de 1 segundo
  }

  // Método para actualizar el precio total
  private updateTotalPrice() {
    const currentItems = this.cartItems();
    const total = currentItems.reduce((sum, item) => sum + item.price, 0);
    this.totalPrice.set(total); // Actualiza el precio total
  }
}
