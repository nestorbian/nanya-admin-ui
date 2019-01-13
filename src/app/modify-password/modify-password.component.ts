import { Component, OnInit } from '@angular/core';
import { UserService } from '../service/user.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-modify-password',
  templateUrl: './modify-password.component.html',
  styleUrls: ['./modify-password.component.scss']
})
export class ModifyPasswordComponent implements OnInit {
  oldPassword: string;
  newPassword: string;
  repeatPassword: string;
  ownId: string;
  // 成功提示弹窗
  successMessage: string;
  isShowSuccessTip = false;
  // 错误提示弹窗
  isShowErrorTip = false;
  errorMessage: string;
  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.userService.getUserBySession().subscribe((data) => {
      if (data['status']) {
        const user = data['data'];
        if (user) {
          this.ownId = user['userId'];
        } else {
          this.router.navigate(['/login'], { queryParams: { path: `/home/modify-password` } });
        }
      } else {
        this.errorMessage = data['message'];
        this.showErrorTip();
      }
    }, (err: HttpErrorResponse) => {
      this.handleError(err);
    });
  }
  // 错误处理
  handleError(err: HttpErrorResponse) {
    if (err.error instanceof Error) {
      this.errorMessage = '客户端网络错误';
    } else if (err.status >= 300 && err.status < 400) {
      this.errorMessage = '请求超时';
    } else if (err.status === 404) {
      this.errorMessage = '请求资源未找到';
    } else if (err.status >= 500 && err.status < 600) {
      this.errorMessage = '服务器内部错误';
    } else {
      this.errorMessage = '请求超时';
    }
    this.showErrorTip();
  }

  // 弹出错误提示框
  showErrorTip(): void {
    this.isShowErrorTip = true;
    setTimeout(() => {
      this.errorMessage = '';
      this.isShowErrorTip = false;
    }, 3000);
  }

  // 弹出成功提示框
  showSuccessTip(): void {
    this.isShowSuccessTip = true;
    setTimeout(() => {
      this.successMessage = '';
      this.isShowSuccessTip = false;
    }, 3000);
  }

  // 提交
  submit(): void {
    if (this.newPassword === this.repeatPassword) {
      this.userService.modifyPasswordById(this.ownId, this.oldPassword, this.newPassword).subscribe((data) => {
        if (data['status']) {
          this.successMessage = '密码修改成功，请重新登录';
          this.isShowSuccessTip = true;
          setTimeout(() => {
            this.successMessage = '';
            this.isShowSuccessTip = false;
            this.router.navigate(['/login']);
          }, 1500);
        } else {
          this.errorMessage = data['message'];
          this.showErrorTip();
        }
      }, (err: HttpErrorResponse) => {
        this.handleError(err);
      });
    } else {
      this.errorMessage = '两次输入的密码不一致';
      this.showErrorTip();
    }
  }
}
