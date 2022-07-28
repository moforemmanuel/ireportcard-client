import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserRegisterRequest} from "../../../../models/dto/user.model";
import {AuthService} from "../../../../services/auth.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  @Input() show: boolean = false;
  @Output() switchToLogin: EventEmitter<void> = new EventEmitter<void>();

  registerForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.registerForm = this.fb.group({
      firstName: ["", Validators.required],
      lastName: ["", Validators.required],
      username: ["", Validators.required],
      password: ["", Validators.required],
    })
  }

  ngOnInit(): void {
  }

  switchToLoginForm = () => {
    this.switchToLogin.emit();
  }


  registerAction() {
    const userReg: UserRegisterRequest = {
      first_name: this.registerForm.get("firstName")?.value,
      last_name: this.registerForm.get("lastName")?.value,
      username: this.registerForm.get("username")?.value,
      password: this.registerForm.get("password")?.value,
    }
    console.log(userReg);
    this.authService.regiser(userReg).subscribe({
      next: () => {
        this.switchToLoginForm();
      }
    });
  }
}
