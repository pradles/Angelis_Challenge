import { Injectable } from '@angular/core';

interface CartItem {
  productId: string;
  quantity: number;
}

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartItems: Map<string, number> = new Map();

  addToCart(productId: string, quantity: number): void {
    if (quantity <= 0) {
      return;
    }

    const currentQuantity = this.cartItems.get(productId) || 0;
    this.cartItems.set(productId, currentQuantity + quantity);
  }

  removeFromCart(productId: string): void {
    this.cartItems.delete(productId);
  }

  updateCartItemQuantity(productId: string, quantity: number): void {
    const currentQuantity = this.cartItems.get(productId) || 0; // Get the current quantity or default to 0 if it's not in the cart
  
    const updatedQuantity = currentQuantity + quantity;
  
    if (updatedQuantity <= 0) {
      this.removeFromCart(productId);
    } else {
      this.cartItems.set(productId, updatedQuantity);
    }
  }
  

  isInCart(productId: string): boolean {
    return this.cartItems.has(productId);
  }

  getCartItems(): CartItem[] {
    return Array.from(this.cartItems.entries()).map(([productId, quantity]) => ({
      productId,
      quantity,
    }));
  }

  getTotalItems(): number {
    let totalItems = 0;
    this.cartItems.forEach((quantity) => (totalItems += quantity));
    return totalItems;
  }

  getItemQuantity(productId: string): number {
    const quantity = this.cartItems.get(productId);
    return quantity !== undefined ? quantity : 0;
  }
}
