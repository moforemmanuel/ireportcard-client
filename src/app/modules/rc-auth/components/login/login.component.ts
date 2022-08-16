import {Component, OnInit} from '@angular/core';
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
  loginForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private defaultService: ReportCardService,
    private reportCardService: ReportCardService,
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

  loginAction() {
    const userLogin: UserLoginRequest = {
      username: this.loginForm.get('username')?.value,
      password: this.loginForm.get('password')?.value,
    }
    LocalStorageUtil.deleteUserToken();
    this.authService.login(userLogin).subscribe({
      next: (res) => {
        LocalStorageUtil.writeUserToken(res.sessionId);
        this.navigateToHome();
      },
      error: (e) => {
        console.log(e)
      }
    });
  }

  private navigateToHome = () => {
    this.reportCardService.testAuthUser().subscribe(() => {
      this.reportCardService.testAuthStudent().subscribe((isStudent) => {
        console.log("student : " + isStudent)
        if (isStudent) {
          this.router.navigate(['/student']).then()
        } else {
          this.reportCardService.testAuthTeacher().subscribe((isTeacher) => {
            if (isTeacher) {
              this.router.navigate(['/dashboard']).then()
            } else {
              this.reportCardService.testAuthAdmin().subscribe((isAdmin) => {
                if (isAdmin) {
                  this.router.navigate(['/admin']).then()
                }
              });
            }
          });
        }
      });
    });
  }

  private checkIfLoggedIn() {
    const token = LocalStorageUtil.readUserToken();
    if (token) {
      this.defaultService.test().subscribe(() => this.router.navigate(['/dashboard']).then());
    }
  }

}
