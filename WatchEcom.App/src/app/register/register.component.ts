import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-register',
  template: `
    <div class="app-container">
      <div class="register-container">
        <div class="register-card">
          <div class="register-header">
            <h1>Time Trend</h1>
            <p class="subtitle">Create your account to start shopping</p>
          </div>

          <form (ngSubmit)="register()" class="register-form">
            <div class="form-group">
              <label for="username">Email</label>
              <div class="input-group">
                <span class="input-icon">📧</span>
                <input 
                  type="email" 
                  id="username" 
                  [(ngModel)]="username" 
                  name="username" 
                  placeholder="Enter your email"
                  required
                  [pattern]="emailPattern"
                  #usernameField="ngModel"
                >
              </div>
              <p class="error-message" *ngIf="usernameField.invalid && usernameField.touched">
                Please enter a valid email address
              </p>
            </div>

            <div class="form-group">
              <label for="password">Password</label>
              <div class="input-group">
                <span class="input-icon">🔒</span>
                <input 
                  type="password" 
                  id="password" 
                  [(ngModel)]="password" 
                  name="password" 
                  placeholder="Create a password"
                  required
                >
              </div>
            </div>

            <div class="form-group">
              <label for="confirm_password">Confirm Password</label>
              <div class="input-group">
                <span class="input-icon">🔒</span>
                <input 
                  type="password" 
                  id="confirm_password" 
                  [(ngModel)]="confirm_password" 
                  name="confirm_password" 
                  placeholder="Confirm your password"
                  required
                >
              </div>
              <p class="error-message" *ngIf="passwordMismatch">
                Passwords do not match
              </p>
            </div>

            <div class="form-group">
              <label for="Security_Question">Security Question</label>
              <div class="security-question">
                <p>What is your favorite color?</p>
              </div>
              <div class="input-group">
                <span class="input-icon">🎨</span>
                <input 
                  type="text" 
                  id="Security_Question" 
                  [(ngModel)]="Security_Question" 
                  name="Security_Question" 
                  placeholder="Enter your answer"
                  required
                >
              </div>
            </div>

            <div class="form-actions">
              <button type="submit" class="register-btn" [disabled]="isLoading || usernameField.invalid">
                <span class="btn-text">{{ isLoading ? 'Creating Account...' : 'Create Account' }}</span>
                <span class="btn-icon" *ngIf="!isLoading">→</span>
              </button>
            </div>

            <div class="form-links">
              <p class="login-link">Already have an account? <a (click)="goToLogin()">Login</a></p>
            </div>

            <div *ngIf="message" class="message" [class.error]="message.includes('failed') || message.includes('already')">
              {{ message }}
            </div>
          </form>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .app-container {
      min-height: 100vh;
      background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 2rem;
    }

    .register-container {
      width: 100%;
      max-width: 400px;
      margin: 0 auto;
    }

    .register-card {
      background: white;
      border-radius: 16px;
      padding: 2rem;
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
      transition: transform 0.3s ease, box-shadow 0.3s ease;
    }

    .register-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 15px 30px rgba(0, 0, 0, 0.15);
    }

    .register-header {
      text-align: center;
      margin-bottom: 2rem;
    }

    .register-header h1 {
      color: #2c3e50;
      font-size: 2rem;
      font-weight: 600;
      margin: 0;
      margin-bottom: 0.5rem;
    }

    .subtitle {
      color: #6c757d;
      font-size: 0.9rem;
      margin: 0;
    }

    .register-form {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }

    .form-group {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    .form-group label {
      color: #2c3e50;
      font-size: 0.9rem;
      font-weight: 500;
    }

    .input-group {
      position: relative;
      display: flex;
      align-items: center;
    }

    .input-icon {
      position: absolute;
      left: 1rem;
      color: #6c757d;
      font-size: 1.2rem;
    }

    .input-group input {
      width: 100%;
      padding: 0.8rem 1rem 0.8rem 2.5rem;
      border: 2px solid #e9ecef;
      border-radius: 8px;
      font-size: 1rem;
      transition: all 0.3s ease;
      background: #f8f9fa;
    }

    .input-group input:focus {
      outline: none;
      border-color: #3498db;
      background: white;
      box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.1);
    }

    .input-group input::placeholder {
      color: #adb5bd;
    }

    .security-question {
      background: #f8f9fa;
      padding: 1rem;
      border-radius: 8px;
      margin: 0.5rem 0;
    }

    .security-question p {
      color: #2c3e50;
      margin: 0;
      font-size: 0.9rem;
    }

    .form-actions {
      margin-top: 1rem;
    }

    .register-btn {
      width: 100%;
      padding: 1rem;
      border: none;
      border-radius: 8px;
      background: #3498db;
      color: white;
      font-size: 1rem;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.3s ease;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
    }

    .register-btn:hover:not(:disabled) {
      background: #2980b9;
      transform: translateY(-2px);
    }

    .register-btn:disabled {
      background: #bdc3c7;
      cursor: not-allowed;
    }

    .btn-icon {
      font-size: 1.2rem;
      transition: transform 0.3s ease;
    }

    .register-btn:hover .btn-icon {
      transform: translateX(4px);
    }

    .form-links {
      text-align: center;
      margin-top: 1.5rem;
    }

    .login-link {
      color: #6c757d;
      font-size: 0.9rem;
      margin: 0;
    }

    .login-link a {
      color: #3498db;
      text-decoration: none;
      font-weight: 500;
      cursor: pointer;
      transition: color 0.3s ease;
    }

    .login-link a:hover {
      color: #2980b9;
      text-decoration: underline;
    }

    .error-message {
      color: #e74c3c;
      font-size: 0.85rem;
      margin: 0.5rem 0 0;
    }

    .message {
      text-align: center;
      padding: 1rem;
      border-radius: 8px;
      margin-top: 1rem;
      font-size: 0.9rem;
      background: #d4edda;
      color: #155724;
    }

    .message.error {
      background: #f8d7da;
      color: #721c24;
    }

    @media (max-width: 480px) {
      .app-container {
        padding: 1rem;
      }

      .register-card {
        padding: 1.5rem;
      }

      .register-header h1 {
        font-size: 1.75rem;
      }
    }
  `],
  imports: [CommonModule, FormsModule]
})
export class RegisterComponent {
  username = '';
  password = '';
  confirm_password = '';
  Security_Question = '';
  message = '';
  passwordMismatch = false;
  isLoading = false;

  emailPattern: string = '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$';

  constructor(private authService: AuthService, public router: Router) {}

  isValidEmail(): boolean {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(this.username);
  }

  validatePasswords(): boolean {
    if (this.password !== this.confirm_password) {
      this.passwordMismatch = true;
      return false;
    }
    this.passwordMismatch = false;
    return true;
  }

  register() {
    if (!this.validatePasswords()) {
      this.message = 'Passwords do not match!';
      return;
    }

    if (!this.isValidEmail()) {
      this.message = 'Please enter a valid email address.';
      return;
    }

    this.isLoading = true;
    this.message = '';

    this.authService.register(this.username, this.password, this.Security_Question).subscribe({
      next: () => {
        this.message = 'Registration successful! Redirecting to login...';
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 1500);
      },
      error: (error) => {
        this.isLoading = false;
        if (error.error === 'Username already exists.') {
          this.message = 'Email already registered.';
        } else {
          this.message = 'Registration failed. Please try again.';
        }
      }
    });
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
}
