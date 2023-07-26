import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service'; // Import the ProductService

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit {
  product: any;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) {}


  ngOnInit(): void {
    // Get the productId from the route parameters
    this.route.params.subscribe((params) => {
      console.log("parameter:",params);
      const productId = params['id'];
      console.log("id:",productId);
      // Fetch the product details based on productId
      this.productService.getProductById(productId).subscribe(
        (product) => {
          this.product = product;
          console.log("product:",product);
        },
        (error) => {
          console.error('Error fetching product details:', error);
        }
      );
    });
  }
}
