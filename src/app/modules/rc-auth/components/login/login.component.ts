import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../../../services/auth.service";
import {UserLoginRequest} from "../../../../models/dto/user.model";
import {LocalStorageUtil} from "../../../../utils/local-storage.util";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  @Input() show: boolean = true;
  @Output() switchToRegister: EventEmitter<void> = new EventEmitter<void>();

  loginForm!: FormGroup;


  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {

  }

  ngOnInit() {
    this.initLogForm();
  }

  initLogForm() {
    this.loginForm = this.fb.group({
      username: ["", Validators.required],
      password: ["", Validators.required]
    });
  }

  switchToRegisterForm = () => {
    this.switchToRegister.emit();
  }

  loginAction() {
    const userLogin: UserLoginRequest = {
      username: this.loginForm.get('username')?.value,
      password: this.loginForm.get('password')?.value,
    }
    console.log(userLogin);
    this.authService.login(userLogin).subscribe({
      next: (res) => {
        console.log(res);
        LocalStorageUtil.writeUserToken(res.sessionId);
        this.router.navigate(['/dashboard/home']).then(r => {

        });
      },
      error: (e) => {
        console.log(e)
      }
    });
  }
}
