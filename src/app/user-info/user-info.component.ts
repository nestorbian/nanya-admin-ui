import { Component, OnInit } from '@angular/core';
import { UserService } from '../service/user.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent implements OnInit {
  // upload
  imageFile: File = null;
  isCompleteUpload = false;
  // 错误提示弹窗
  isShowErrorTip = false;
  errorMessage: string;
  // 成功提示弹窗
  successMessage: string;
  isShowSuccessTip = false;
  // data
  user: any;
  recommendIndex = 0;
  recommendImagerray = ['/assets/images/1.jpg', '/assets/images/2.jpg', '/assets/images/3.jpg', '/assets/images/4.jpg',
  '/assets/images/5.jpg', '/assets/images/6.jpg', '/assets/images/7.jpg', '/assets/images/8.jpg', '/assets/images/9.jpg',
  '/assets/images/10.jpg', '/assets/images/11.jpg', '/assets/images/12.jpg', '/assets/images/13.jpg', '/assets/images/14.jpg',
  '/assets/images/15.jpg', '/assets/images/16.jpg', '/assets/images/17.jpg', '/assets/images/18.jpg', '/assets/images/19.jpg',
  '/assets/images/20.jpg', '/assets/images/21.jpg'];
  test = '<img src="http://tb2.bdstatic.com/tb/editor/images/face/i_f01.png?t=20140803"/>';
  // 验证码
  phoneValidateNumber: string;
  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.userService.getUserBySession().subscribe((data) => {
      if (data['status']) {
        if (!data['data'])  {
          this.router.navigate(['/login'], { queryParams: { path: '/home/user-info' } });
        } else {
          this.user = data['data'];
        }
      } else {
        this.errorMessage = data['message'];
        this.showErrorTip();
      }
    }, (err: HttpErrorResponse) => {
      this.handleError(err);
    });
    window.scrollTo(0, 0);
  }

  onloadData(): void {
    this.userService.getUserById(this.user.userId).subscribe((data) => {
      if (data['status']) {
        this.user = data['data'];
      } else {
        this.errorMessage = data['message'];
        this.showErrorTip();
      }
    }, (err: HttpErrorResponse) => {
      this.handleError(err);
    });
  }

  // 选择上传图片
  onImageUpload(event: any): void {
    this.isCompleteUpload = true;
    this.imageFile = event.target.files[0];
    this.userService.modifyHeadSculptureByFile(this.imageFile, this.user.userId).subscribe((data) => {
      if (data['status']) {
        this.successMessage = '上传成功';
        this.showSuccessTip();
        this.isCompleteUpload = false;
        this.onloadData();
      } else {
        this.errorMessage = data['message'];
        this.showErrorTip();
        this.isCompleteUpload = false;
      }
    }, (err: HttpErrorResponse) => {
      this.handleError(err);
      this.isCompleteUpload = false;
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

  saveHeadSculpture(): void {
    this.userService.modifyHeadSculptureByUrl(this.recommendImagerray[this.recommendIndex], this.user.userId).subscribe((data) => {
      if (data['status']) {
        this.successMessage = '保存成功';
        this.showSuccessTip();
        this.onloadData();
      } else {
        this.errorMessage = data['message'];
        this.showErrorTip();
      }
    }, (err: HttpErrorResponse) => {
      this.handleError(err);
    });
  }

  // 只能输入数字
  removeChar(event: any): boolean {
    const code = event.keyCode;
    if (code < 48 || code > 57) {
      return false;
    } else {
      return true;
    }
  }

  // 倒计时
  countDown(event: any): void {
    const regex = /^1[3|4|5|8][0-9]\d{4,8}$/;
    if (!this.user.phone) {
    } else if (!regex.test(this.user.phone) || this.user.phone.length < 11) {
      this.errorMessage = '手机号码格式不正确';
      this.showErrorTip();
    } else {
      let index = 60;
      const timer = setInterval(() => {
        if (index > 1) {
          index -= 1;
          event.srcElement.innerText = index;
          event.target.className = 'btn btn-info disabled';
        } else {
          clearInterval(timer);
          event.srcElement.innerText = '获取验证码';
          event.target.className = 'btn btn-info';
        }
      }, 1000);
    }
  }

  // 表单提交
  submit(): void {
    const regex = /^1[3|4|5|8][0-9]\d{4,8}$/;
    if (!regex.test(this.user.phone) || this.user.phone.length < 11) {
      this.errorMessage = '手机号码格式不正确';
      this.showErrorTip();
    } else {
      delete this.user.password;
      delete this.user.createTime;
      delete this.user.updateTime;
      delete this.user.headSculptureUrl;
      delete this.user.headSculpturePath;
      console.log(this.user);
      this.userService.modifyUserById(this.user).subscribe((data) => {
        if (data['status']) {
          this.successMessage = '保存成功';
          this.showSuccessTip();
          this.onloadData();
        } else {
          this.errorMessage = data['message'];
          this.showErrorTip();
        }
      }, (err: HttpErrorResponse) => {
        this.handleError(err);
      });
    }
  }

}
