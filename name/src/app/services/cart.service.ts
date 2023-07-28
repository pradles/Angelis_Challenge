import { Injectable } from '@angular/core';
import { ProductService } from './product.service';

interface CartItem {
  productId: string;
  quantity: number;
}

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartItems: Map<string, number> = new Map();

  constructor(
    private productService: ProductService,
  ) {}

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
    let limit = Infinity;
    //const limit = product.maxQuantityPerUser?
  
    this.productService.getProductById(productId).subscribe(
      (product) => {
        //console.log("MAX PER PERSON: ", product.maxQuantityPerUser);
        //console.log("AVAILABLE:", product.availableQuantity);
        limit = product.maxQuantityPerUser ? product.maxQuantityPerUser : product.availableQuantity;
  
        //console.log("LIMIT: ", limit);
        if (updatedQuantity <= 0) {
          this.removeFromCart(productId);
        } else {
          if (updatedQuantity <= limit) {
            this.cartItems.set(productId, updatedQuantity);
          } else {
            // If the updated quantity exceeds the limit, set the quantity to the limit
            this.cartItems.set(productId, limit);
          }
        }
      },
      (error) => {
        console.error('Error fetching product details:', error);
      }
    );
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
  clearCart(): void {
    this.cartItems.clear();
  }
}
