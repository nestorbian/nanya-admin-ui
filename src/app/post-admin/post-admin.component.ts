import { Component, OnInit } from '@angular/core';
import { UserService } from '../service/user.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-post-admin',
  templateUrl: './post-admin.component.html',
  styleUrls: ['./post-admin.component.scss']
})
export class PostAdminComponent implements OnInit {
  // 错误提示弹窗
  isShowErrorTip = false;
  errorMessage: string;
  // 成功提示弹窗
  successMessage: string;
  isShowSuccessTip = false;
  // 分页
  pageNum = 1;
  pageSize = 10;
  pages: number;
  postList: any[];
  total: number;
  pageForSkip = '1';
  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.onloadData(1, this.pageSize);
  }

  // 加载数据
  onloadData(pageNum: number, pageSize: number): void {
    this.userService.findAllPost(pageNum, pageSize).subscribe((data) => {
      if (data['status']) {
        const pageInfo = data['data'];
        this.postList = pageInfo['list'];
        this.pages = pageInfo['pages'];
        this.pageNum = pageInfo['pageNum'];
        this.total = pageInfo['total'];
      } else {
        this.errorMessage = data['message'];
        this.showErrorTip();
      }
    }, (err: HttpErrorResponse) => {
      this.handleError(err);
    });
    window.scrollTo(0, 0);
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

  // 上一页
  prePage(): void {
    if (this.pageNum > 1) {
      this.onloadData(this.pageNum - 1, this.pageSize);
    }
  }

  // 下一页
  nextPage(): void {
    if (this.pageNum < this.pages) {
      this.onloadData(this.pageNum + 1, this.pageSize);
    }
  }

  // 跳页
  skipPage(pageNum: number): void {
    this.onloadData(pageNum, this.pageSize);
  }

  // 跳指定页
  goPage(): void {
    const reg = /^[1-9]\d*$/;
    if (reg.test(this.pageForSkip)) {
      if (parseInt(this.pageForSkip, 10) > this.pages) {
        this.pageForSkip = this.pages.toString();
        this.skipPage(parseInt(this.pageForSkip, 10));
      } else {
        this.skipPage(parseInt(this.pageForSkip, 10));
      }
    } else {
      this.pageForSkip = '1';
      alert('输入格式不正确，请输入正整数');
    }
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
}
