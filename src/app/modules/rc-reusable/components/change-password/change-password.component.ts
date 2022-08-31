import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../../../services/auth.service";
import {UserChangePassword} from "../../../../models/dto/user.model";

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  @Input() username: string = '';
  changePasswordForm: FormGroup;

  constructor(
    private _fb: FormBuilder,
    private _authService: AuthService,
  ) {
    this.changePasswordForm = this._fb.group({
      oldPass: ['', Validators.required],
      newPass: ['', Validators.required],
      rptPass: ['', Validators.required],
    })
  }

  ngOnInit(): void {
  }

  isPasswordFormValid(): boolean {
    return this.changePasswordForm.valid && this.changePasswordForm.get('newPass')?.value == this.changePasswordForm.get('rptPass')?.value;
  }

  changePasswordAction() {
    const creds: UserChangePassword = {
      username: this.username,
      oldPassword: this.changePasswordForm.get('oldPass')?.value,
      newPassword: this.changePasswordForm.get('newPass')?.value
    }
    console.log(creds)
    this._authService.changePassword(creds).subscribe();
  }
}
