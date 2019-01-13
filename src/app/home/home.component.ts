import { Component, OnInit } from '@angular/core';
import { UserService } from '../service/user.service';
import { HttpErrorResponse } from '@angular/common/http';
import { HomeCarouselFigure } from '../mdoel/HomeCarouselFigure';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  // 错误提示弹窗
  isShowErrorTip = false;
  errorMessage: string;
  // 信息域
  homeCarouselFigureList: HomeCarouselFigure[] = null;
  wellknownTeaList: any[] = null;

  constructor(private userService: UserService) { }

  ngOnInit() {
    // 加载轮播图
    this.userService.getAllHomeCarouselFigure().subscribe((data) => {
      if (data['status']) {
        this.homeCarouselFigureList = data['data'];
      } else {
        this.errorMessage = data['message'];
        this.showErrorTip();
      }
    }, (err: HttpErrorResponse) => {
      this.handleError(err);
    });

    // 加载主流茶叶
    this.userService.findAllWellKnownTea().subscribe((data) => {
      if (data['status']) {
        this.wellknownTeaList = data['data'];
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

  // findAllWellKnownTea(): void {
  //  this.userService.findAllWellKnownTea().subscribe((data) => {
  //   if (data['status']) {
  //     this.wellknownTeaList = data['data'];
  //   } else {
  //     this.errorMessage = data['message'];
  //     this.showErrorTip();
  //   }
  //  }, (err: HttpErrorResponse) => {
  //   this.handleError(err);
  //  });
  // }

  slide(i: any): void {
    return i;
  }

}
