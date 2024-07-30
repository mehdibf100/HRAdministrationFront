import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent {
  forgotForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.forgotForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  get email() {
    return this.forgotForm.get('email');
  }

  onSubmit(): void {
    if (this.forgotForm.valid) {
      this.authService.forgotpassword(this.forgotForm.value.email).subscribe(
        () => {
          alert('Password reset link sent to your email');
        },
        error => {
          console.error('Error sending password reset link:', error);
        }
      );
    }
  }
}
