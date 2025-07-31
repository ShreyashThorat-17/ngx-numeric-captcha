import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

export interface CaptchaResult {
  isValid: boolean;
  attempts: number;
}

export enum CaptchaType {
  MATH = 'math',
  SLIDER = 'slider',
  PATTERN = 'pattern'
}

@Component({
  selector: 'ngx-numeric-captcha',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './numeric-captcha.html',
  styleUrl: './numeric-captcha.css',
})
export class NumericCaptchaComponent implements OnInit {
    @Input() type: CaptchaType = CaptchaType.MATH;
  @Input() size: 'small' | 'medium' = 'small';
  @Output() captchaResult = new EventEmitter<CaptchaResult>();

  // Common properties
  userAnswer: string = '';
  isVerified: boolean | null = null;
  attempts: number = 0;
  maxAttempts: number = 3;

  // Math CAPTCHA
  mathExpression: string = '';
  correctAnswer: number = 0;

  // Slider CAPTCHA
  sliderPosition: number = 0;
  targetPosition: number = 0;
  sliderTolerance: number = 2;

  // Pattern CAPTCHA
  patternSequence: number[] = [];
  userPattern: number[] = [];
  patternSize: number = 6; // Reduced for compact view

  ngOnInit() {
    this.initializeCaptcha();
  }

  initializeCaptcha() {
    this.resetState();
    
    switch (this.type) {
      case CaptchaType.MATH:
        this.generateMathCaptcha();
        break;
      case CaptchaType.SLIDER:
        this.generateSliderCaptcha();
        break;
      case CaptchaType.PATTERN:
        this.generatePatternCaptcha();
        break;
    }
  }

  resetState() {
    this.userAnswer = '';
    this.isVerified = null;
    this.userPattern = [];
    this.sliderPosition = 0;
  }

  generateMathCaptcha() {
    const operations = ['+', '-', '*'];
    const operation = operations[Math.floor(Math.random() * operations.length)];
    
    // Keep numbers small for compact display
    const num1 = Math.floor(Math.random() * 15) + 1;
    const num2 = Math.floor(Math.random() * 15) + 1;

    switch (operation) {
      case '+':
        this.correctAnswer = num1 + num2;
        break;
      case '-':
        this.correctAnswer = num1 - num2;
        break;
      case '*':
        this.correctAnswer = num1 * num2;
        break;
    }

    this.mathExpression = `${num1} ${operation} ${num2}`;
  }

  generateSliderCaptcha() {
    this.targetPosition = Math.floor(Math.random() * 70) + 15; // 15-85%
    this.sliderPosition = 0;
  }

  generatePatternCaptcha() {
    const sequenceLength = 3; // Keep short for compact view
    this.patternSequence = Array.from({ length: sequenceLength }, () => 
      Math.floor(Math.random() * this.patternSize)
    );
  }

 verify() {
    this.attempts++;
    let isCorrect = false;

    switch (this.type) {
      case CaptchaType.MATH:
        isCorrect = parseInt(this.userAnswer) === this.correctAnswer;
        break;
      case CaptchaType.SLIDER:
        isCorrect = Math.abs(this.sliderPosition - this.targetPosition) <= this.sliderTolerance;
        break;
      case CaptchaType.PATTERN:
        isCorrect = this.arraysEqual(this.userPattern, this.patternSequence);
        break;
    }

    this.isVerified = isCorrect;

    this.captchaResult.emit({
      isValid: isCorrect,
      attempts: this.attempts
    });

    // Only auto-refresh on wrong answer if not at max attempts
    if (!isCorrect && this.attempts < this.maxAttempts) {
      setTimeout(() => {
        // Don't reset attempts here - just generate new captcha
        this.resetState();
        this.generateNewCaptcha();
      }, 1500);
    }
  }

    private generateNewCaptcha() {
    switch (this.type) {
      case CaptchaType.MATH:
        this.generateMathCaptcha();
        break;
      case CaptchaType.SLIDER:
        this.generateSliderCaptcha();
        break;
      case CaptchaType.PATTERN:
        this.generatePatternCaptcha();
        break;
    }
  }

  // Pattern methods
  addToPattern(index: number) {
    if (this.userPattern.length < this.patternSequence.length) {
      this.userPattern.push(index);
    }
  }

  clearPattern() {
    this.userPattern = [];
  }

  // Utility methods
  arraysEqual(a: number[], b: number[]): boolean {
    return a.length === b.length && a.every((val, i) => val === b[i]);
  }

  refreshCaptcha() {
    this.attempts = 0;
    this.initializeCaptcha();
  }

}
