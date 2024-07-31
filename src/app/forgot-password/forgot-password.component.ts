import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import Swal from 'sweetalert2'

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
        (response) => {
          Swal.fire({
            icon: 'success',
            title: response,
            text: 'Check your email ',
            confirmButtonText: 'OK'
          });
        },
        error => {
          console.error('Error sending password reset link:', error);
            Swal.fire({
            icon: 'error',
            title: 'Email Verification Required',
            text: 'Please verify your email address.',
            confirmButtonText: 'OK'
          });

        }
      );
    }
  }
}
