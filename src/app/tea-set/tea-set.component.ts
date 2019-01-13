import { Component, OnInit } from '@angular/core';
import { UserService } from '../service/user.service';
import { HttpErrorResponse } from '@angular/common/http/src/response';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-tea-set',
  templateUrl: './tea-set.component.html',
  styleUrls: ['./tea-set.component.scss']
})
export class TeaSetComponent implements OnInit {
  // 错误提示弹窗
  isShowErrorTip = false;
  errorMessage: string;
  // 分页
  pageNum = 1;
  pageSize = 12;
  pages: number;
  teaSetNewsList: any[];

  constructor(private userService: UserService, private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.onloadData(1, this.pageSize);
  }

  // 加载数据
  onloadData(pageNum: number, pageSize: number): void {
    this.userService.findAllTeaSetNews(pageNum, pageSize).subscribe((data) => {
      if (data['status']) {
        const pageInfo = data['data'];
        this.teaSetNewsList = pageInfo['list'];
        this.pages = pageInfo['pages'];
        this.pageNum = pageInfo['pageNum'];
      } else {
        this.errorMessage = data['message'];
        this.showErrorTip();
      }
    }, (err: HttpErrorResponse) => {
      this.handleError(err);
    });
    window.scrollTo(0, 0);
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
}
