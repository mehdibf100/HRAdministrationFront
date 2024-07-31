import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  resetForm: FormGroup;
  token: string | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.resetForm = this.fb.group({
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]]
    }, { validator: this.passwordMatchValidator });
  }

  ngOnInit(): void {
    this.token = this.route.snapshot.queryParams['token'] || null;
    console.log(this.token);
    if (!this.token) {
      Swal.fire('Error', 'Invalid or missing token.', 'error');
      this.router.navigate(['/login']);
    }
  }

  passwordMatchValidator(formGroup: FormGroup) {
    const newPassword = formGroup.get('newPassword')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;
    return newPassword === confirmPassword ? null : { mismatch: true };
  }

  onSubmit(): void {
    if (this.resetForm.valid && this.token) {
      console.log(this.token);
      const { newPassword } = this.resetForm.value;
      this.authService.resetPassword(this.token, newPassword).subscribe(
        (response) => {
          Swal.fire('Success', response, 'success');
          this.router.navigate(['/login']);
        },
        (error) => {
          console.error('Error resetting password:', error);
          Swal.fire('Error', error.message || 'Password reset failed. Please try again.', 'error');
        }
      );
    } else if (!this.token) {
      Swal.fire('Error', 'Token is missing or invalid.', 'error');
      this.router.navigate(['/login']);
    }
  }
  
}
