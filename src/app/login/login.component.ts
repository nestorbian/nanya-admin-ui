import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { toBase64String } from '@angular/compiler/src/output/source_map';
import { Buffer } from 'buffer';
import { UserService } from '../service/user.service';
import { HttpErrorResponse } from '@angular/common/http/src/response';
import { AdminService } from '../service/admin.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  // 表单
  userName: string;
  password: string;
  // 记住密码
  rememberPwd = false;
  // 错误提示弹窗
  showErrorTip = false;
  errorMessage: string;
  // loading
  loading = false;
  url: string;

  constructor(private router: Router, private userService: UserService, private adminService: AdminService,
    private routerInfo: ActivatedRoute) { }

  ngOnInit() {
    this.url = this.routerInfo.snapshot.queryParamMap.get('url');
    if (this.getCookie('userName') && this.getCookie('password')) {
      this.rememberPwd = true;
      this.userName = this.getCookie('userName');
      this.password = Buffer.from(this.getCookie('password'), 'base64').toString('utf-8');
    }

  }

  register(): void {
    this.router.navigate(['/register']);
  }

  // 设置cookie
  setCookie(cname: string, cvalue: string, exdays: number): void {
      const date = new Date();
      date.setTime(date.getTime() + (exdays * 24 * 60 * 60 * 1000));
      const expires = 'expires=' + date.toUTCString();
      document.cookie = cname + '=' + cvalue + '; ' + expires;
  }

  // 获取cookie值
  getCookie(cname: string): string {
    const name = cname + '=';
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      const c = ca[i].trim();
      if (c.indexOf(name) === 0) { return c.substring(name.length, c.length); }
    }
    return '';
  }

  // 删除cookie
  deleteCookie(cname: string): void {
    document.cookie = `${cname}=; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
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
    this.showTip();
  }

  // 弹出错误提示框
  showTip(): void {
    this.showErrorTip = true;
    setTimeout(() => {
      this.errorMessage = '';
      this.showErrorTip = false;
    }, 3000);
  }

  submit(): void {
    if (this.rememberPwd) {
      const buffer = Buffer.from(this.password, 'utf-8');
      this.deleteCookie('userName');
      this.deleteCookie('password');
      this.setCookie('userName', this.userName, 7);
      this.setCookie('password', buffer.toString('base64'), 7);
    } else {
      this.deleteCookie('userName');
      this.deleteCookie('password');
    }
    this.adminService.getAdminByAdminNameAndPassword(this.userName, this.password).subscribe((data) => {
      if (data['status'] === 0 && data['data']) {
        this.router.navigate(['/home-admin/carousel-figure']);
      } else if (data['status'] === 0 && !data['data']) {
        this.errorMessage = '用户名或密码不正确';
        this.showTip();
      } else {
        this.errorMessage = data['message'];
        this.showTip();
      }
    }, (err: HttpErrorResponse) => {
      this.handleError(err);
    });

  }
}
