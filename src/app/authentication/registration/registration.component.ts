import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  registrationForm: FormGroup;

  constructor(private router: Router, private fb: FormBuilder) {
    this.registrationForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit(): void {
  }

  register() {
    if (this.registrationForm.invalid) {
      return;
    }
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const newUser = { id: users.length + 1, email: this.registrationForm.value.email, password: this.registrationForm.value.password };
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    this.router.navigate(['/login']);
  }

}
