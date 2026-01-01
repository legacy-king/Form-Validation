// ==================== FORM VALIDATION CLASS ====================

class FormValidator {
  constructor(formId) {
    this.form = document.getElementById(formId);
    this.emailInput = document.getElementById('email');
    this.countrySelect = document.getElementById('country');
    this.postalInput = document.getElementById('postal');
    this.passwordInput = document.getElementById('password');
    this.passwordConfirmInput = document.getElementById('passwordConfirm');
    this.successMessage = document.getElementById('successMessage');

    this.bindEvents();
  }

  // Set up event listeners
  bindEvents() {
    // Validate on blur for each field
    this.emailInput.addEventListener('blur', () => this.validateEmail());
    this.countrySelect.addEventListener('blur', () => this.validateCountry());
    this.postalInput.addEventListener('blur', () => this.validatePostal());
    this.passwordInput.addEventListener('blur', () => this.validatePassword());
    this.passwordConfirmInput.addEventListener('blur', () => this.validatePasswordConfirm());

    // Handle form submission
    this.form.addEventListener('submit', (e) => this.handleSubmit(e));
  }

  // ==================== VALIDATION METHODS ====================

  validateEmail() {
    const emailError = document.getElementById('email-error');
    const emailValue = this.emailInput.value.trim();
    
    // Check if empty
    if (emailValue === '') {
      emailError.textContent = 'Email is required!';
      this.emailInput.classList.add('invalid');
      this.emailInput.classList.remove('valid');
      return false;
    }
    
    // Check for valid email format (simple check: contains @ and .)
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(emailValue)) {
      emailError.textContent = 'Please enter a valid email address!';
      this.emailInput.classList.add('invalid');
      this.emailInput.classList.remove('valid');
      return false;
    }
    
    // Valid email
    emailError.textContent = '';
    this.emailInput.classList.remove('invalid');
    this.emailInput.classList.add('valid');
    return true;
  }

  validateCountry() {
    const countryError = document.getElementById('country-error');
    const countryValue = this.countrySelect.value;
    
    if (countryValue === '') {
      countryError.textContent = 'Please select a country!';
      this.countrySelect.classList.add('invalid');
      this.countrySelect.classList.remove('valid');
      return false;
    }
    
    countryError.textContent = '';
    this.countrySelect.classList.remove('invalid');
    this.countrySelect.classList.add('valid');
    return true;
  }

  validatePostal() {
    const postalError = document.getElementById('postal-error');
    const postalValue = this.postalInput.value.trim();
    
    if (postalValue === '') {
      postalError.textContent = 'Postal code is required!';
      this.postalInput.classList.add('invalid');
      this.postalInput.classList.remove('valid');
      return false;
    }
    
    if (postalValue.length < 5) {
      postalError.textContent = 'Postal code must be at least 5 characters!';
      this.postalInput.classList.add('invalid');
      this.postalInput.classList.remove('valid');
      return false;
    }
    
    postalError.textContent = '';
    this.postalInput.classList.remove('invalid');
    this.postalInput.classList.add('valid');
    return true;
  }

  validatePassword() {
    const passwordError = document.getElementById('password-error');
    const passwordValue = this.passwordInput.value;
    
    if (passwordValue === '') {
      passwordError.textContent = 'Password is required!';
      this.passwordInput.classList.add('invalid');
      this.passwordInput.classList.remove('valid');
      return false;
    }
    
    if (passwordValue.length < 8) {
      passwordError.textContent = 'Password must be at least 8 characters!';
      this.passwordInput.classList.add('invalid');
      this.passwordInput.classList.remove('valid');
      return false;
    }
    
    passwordError.textContent = '';
    this.passwordInput.classList.remove('invalid');
    this.passwordInput.classList.add('valid');
    return true;
  }

  validatePasswordConfirm() {
    const passwordConfirmError = document.getElementById('passwordConfirm-error');
    const passwordValue = this.passwordInput.value;
    const passwordConfirmValue = this.passwordConfirmInput.value;
    
    if (passwordConfirmValue === '') {
      passwordConfirmError.textContent = 'Please confirm your password!';
      this.passwordConfirmInput.classList.add('invalid');
      this.passwordConfirmInput.classList.remove('valid');
      return false;
    }
    
    // Check if passwords match
    if (passwordValue !== passwordConfirmValue) {
      passwordConfirmError.textContent = 'Passwords do not match!';
      this.passwordConfirmInput.classList.add('invalid');
      this.passwordConfirmInput.classList.remove('valid');
      return false;
    }
    
    passwordConfirmError.textContent = '';
    this.passwordConfirmInput.classList.remove('invalid');
    this.passwordConfirmInput.classList.add('valid');
    return true;
  }

  // Validate entire form
  validateForm() {
    const isEmailValid = this.validateEmail();
    const isCountryValid = this.validateCountry();
    const isPostalValid = this.validatePostal();
    const isPasswordValid = this.validatePassword();
    const isPasswordConfirmValid = this.validatePasswordConfirm();
    
    return isEmailValid && isCountryValid && isPostalValid && 
           isPasswordValid && isPasswordConfirmValid;
  }

  // Handle form submission
  handleSubmit(event) {
    event.preventDefault();
    
    // Validate all fields
    if (!this.validateForm()) {
      // If validation fails, don't submit
      return;
    }
    
    // If all validations pass, show success message
    this.successMessage.classList.add('show');
    
    // Optional: Reset form after 3 seconds
    setTimeout(() => {
      this.form.reset();
      this.clearValidation();
      this.successMessage.classList.remove('show');
    }, 3000);
  }

  // Clear all validation states
  clearValidation() {
    const inputs = [
      this.emailInput,
      this.countrySelect,
      this.postalInput,
      this.passwordInput,
      this.passwordConfirmInput
    ];
    
    const errors = [
      document.getElementById('email-error'),
      document.getElementById('country-error'),
      document.getElementById('postal-error'),
      document.getElementById('password-error'),
      document.getElementById('passwordConfirm-error')
    ];
    
    inputs.forEach(input => {
      input.classList.remove('valid', 'invalid');
    });
    
    errors.forEach(error => {
      error.textContent = '';
    });
  }
}

// ==================== INITIALIZE ====================

document.addEventListener('DOMContentLoaded', () => {
  const validator = new FormValidator('signupForm');
});