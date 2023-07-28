import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CartPreviewComponentComponent } from '../cart-preview-component/cart-preview-component.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  constructor(private dialog: MatDialog) {}

  openCartPreview(): void {
    const dialogRef = this.dialog.open(CartPreviewComponentComponent, {
       // Adjust the width as per your design
      position: {
        top: '80px', // Adjust the top position as per your design
        right: '20px', // Adjust the right position as per your design
      },
      panelClass: 'cart-preview-dialog', // Add a CSS class to customize the style of the dialog
      // You can pass data to the dialog if needed using the 'data' property
      // data: { /* any data you want to pass */ }
    });

    dialogRef.afterClosed().subscribe(result => {
      // You can perform any actions here, e.g., update the UI based on the result
      console.log('The dialog was closed', result);
    });
  }
}
