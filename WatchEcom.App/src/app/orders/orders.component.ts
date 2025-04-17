import { Component, OnInit } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule, CurrencyPipe],
  template: `
    <div class="app-container">
      <nav class="navbar">
        <div class="navbar-brand">
          <h1>My Cart</h1>
        </div>
        <div class="navbar-menu">
          <button class="nav-btn" (click)="router.navigate(['/watches'])">
            <span class="icon">⌚</span>
            <span class="text">Watches</span>
          </button>
          <button class="nav-btn" (click)="router.navigate(['/wishlist'])">
            <span class="icon">♥</span>
            <span class="text">Wishlist</span>
          </button>
          <button class="nav-btn logout" (click)="Logout()">
            <span class="icon">↪</span>
            <span class="text">Logout</span>
          </button>
        </div>
      </nav>

      <main class="main-content">
        <div *ngIf="orders.length === 0" class="empty-state">
          <span class="icon">🛒</span>
          <h2>Your cart is empty</h2>
          <p>Browse our collection and add your favorite watches</p>
          <button class="browse-btn" (click)="router.navigate(['/watches'])">
            Browse Watches
          </button>
        </div>

        <div *ngIf="orders.length > 0" class="cart-container">
          <div class="cart-items">
            <div *ngFor="let item of orders; let i = index" class="cart-item">
              <div class="item-image">
                <img [src]="item.imageUrl" [alt]="item.model">
              </div>
              <div class="item-details">
                <h3>{{item.brand}}</h3>
                <p class="model">{{item.model}}</p>
                <p class="price">{{item.price | currency}}</p>
              </div>
              <button class="remove-btn" (click)="removeItem(i)">
                <span class="icon">×</span>
              </button>
            </div>
          </div>

          <div class="cart-summary">
            <div class="summary-header">
              <h2>Order Summary</h2>
            </div>
            <div class="summary-content">
              <div class="summary-row">
                <span>Subtotal</span>
                <span>{{totalAmount | currency}}</span>
              </div>
              <div class="summary-row">
                <span>Shipping</span>
                <span>Free</span>
              </div>
              <div class="summary-row total">
                <span>Total</span>
                <span>{{totalAmount | currency}}</span>
              </div>
            </div>
            <div class="summary-actions">
              <button class="clear-btn" (click)="clearOrders()">
                Clear Cart
              </button>
              <button class="checkout-btn" (click)="placeOrder()">
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  `,
  styles: [`
    .app-container {
      min-height: 100vh;
      background-color: #f8f9fa;
    }

    .navbar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1rem 2rem;
      background-color: white;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      position: sticky;
      top: 0;
      z-index: 1000;
    }

    .navbar-brand h1 {
      margin: 0;
      font-size: 1.5rem;
      color: #2c3e50;
      font-weight: 600;
    }

    .navbar-menu {
      display: flex;
      gap: 1rem;
    }

    .nav-btn {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.5rem 1rem;
      border: none;
      border-radius: 8px;
      background-color: #f8f9fa;
      color: #2c3e50;
      cursor: pointer;
      transition: all 0.3s ease;
      font-size: 0.9rem;
    }

    .nav-btn:hover {
      background-color: #e9ecef;
      transform: translateY(-1px);
    }

    .nav-btn .icon {
      font-size: 1.2rem;
    }

    .nav-btn.logout {
      background-color: #dc3545;
      color: white;
    }

    .nav-btn.logout:hover {
      background-color: #c82333;
    }

    .main-content {
      padding: 2rem;
      max-width: 1200px;
      margin: 0 auto;
    }

    .empty-state {
      text-align: center;
      padding: 4rem 2rem;
      background: white;
      border-radius: 12px;
      box-shadow: 0 4px 6px rgba(0,0,0,0.1);
    }

    .empty-state .icon {
      font-size: 4rem;
      color: #6c757d;
      margin-bottom: 1rem;
      display: block;
    }

    .empty-state h2 {
      color: #2c3e50;
      margin: 1rem 0;
    }

    .empty-state p {
      color: #6c757d;
      margin-bottom: 2rem;
    }

    .browse-btn {
      padding: 0.8rem 2rem;
      border: none;
      border-radius: 8px;
      background-color: #3498db;
      color: white;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.3s ease;
    }

    .browse-btn:hover {
      background-color: #2980b9;
      transform: translateY(-2px);
    }

    .cart-container {
      display: grid;
      grid-template-columns: 1fr 350px;
      gap: 2rem;
    }

    .cart-items {
      background: white;
      border-radius: 12px;
      padding: 1.5rem;
      box-shadow: 0 4px 6px rgba(0,0,0,0.1);
    }

    .cart-item {
      display: grid;
      grid-template-columns: 120px 1fr auto;
      gap: 1.5rem;
      padding: 1rem;
      border-bottom: 1px solid #e9ecef;
      transition: all 0.3s ease;
    }

    .cart-item:last-child {
      border-bottom: none;
    }

    .cart-item:hover {
      background-color: #f8f9fa;
    }

    .item-image {
      width: 120px;
      height: 120px;
      border-radius: 8px;
      overflow: hidden;
    }

    .item-image img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .item-details {
      display: flex;
      flex-direction: column;
      justify-content: center;
    }

    .item-details h3 {
      margin: 0;
      font-size: 1.2rem;
      color: #2c3e50;
      font-weight: 600;
    }

    .item-details .model {
      margin: 0.5rem 0;
      color: #6c757d;
      font-size: 0.9rem;
    }

    .item-details .price {
      margin: 0;
      color: #2c3e50;
      font-size: 1.1rem;
      font-weight: 600;
    }

    .remove-btn {
      width: 36px;
      height: 36px;
      border: none;
      border-radius: 50%;
      background: white;
      color: #e74c3c;
      font-size: 1.5rem;
      cursor: pointer;
      transition: all 0.3s ease;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }

    .remove-btn:hover {
      background-color: #e74c3c;
      color: white;
      transform: scale(1.1);
    }

    .cart-summary {
      background: white;
      border-radius: 12px;
      padding: 1.5rem;
      box-shadow: 0 4px 6px rgba(0,0,0,0.1);
      height: fit-content;
      position: sticky;
      top: 100px;
    }

    .summary-header {
      margin-bottom: 1.5rem;
    }

    .summary-header h2 {
      margin: 0;
      color: #2c3e50;
      font-size: 1.5rem;
      font-weight: 600;
    }

    .summary-content {
      margin-bottom: 1.5rem;
    }

    .summary-row {
      display: flex;
      justify-content: space-between;
      margin-bottom: 1rem;
      color: #6c757d;
    }

    .summary-row.total {
      color: #2c3e50;
      font-weight: 600;
      font-size: 1.2rem;
      border-top: 2px solid #e9ecef;
      padding-top: 1rem;
      margin-top: 1rem;
    }

    .summary-actions {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .clear-btn {
      padding: 0.8rem;
      border: 2px solid #e74c3c;
      border-radius: 8px;
      background: white;
      color: #e74c3c;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.3s ease;
    }

    .clear-btn:hover {
      background-color: #e74c3c;
      color: white;
    }

    .checkout-btn {
      padding: 0.8rem;
      border: none;
      border-radius: 8px;
      background-color: #3498db;
      color: white;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.3s ease;
    }

    .checkout-btn:hover {
      background-color: #2980b9;
      transform: translateY(-2px);
    }

    @media (max-width: 1024px) {
      .cart-container {
        grid-template-columns: 1fr;
      }

      .cart-summary {
        position: static;
      }
    }

    @media (max-width: 768px) {
      .navbar {
        padding: 1rem;
      }

      .navbar-brand h1 {
        font-size: 1.2rem;
      }

      .nav-btn .text {
        display: none;
      }

      .main-content {
        padding: 1rem;
      }

      .cart-item {
        grid-template-columns: 100px 1fr auto;
        gap: 1rem;
      }

      .item-image {
        width: 100px;
        height: 100px;
      }
    }

    @media (max-width: 480px) {
      .cart-item {
        grid-template-columns: 80px 1fr auto;
        gap: 0.5rem;
      }

      .item-image {
        width: 80px;
        height: 80px;
      }

      .item-details h3 {
        font-size: 1rem;
      }

      .item-details .price {
        font-size: 1rem;
      }
    }
  `]
})
export class OrdersComponent implements OnInit {
  orders: any[] = [];
  totalAmount: number = 0;
  userCartKey: string = '';

