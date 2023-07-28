import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})

export class CartComponent implements OnInit {

  cartItems: any;
  products: any[] = [];

  constructor(
    private productService: ProductService,
    private cartService: CartService,
  ) {}

  

  ngOnInit(): void {
    //console.log("cart-items:",this.cartItems);
    this.getProductsForCartItems();
    //console.log("items:",this.products);
  }

  getProductsForCartItems(): void {
    this.cartItems = this.cartService.getCartItems();
    // Loop through each cart item and fetch the corresponding product
    for (const cartItem of this.cartItems) {
      const productId = cartItem.productId; // Get the product ID from the cart item
      this.productService.getProductById(productId).subscribe(
        (product) => {
          // Push the product details into the products array
          this.products.push(product);
        },
        (error) => {
          console.error('Error fetching product details:', error);
        }
      );
    }
  }
  getAllCount() : number {
    return this.cartService.getTotalItems();
  }

  getProductCount(productId: string): number {
    //console.log("#ofProduct: ",this.cartService.getItemQuantity(productId))
    return this.cartService.getItemQuantity(productId);  
  }

  addProduct(productId: string): void {
    this.cartService.updateCartItemQuantity(productId,1);
  }

  subProduct(productId: string): void {
    this.cartService.updateCartItemQuantity(productId,-1);
  }

  removeProduct(productId: string): void {
    this.cartService.removeFromCart(productId);
    
    // Remove the product from the products array as well
    const index = this.products.findIndex(product => product.id === productId);
    if (index !== -1) {
      this.products.splice(index, 1);
    }
  }

  getTotalPrice(): number {
    let totalPrice = 0;
    for (const product of this.products) {
      totalPrice += product.listOfPlans[0].price.amount * this.getProductCount(product.id);
    }
    return totalPrice;
  }

  getTotalShippingCost(): number {
    let totalShippingCost = 0;
    for (const product of this.products) {
      if (product?.listOfPlans[0]?.isShippingChargesRequired == true) {
        totalShippingCost += product.listOfPlans[0].shippingCharges.amount;
      }
    }
    return totalShippingCost;
  }

  getTotalProductCost(): number {
    return this.getTotalPrice() + this.getTotalShippingCost();
  }

  clearCart(): void {
    this.cartService.clearCart();
  }


}
