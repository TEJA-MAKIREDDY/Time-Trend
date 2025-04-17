// src/app/watches/watches.component.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { Router } from '@angular/router';
import { WatchService } from '../services/watch.service';
import { WishlistService } from '../services/wishlist.service';

@Component({
  selector: 'app-watches',
  standalone: true,
  imports: [CommonModule, CurrencyPipe],
  template: `
    <div class="app-container">
      <nav class="navbar">
        <div class="navbar-brand">
          <h1>Time Trend</h1>
        </div>
        <div class="navbar-menu">
          <button class="nav-btn" (click)="viewWishlist()">
            <span class="icon">♥</span>
            <span class="text">Wishlist</span>
          </button>
          <button class="nav-btn" (click)="viewCart()">
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
        <div class="watches-grid">
          <div *ngFor="let watch of watches" class="watch-card">
            <div class="watch-image">
              <img [src]="watch.imageUrl" [alt]="watch.model">
              <button class="wishlist-btn" (click)="toggleWishlist(watch)" 
                      [class.wishlisted]="isInWishlist(watch.id)">
                {{isInWishlist(watch.id) ? '♥' : '♡'}}
              </button>
            </div>
            <div class="watch-info">
              <h3>{{watch.brand}}</h3>
              <p class="model">{{watch.model}}</p>
              <p class="price">{{watch.price | currency}}</p>
              <button class="add-to-cart-btn" (click)="addToCart(watch)">
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

    .wishlist-btn {
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
    }

    .wishlist-btn.wishlisted {
      color: #e74c3c;
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
    }
  `]
})
export class WatchesComponent implements OnInit {
  watches: any[] = [];
  wishlistItems: number[] = [];
  cart: any[] = [];
  apiBaseUrl: string = 'http://localhost:5194';
  userCartKey: string = '';

  constructor(
    private watchService: WatchService,
    private wishlistService: WishlistService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadWatches();
    this.loadWishlist();
    this.initializeUserCart();
  }

  loadWatches() {
    this.watchService.getWatches().subscribe(
      (data) => {
        console.log('Fetched Watches:', data);
        this.watches = data.length > 0 ? this.mapApiData(data) : this.getDefaultWatches();
      },
      (error) => {
        console.error('Error fetching watches:', error);
        this.watches = this.getDefaultWatches();
      }
    );
  }

  loadWishlist() {
    const user = this.getLoggedInUser();
    if (!user) {
      console.warn('⚠️ No user logged in.');
      return;
    }

    console.log('Loading wishlist for user:', user);
    this.wishlistService.getWishlist().subscribe({
      next: (items) => {
        console.log('Fetched Wishlist:', items);
        this.wishlistItems = items.map(item => item.watchId);
        console.log('Processed wishlist items:', this.wishlistItems);
      },
      error: (error) => {
        console.error('Error loading wishlist:', error);
        if (error.status === 401) {
          this.router.navigate(['/login']);
        } else {
          alert('Failed to load wishlist. Please try again.');
        }
      }
    });
  }

  isInWishlist(watchId: number): boolean {
    const isIncluded = this.wishlistItems.includes(watchId);
    console.log(`Checking if watch ${watchId} is in wishlist:`, isIncluded);
    return isIncluded;
  }

  toggleWishlist(watch: any) {
    const user = this.getLoggedInUser();
    if (!user) {
      alert('⚠️ Please log in to manage your wishlist.');
      this.router.navigate(['/login']);
      return;
    }

    console.log('Toggling wishlist for watch:', watch);
    console.log('Current wishlist items:', this.wishlistItems);

    if (this.isInWishlist(watch.id)) {
      console.log('Removing from wishlist:', watch.id);
      this.wishlistService.removeFromWishlist(watch.id).subscribe({
        next: () => {
          this.wishlistItems = this.wishlistItems.filter(id => id !== watch.id);
          console.log('Successfully removed from wishlist:', watch.id);
          console.log('Updated wishlist items:', this.wishlistItems);
        },
        error: (error) => {
          console.error('Error removing from wishlist:', error);
          if (error.status === 401) {
            this.router.navigate(['/login']);
          } else {
            alert('Failed to remove from wishlist. Please try again.');
          }
        }
      });
    } else {
      console.log('Adding to wishlist:', watch.id);
      this.wishlistService.addToWishlist(watch.id).subscribe({
        next: () => {
          this.wishlistItems.push(watch.id);
          console.log('Successfully added to wishlist:', watch.id);
          console.log('Updated wishlist items:', this.wishlistItems);
        },
        error: (error) => {
          console.error('Error adding to wishlist:', error);
          if (error.status === 401) {
            this.router.navigate(['/login']);
          } else {
            alert('Failed to add to wishlist. Please try again.');
          }
        }
      });
    }
  }

  viewWishlist() {
    const user = this.getLoggedInUser();
    if (!user) {
      alert('⚠️ Please log in to view your wishlist.');
      this.router.navigate(['/login']);
      return;
    }
    this.router.navigate(['/wishlist']);
  }

  viewCart() {
    const user = this.getLoggedInUser();
    if (!user) {
      alert('⚠️ Please log in to view your cart.');
      this.router.navigate(['/login']);
      return;
    }
    this.router.navigate(['/orders']);
  }

  addToCart(watch: any) {
    const user = this.getLoggedInUser();
    if (!user) {
      alert('⚠️ Please log in to add items to your cart.');
      this.router.navigate(['/login']);
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

  private mapApiData(apiData: any[]): any[] {
    return apiData.map(item => ({
      id: item.id,
      brand: item.brand,
      model: item.model,
      price: item.price,
      description: item.description,
      imageUrl: item.imageUrl ? `${this.apiBaseUrl}${item.imageUrl}` : 'assets/default-watch.jpg'
    }));
  }

  private getDefaultWatches() {
    return [
      { id: 1, brand: 'Rolex', model: 'Submariner', price: 12000, description: 'Luxury diving watch', imageUrl: 'assets/watches/1.jpg' },
      { id: 2, brand: 'Casio', model: 'G-Shock', price: 150, description: 'Durable sports watch', imageUrl: 'assets/watches/2.jpg' },
      { id: 3, brand: 'Omega', model: 'Speedmaster', price: 5000, description: 'Classic moonwatch', imageUrl: 'assets/watches/3.jpg' }
    ];
  }
}