  constructor(public router: Router) {}

  ngOnInit() {
    this.initializeUserCart();
  }

  private initializeUserCart() {
    const user = this.getLoggedInUser();
    if (!user) {
      console.warn('⚠️ No user logged in.');
      this.orders = [];
      return;
    }

    this.userCartKey = `cart_${user}`;
    this.loadOrders();
  }

  private loadOrders() {
    if (typeof window !== 'undefined' && localStorage) {
      const savedOrders = localStorage.getItem(this.userCartKey);
      this.orders = savedOrders ? JSON.parse(savedOrders) : [];
      this.calculateTotal();
    } else {
      console.warn('⚠️ localStorage is not available.');
      this.orders = [];
    }
  }

  private calculateTotal() {
    this.totalAmount = this.orders.reduce((sum, item) => sum + item.price, 0);
  }

  removeItem(index: number) {
    this.orders.splice(index, 1);
    localStorage.setItem(this.userCartKey, JSON.stringify(this.orders));
    this.calculateTotal();
  }

  placeOrder() {
    if (this.orders.length === 0) {
      alert('⚠️ Your cart is empty. Add items before placing an order.');
      return;
    }

    alert('✅ Order placed successfully! Thank you for shopping with us.');
    this.clearOrders();
  }

  clearOrders() {
    if (typeof window !== 'undefined' && localStorage) {
      localStorage.removeItem(this.userCartKey);
      this.orders = [];
      this.totalAmount = 0;
      console.log('Cart cleared.');
    } else {
      console.warn('⚠️ localStorage is not available.');
    }
  }

  Logout() {
    localStorage.removeItem('loggedInUser');
    this.router.navigate(['/login']);
  }

  private getLoggedInUser(): string | null {
    return typeof window !== 'undefined' && localStorage
      ? localStorage.getItem('loggedInUser')
      : null;
  }
}
