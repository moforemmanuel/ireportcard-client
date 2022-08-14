import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserRegisterRequest} from "../../../../models/dto/user.model";
import {AuthService} from "../../../../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;

  constructor(private router: Router, private fb: FormBuilder, private authService: AuthService) {
    this.registerForm = this.fb.group({
      firstName: ["", Validators.required],
      lastName: ["", Validators.required],
      username: ["", Validators.required],
      password: ["", Validators.required],
    })
  }

  ngOnInit(): void {
  }

  registerAction() {
    const userReg: UserRegisterRequest = {
      firstName: this.registerForm.get("firstName")?.value,
      lastName: this.registerForm.get("lastName")?.value,
      username: this.registerForm.get("username")?.value,
      password: this.registerForm.get("password")?.value,
    }
    console.log(userReg);
    this.authService.register(userReg).subscribe(() => this.router.navigate(['/login']).then());
  }
}
