import { Component, OnInit, Inject } from '@angular/core';
import { CartService } from '../services/cart.service';
import { ProductService } from '../services/product.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-cart-preview-component',
  templateUrl: './cart-preview-component.component.html',
  styleUrls: ['./cart-preview-component.component.css']
})
export class CartPreviewComponentComponent implements OnInit {

  cartItems: any;
  products: any[] = [];

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private dialogRef: MatDialogRef<CartPreviewComponentComponent>, // Inject MatDialogRef
    @Inject(MAT_DIALOG_DATA) public data: any // If you have data to pass to the dialog, you can inject it using MAT_DIALOG_DATA
  ) {}
  
  ngOnInit(): void {
    this.cartItems = this.cartService.getCartItems();
    console.log("cart-items:",this.cartItems);
    this.getProductsForCartItems();
    console.log("items:",this.products);
  }

  getProductsForCartItems(): void {
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
    return this.cartService.getItemQuantity(productId);  
  }

  addProduct(productId: string): void {
    this.cartService.updateCartItemQuantity(productId,1);
  }

  subProduct(productId: string): void {
    this.cartService.updateCartItemQuantity(productId,-1);
  }

  removeProduct(productId: string): void{
    this.cartService.removeFromCart(productId);
  }

  onCloseDialog(): void {
    this.dialogRef.close();
  }
  
  
}
