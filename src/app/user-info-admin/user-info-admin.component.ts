import { Component, OnInit } from '@angular/core';
import { AdminService } from '../service/admin.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-user-info-admin',
  templateUrl: './user-info-admin.component.html',
  styleUrls: ['./user-info-admin.component.scss']
})
export class UserInfoAdminComponent implements OnInit {

  // 错误提示弹窗
  isShowErrorTip = false;
  errorMessage: string;
  // 成功提示弹窗
  successMessage: string;
  isShowSuccessTip = false;
  // 分页
  pageNum = 1;
  pageSize = 5;
  pages: number;
  userList: any[];
  total: number;
  pageForSkip = '1';
  search = '';
  searchInput = '';
  // 随机数组
  randomArray: string[] = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O',
  'P', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i',
  'o', 'p', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'z', 'x', 'c', 'v', 'b', 'n', 'm'];

  constructor(private adminService: AdminService) { }

  ngOnInit() {
    this.onloadData(this.pageNum, this.pageSize, this.search);
  }

  // 加载数据
  onloadData(pageNum: number, pageSize: number, search: string): void {
    this.adminService.findAllUser(pageNum, pageSize, search).subscribe((data) => {
      if (data['status']) {
        const pageInfo = data['data'];
        this.userList = pageInfo['list'];
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
      this.onloadData(this.pageNum - 1, this.pageSize, this.search);
    }
  }

  // 下一页
  nextPage(): void {
    if (this.pageNum < this.pages) {
      this.onloadData(this.pageNum + 1, this.pageSize, this.search);
    }
  }

  // 跳页
  skipPage(pageNum: number): void {
    this.onloadData(pageNum, this.pageSize, this.search);
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

  // 搜索用户列表
  searchUserList(): void {
    this.search = this.searchInput;
    this.onloadData(1, this.pageSize, this.search);
  }

  // 处理违法用户名
  generateRandomUserName(): string {
    let generatedUserName = '违法用户名';
    for (let i = 0; i < 20; i ++) {
      generatedUserName += this.randomArray[Math.floor(Math.random() * 62)];
    }
    return generatedUserName;
  }

  // 处理违法头像
  handleHeadSculpture(userId: string): void {
    this.adminService.modifyHeadSculptureByUrl('/assets/images/user-default.jpg', userId).subscribe((data) => {
      if (data['status']) {
        this.successMessage = '处理成功';
        this.showSuccessTip();
        this.onloadData(this.pageNum, this.pageSize, this.search);
      } else {
        this.errorMessage = data['message'];
        this.showErrorTip();
      }
    }, (err: HttpErrorResponse) => {
      this.handleError(err);
    });
  }

  // 处理用户名
  handleUserName(userId: string): void {
    const userName = this.generateRandomUserName();
    console.log(userName);
    const user = {userId: userId, userName: userName};
    this.adminService.modifyUserById(user).subscribe((data) => {
      if (data['status']) {
        this.successMessage = '处理成功';
        this.showSuccessTip();
        this.onloadData(this.pageNum, this.pageSize, this.search);
      } else {
        this.errorMessage = data['message'];
        this.showErrorTip();
      }
    }, (err: HttpErrorResponse) => {
      this.handleError(err);
    });
  }

  // 处理简介
  handleProfile(userId: string): void {
    const user = {userId: userId, profile: '违法简介'};
    this.adminService.modifyUserById(user).subscribe((data) => {
      if (data['status']) {
        this.successMessage = '处理成功';
        this.showSuccessTip();
        this.onloadData(this.pageNum, this.pageSize, this.search);
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
}
