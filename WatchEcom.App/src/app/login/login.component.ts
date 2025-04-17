import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="app-container">
      <div class="login-container">
        <div class="login-card">
          <div class="login-header">
            <h1>Time Trend</h1>
            <p class="subtitle">Welcome back! Please login to your account.</p>
          </div>

          <form (ngSubmit)="onSubmit()" class="login-form">
            <div class="form-group">
              <label for="username">Username</label>
              <div class="input-group">
                <span class="input-icon">👤</span>
                <input 
                  type="text" 
                  id="username" 
                  [(ngModel)]="username" 
                  name="username" 
                  placeholder="Enter your username"
                  required
                >
              </div>
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
                  placeholder="Enter your password"
                  required
                >
              </div>
            </div>

            <div class="form-actions">
              <button type="submit" class="login-btn" [disabled]="isLoading">
                <span class="btn-text">{{ isLoading ? 'Logging in...' : 'Login' }}</span>
                <span class="btn-icon" *ngIf="!isLoading">→</span>
              </button>
            </div>

            <div class="form-links">
              <a class="forgot-password" (click)="openForgotPasswordDialog()">Forgot Password?</a>
              <p class="register-link">Don't have an account? <a (click)="goToRegister()">Register</a></p>
            </div>
          </form>
        </div>
      </div>

      <!-- Forgot Password Dialog -->
      <div class="dialog-overlay" *ngIf="showForgotPasswordDialog" (click)="closeForgotPasswordDialog()">
        <div class="dialog-content" (click)="$event.stopPropagation()">
          <div class="dialog-header">
            <h2>Reset Password</h2>
            <button class="close-btn" (click)="closeForgotPasswordDialog()">×</button>
          </div>

          <div class="dialog-body">
            <div *ngIf="!isPasswordReset">
              <div class="form-group">
                <label>Security Question</label>
                <p class="security-question">{{ securityQuestion }}</p>
              </div>
              <div class="form-group">
                <label for="answer">Your Answer</label>
                <div class="input-group">
                  <input 
                    type="text" 
                    id="answer" 
                    [(ngModel)]="answer" 
                    placeholder="Enter your answer"
                  >
                </div>
                <p class="error-message" *ngIf="answerMessage">{{ answerMessage }}</p>
              </div>
              <button class="submit-btn" (click)="verifySecurityAnswer()">Verify Answer</button>
            </div>

            <div *ngIf="isPasswordReset">
              <div class="form-group">
                <label for="newPassword">New Password</label>
                <div class="input-group">
                  <input 
                    type="password" 
                    id="newPassword" 
                    [(ngModel)]="newPassword" 
                    placeholder="Enter new password"
                  >
                </div>
              </div>
              <div class="form-group">
                <label for="confirmPassword">Confirm Password</label>
                <div class="input-group">
                  <input 
                    type="password" 
                    id="confirmPassword" 
                    [(ngModel)]="confirmPassword" 
                    placeholder="Confirm new password"
                  >
                </div>
                <p class="error-message" *ngIf="passwordErrorMessage">{{ passwordErrorMessage }}</p>
              </div>
              <button class="submit-btn" (click)="resetPassword()">Reset Password</button>
            </div>
          </div>
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

    .login-container {
      width: 100%;
      max-width: 400px;
      margin: 0 auto;
    }

    .login-card {
      background: white;
      border-radius: 16px;
      padding: 2rem;
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
      transition: transform 0.3s ease, box-shadow 0.3s ease;
    }

    .login-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 15px 30px rgba(0, 0, 0, 0.15);
    }

    .login-header {
      text-align: center;
      margin-bottom: 2rem;
    }

    .login-header h1 {
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

    .login-form {
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

    .form-actions {
      margin-top: 1rem;
    }

    .login-btn {
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

    .login-btn:hover:not(:disabled) {
      background: #2980b9;
      transform: translateY(-2px);
    }

    .login-btn:disabled {
      background: #bdc3c7;
      cursor: not-allowed;
    }

    .btn-icon {
      font-size: 1.2rem;
      transition: transform 0.3s ease;
    }

    .login-btn:hover .btn-icon {
      transform: translateX(4px);
    }

    .form-links {
      text-align: center;
      margin-top: 1.5rem;
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .forgot-password {
      color: #3498db;
      text-decoration: none;
      font-weight: 500;
      cursor: pointer;
      transition: color 0.3s ease;
      font-size: 0.9rem;
    }

    .forgot-password:hover {
      color: #2980b9;
      text-decoration: underline;
    }

    .register-link {
      color: #6c757d;
      font-size: 0.9rem;
      margin: 0;
    }

    .register-link a {
      color: #3498db;
      text-decoration: none;
      font-weight: 500;
      cursor: pointer;
      transition: color 0.3s ease;
    }

    .register-link a:hover {
      color: #2980b9;
      text-decoration: underline;
    }

    /* Dialog Styles */
    .dialog-overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.5);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1000;
    }

    .dialog-content {
      background: white;
      border-radius: 16px;
      padding: 2rem;
      width: 90%;
      max-width: 400px;
      box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2);
    }

    .dialog-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1.5rem;
    }

    .dialog-header h2 {
      color: #2c3e50;
      margin: 0;
      font-size: 1.5rem;
    }

    .close-btn {
      background: none;
      border: none;
      font-size: 1.5rem;
      color: #6c757d;
      cursor: pointer;
      padding: 0.5rem;
      transition: color 0.3s ease;
    }

    .close-btn:hover {
      color: #2c3e50;
    }

    .dialog-body {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }

    .security-question {
      color: #2c3e50;
      font-size: 1rem;
      margin: 0.5rem 0;
      padding: 1rem;
      background: #f8f9fa;
      border-radius: 8px;
    }

    .error-message {
      color: #e74c3c;
      font-size: 0.85rem;
      margin: 0.5rem 0 0;
    }

    .submit-btn {
      width: 100%;
      padding: 0.8rem;
      border: none;
      border-radius: 8px;
      background: #3498db;
      color: white;
      font-size: 1rem;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.3s ease;
    }

    .submit-btn:hover {
      background: #2980b9;
      transform: translateY(-2px);
    }

    @media (max-width: 480px) {
      .app-container {
        padding: 1rem;
      }

      .login-card {
        padding: 1.5rem;
      }

      .login-header h1 {
        font-size: 1.75rem;
      }

      .dialog-content {
        padding: 1.5rem;
      }
    }
  `]
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  isLoading: boolean = false;
  private apiUrl = 'http://localhost:5194/api/auth/login';

  // Forgot Password Properties
  showForgotPasswordDialog = false;
  isPasswordReset = false;
  securityQuestion = 'What is your favorite color?';
  answer = '';
  answerMessage = '';
  newPassword = '';
  confirmPassword = '';
  passwordErrorMessage = '';

  constructor(
    private http: HttpClient,
    private router: Router,
    private authService: AuthService
  ) {}

  onSubmit() {
    if (!this.username || !this.password) {
      alert('Please enter both username and password');
      return;
    }

    this.isLoading = true;
    this.authService.login(this.username, this.password).subscribe({
      next: (response) => {
        console.log('Login successful:', response);
        this.router.navigate(['/watches']);
      },
      error: (error) => {
        console.error('Login failed:', error);
        alert('Login failed. Please check your credentials and try again.');
        this.isLoading = false;
      }
    });
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }

  openForgotPasswordDialog() {
    if (!this.username) {
      alert('Please enter your username first');
      return;
    }
    this.showForgotPasswordDialog = true;
    this.isPasswordReset = false;
    this.answer = '';
    this.answerMessage = '';
    this.newPassword = '';
    this.confirmPassword = '';
    this.passwordErrorMessage = '';
  }

  closeForgotPasswordDialog() {
    this.showForgotPasswordDialog = false;
    this.isPasswordReset = false;
    this.answer = '';
    this.answerMessage = '';
    this.newPassword = '';
    this.confirmPassword = '';
    this.passwordErrorMessage = '';
  }

  verifySecurityAnswer() {
    if (!this.answer) {
      this.answerMessage = 'Please provide an answer to the security question.';
      return;
    }

    this.authService.verifySecurityAnswer(this.username, this.answer).subscribe({
      next: (response) => {
        if (response.isCorrect) {
          this.answerMessage = '';
          this.isPasswordReset = true;
        } else {
          this.answerMessage = 'Incorrect answer. Please try again.';
        }
      },
      error: () => {
        this.answerMessage = 'An error occurred. Please try again.';
      }
    });
  }

  resetPassword() {
    if (this.newPassword !== this.confirmPassword) {
      this.passwordErrorMessage = 'Passwords do not match.';
      return;
    }

    this.authService.resetPassword(this.username, this.newPassword).subscribe({
      next: () => {
        this.passwordErrorMessage = '';
        this.closeForgotPasswordDialog();
        alert('Password has been successfully reset.');
        this.router.navigate(['/login']);
      },
      error: () => {
        this.passwordErrorMessage = 'An error occurred while resetting your password.';
      }
    });
  }
}
