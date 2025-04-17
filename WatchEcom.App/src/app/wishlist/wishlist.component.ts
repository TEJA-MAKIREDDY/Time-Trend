// WatchEcom.App/src/app/wishlist/wishlist.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { Router } from '@angular/router';
import { WishlistService } from '../services/wishlist.service';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [CommonModule, CurrencyPipe],
  template: `
    <div class="app-container">
      <nav class="navbar">
        <div class="navbar-brand">
          <h1>My Wishlist</h1>
        </div>
        <div class="navbar-menu">
          <button class="nav-btn" (click)="router.navigate(['/watches'])">
            <span class="icon">⌚</span>
            <span class="text">Watches</span>
          </button>
          <button class="nav-btn" (click)="router.navigate(['/orders'])">
            <span class="icon">🛒</span>
            <span class="text">Cart</span>
          </button>
          <button class="nav-btn logout" (click)="Logout()">
            <span class="icon">↪</span>
            <span class="text">Logout</span>
          </button>
        </div>
      </nav>

      <main class="main-content">
        <div *ngIf="wishlistItems.length === 0" class="empty-state">
          <span class="icon">♥</span>
          <h2>Your wishlist is empty</h2>
          <p>Browse our collection and add your favorite watches</p>
          <button class="browse-btn" (click)="router.navigate(['/watches'])">
            Browse Watches
          </button>
        </div>

        <div *ngIf="wishlistItems.length > 0" class="watches-grid">
          <div *ngFor="let item of wishlistItems" class="watch-card">
            <div class="watch-image">
              <img [src]="item.watch.imageUrl" [alt]="item.watch.model">
              <button class="remove-btn" (click)="removeFromWishlist(item.watchId)">
                ×
              </button>
            </div>
            <div class="watch-info">
              <h3>{{item.watch.brand}}</h3>
              <p class="model">{{item.watch.model}}</p>
              <p class="price">{{item.watch.price | currency}}</p>
              <button class="add-to-cart-btn" (click)="addToCart(item.watch)">
                Add to Cart
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
      max-width: 1400px;
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
      color: #e74c3c;
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

    .watches-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: 2rem;
    }

    .watch-card {
      background: white;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 4px 6px rgba(0,0,0,0.1);
      transition: transform 0.3s ease, box-shadow 0.3s ease;
    }

    .watch-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 8px 12px rgba(0,0,0,0.15);
    }

    .watch-image {
      position: relative;
      padding-top: 75%;
    }

    .watch-image img {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .remove-btn {
      position: absolute;
      top: 1rem;
      right: 1rem;
      background: white;
      border: none;
      border-radius: 50%;
      width: 36px;
      height: 36px;
      cursor: pointer;
      font-size: 1.5rem;
      box-shadow: 0 2px 4px rgba(0,0,0,0.2);
      transition: all 0.3s ease;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #e74c3c;
    }

    .remove-btn:hover {
      background-color: #e74c3c;
      color: white;
      transform: scale(1.1);
    }

    .watch-info {
      padding: 1.5rem;
    }

    .watch-info h3 {
      margin: 0;
      font-size: 1.2rem;
      color: #2c3e50;
      font-weight: 600;
    }

    .watch-info .model {
      margin: 0.5rem 0;
      color: #6c757d;
      font-size: 0.9rem;
    }

    .watch-info .price {
      margin: 0.5rem 0;
      color: #2c3e50;
      font-size: 1.1rem;
      font-weight: 600;
    }

    .add-to-cart-btn {
      width: 100%;
      padding: 0.8rem;
      border: none;
      border-radius: 8px;
      background-color: #3498db;
      color: white;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.3s ease;
      margin-top: 1rem;
    }

    .add-to-cart-btn:hover {
      background-color: #2980b9;
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

      .watches-grid {
        grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
        gap: 1rem;
      }

      .empty-state {
        padding: 2rem 1rem;
      }
    }
  `]
})
export class WishlistComponent implements OnInit {
  wishlistItems: any[] = [];
  cart: any[] = [];
  userCartKey: string = '';

  constructor(
    public router: Router,
    private wishlistService: WishlistService
  ) {}

  ngOnInit() {
    this.loadWishlist();
    this.initializeUserCart();
  }

  loadWishlist() {
    this.wishlistService.getWishlist().subscribe(items => {
      this.wishlistItems = items;
    });
  }

  removeFromWishlist(watchId: number) {
    this.wishlistService.removeFromWishlist(watchId).subscribe(() => {
      this.wishlistItems = this.wishlistItems.filter(item => item.watchId !== watchId);
    });
  }

  addToCart(watch: any) {
    const user = this.getLoggedInUser();
    if (!user) {
      alert('⚠️ Please log in to add items to your cart.');
      return;
    }

    this.cart.push(watch);
    localStorage.setItem(this.userCartKey, JSON.stringify(this.cart));
    console.log('Cart Updated:', this.cart);
    alert('Item added to cart successfully!');
  }

  private initializeUserCart() {
    const user = this.getLoggedInUser();
    if (!user) {
      console.warn('⚠️ No user logged in.');
      this.cart = [];
      return;
    }

    this.userCartKey = `cart_${user}`;
    this.loadCart();
  }

  private loadCart() {
    if (typeof window !== 'undefined' && localStorage) {
      const savedCart = localStorage.getItem(this.userCartKey);
      this.cart = savedCart ? JSON.parse(savedCart) : [];
    } else {
      console.warn('⚠️ localStorage is not available.');
      this.cart = [];
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