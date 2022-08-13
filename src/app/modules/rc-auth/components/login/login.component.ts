import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../../../services/auth.service";
import {UserLoginRequest} from "../../../../models/dto/user.model";
import {LocalStorageUtil} from "../../../../utils/local-storage.util";
import {Router} from "@angular/router";
import {ReportCardService} from "../../../../services/report-card.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  @Input() show: boolean = true;
  @Output() switchToRegister: EventEmitter<void> = new EventEmitter<void>();
  loginForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private defaultService: ReportCardService,
  ) {
  }

  ngOnInit() {
    this.checkIfLoggedIn();
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
    this.authService.login(userLogin).subscribe({
      next: (res) => {
        LocalStorageUtil.writeUserToken(res.sessionId);
        const routerTarget = LocalStorageUtil.readSchoolId() ? "/select-school" : "/dashboard";
        this.router.navigate([routerTarget]).then((r) => console.log(r));
      },
      error: (e) => {
        console.log(e)
      }
    });
  }

  private checkIfLoggedIn() {
    const token = LocalStorageUtil.readUserToken();
    if (token) {
      this.defaultService.test().subscribe(() => this.router.navigate(['/dashboard']).then());
    }
  }

}
