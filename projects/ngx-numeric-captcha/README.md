# ngx-numeric-captcha

🔐 A modern, lightweight Angular CAPTCHA library featuring multiple verification challenges. Perfect for securing login forms, registration pages, and any application requiring human verification.

[![npm version](https://badge.fury.io/js/ngx-numeric-captcha.svg)](https://badge.fury.io/js/ngx-numeric-captcha)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Angular](https://img.shields.io/badge/Angular-17%2B-red.svg)](https://angular.io)

## ✨ Features

- 🧮 **Math CAPTCHA** - Arithmetic challenges with dynamic difficulty
- 🎚️ **Slider CAPTCHA** - Interactive position matching
- 🔢 **Pattern CAPTCHA** - Memory-based sequence challenges
- 📱 **Fully Responsive** - Optimized for all screen sizes
- 🎨 **Customizable Sizes** - Small & medium size variants
- ⚡ **Zero Dependencies** - Self-contained with inline SVG icons
- 🔧 **TypeScript First** - Complete type definitions included
- 🔄 **Smart Refresh** - Automatic and manual challenge regeneration
- ⌨️ **Keyboard Friendly** - Enter key support and accessibility features
- 🎯 **Compact Design** - Minimal footprint for tight layouts

## 📦 Installation


## 🚀 Quick Start

### 1. Import the Captcha Component
```ts
import { Component } from '@angular/core';
import { CaptchaResult, CaptchaType, NumericCaptchaComponent } from 'ngx-numeric-captcha';

@Component({
  selector: 'app-root',
  imports:  [NumericCaptchaComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  isCaptchaVerified = false;
  CaptchaType = CaptchaType;
  
  onCaptchaResult(result: CaptchaResult) {
    this.isCaptchaVerified = result.isValid;
  }
  
}

```

### 2. Basic Usage
```html
<!-- In your parent template -->
<div class="captcha">    
  <ngx-numeric-captcha
    [type]="CaptchaType.PATTERN"
    size="medium"
    (captchaResult)="onCaptchaResult($event)">
  </ngx-numeric-captcha>
</div>
```


### 3. Handle Results
```ts
  isCaptchaVerified = false;
  CaptchaType = CaptchaType;
  
  onCaptchaResult(result: CaptchaResult) {
    this.isCaptchaVerified = result.isValid;
  }

```  

### 4. Results validation
```ts
if (result.isValid) {
  console.log('✅ CAPTCHA verified successfully!');
} else {
  console.log('❌ Verification failed. Attempts:', result.attempts);
}
```


## 📚 API Documentation

### Component Selector
<ngx-numeric-captcha></ngx-numeric-captcha>

### Properties


### Input Properties

| Property |     Type    | Default |     Description               |
|----------|-------------|---------|-------------------------------|
| `type` | `CaptchaType` | `'math'`| The type of CAPTCHA challenge |
| `size` | `'small' \| 'medium'` | `'small'` | Component size variant |

### Output Events

| Event | Type | Description |
|-------|------|-------------|
| `captchaResult` | `CaptchaResult` | Fired when user attempts verification |

### TypeScript Interfaces
```ts
enum CaptchaType {
MATH = 'math',
SLIDER = 'slider',
PATTERN = 'pattern'
}

interface CaptchaResult {
isValid: boolean; // Whether verification was successful
attempts: number; // Number of attempts made
}
```

## 🎯 CAPTCHA Types

### Math CAPTCHA
Simple arithmetic challenges perfect for quick verification.
```html
<ngx-numeric-captcha
type="math"
size="small"
(captchaResult)="handleMath($event)">
</ngx-numeric-captcha>
```

**Features:**
- Addition, subtraction, and multiplication
- Numbers optimized for compact display (1-15)
- Enter key submission support
- Auto-generates new problems on failure

### Slider CAPTCHA
Interactive position matching for engaging user experience.
```html
<ngx-numeric-captcha
type="slider"
size="medium"
(captchaResult)="handleSlider($event)">
</ngx-numeric-captcha>
```

**Features:**
- Visual target indicator
- Configurable tolerance zone
- Smooth drag interaction
- Mobile-friendly touch support

### Pattern CAPTCHA
Memory-based sequence challenges for enhanced security.
```html
<ngx-numeric-captcha
type="pattern"
size="small"
(captchaResult)="handlePattern($event)">
</ngx-numeric-captcha>
```

**Features:**
- 3-number sequence challenges
- Visual sequence display
- Grid-based input interface
- Clear/reset functionality

## 💡 Real-World Examples

### Login Form Integration
```html
<form class="login-form" (ngSubmit)="onLogin()" #loginForm="ngForm">
 <h2>Sign In</h2> 
 <div class="form-group"> 
    <label>Email</label> 
    <input type="email" [(ngModel)]="email" name="email" required> 
 </div> 
 <div class="form-group"> 
    <label>Password</label> 
    <input type="password" [(ngModel)]="password" name="password" required> 
 </div> 
<div class="form-group"> <label>Security Verification</label> 
    <lib-compact-captcha type="math" size="small" (captchaResult)="onCaptchaResult($event)"> 
    </lib-compact-captcha>
</div>
    <button
    type="submit"
    class="login-btn"
    [disabled]="!isCaptchaVerified || loginForm.invalid">
    Sign In
    </button>
</form>
```
```ts
export class LoginComponent {
  email = '';
  password = '';
  isCaptchaVerified = false;

  onCaptchaResult(result: CaptchaResult) {
    this.isCaptchaVerified = result.isValid;
    
    if (!result.isValid && result.attempts >= 3) {
      // Handle max attempts reached
      console.warn('Max verification attempts reached');
    }
  }

  onLogin() {
    if (this.isCaptchaVerified) {
      // Proceed with secure login
      this.authService.login(this.email, this.password);
    }
  }
}
```
### Registration Form
```html
<div class="registration-step">
  <h3>Complete Registration</h3>
  <p>Please verify you're human to continue</p>
  
  <lib-compact-captcha 
    type="slider"
    size="medium"
    (captchaResult)="onVerification($event)">
  </lib-compact-captcha>
  
  <div class="actions" *ngIf="isVerified">
    <button class="btn-primary" (click)="completeRegistration()">
      Create Account
    </button>
  </div>
</div>
```

### Comment Form
```html
<div class="comment-form">
  <textarea 
    [(ngModel)]="comment" 
    placeholder="Write your comment..."
    rows="3">
  </textarea>
  
  <div class="verification-row">
    <lib-compact-captcha 
      type="pattern"
      size="small"
      (captchaResult)="onCaptchaVerified($event)">
    </lib-compact-captcha>
    
    <button 
      [disabled]="!isCaptchaVerified || !comment.trim()"
      (click)="submitComment()">
      Post Comment
    </button>
  </div>
</div>
```

### 🎨 Customization
### CSS Custom Properties
```css
ngx-numeric-captcha {
  --captcha-primary-color: #4CAF50;
  --captcha-secondary-color: #2196F3;
  --captcha-error-color: #F44336;
  --captcha-border-radius: 8px;
  --captcha-font-family: 'Inter', sans-serif;
}
```


### Responsive

📱 Responsive Behavior
The component automatically adjusts for different screen sizes:

Desktop: Full feature set with hover effects

Tablet: Touch-optimized interactions

Mobile: Compact layout with larger touch targets

♿ Accessibility
ARIA labels for screen readers

Keyboard navigation support

High contrast compatible

Focus indicators for all interactive elements

Alternative text for visual elements


🌐 Browser      Support
    Browser	     Version
    Chrome	      90+
    Firefox	      88+
    Safari	      14+
    Edge	      90+
    iOS Safari	  14+
    Chrome Mobile 90+


📈 Performance
    Bundle size: ~15KB (minified + gzipped)

Runtime overhead: Minimal

Memory usage: <1MB typical

Zero external dependencies

🔄 Version Compatibility
ngx-numeric-captcha	Angular	Node.js
1.x	                17+	    18+