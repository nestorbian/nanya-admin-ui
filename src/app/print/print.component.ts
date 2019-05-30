import { Component, OnInit } from '@angular/core';
import { AdminService } from '../service/admin.service';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-print',
  templateUrl: './print.component.html',
  styleUrls: ['./print.component.scss']
})
export class PrintComponent implements OnInit {

  // 错误提示弹窗
  errorMessage: string;
  order: any;
  isShowPrintBtn = true;

  constructor(private adminService: AdminService, private sanitizer: DomSanitizer, private routerInfo: ActivatedRoute) { }

  ngOnInit() {
    const orderId = this.routerInfo.snapshot.paramMap.get('id');
    this.adminService.getOrderInfo(orderId).subscribe((data) => {
      console.log(data.data);
      this.order = data.data;
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
      this.errorMessage = err.error['status'] === 49 ? '服务器内部错误' : err.error['message'];
    } else {
      this.errorMessage = '请求超时';
    }
  }

  printOrder(): void {
    this.isShowPrintBtn = false;
    setTimeout(() => {
      window.print();
    }, 3);
  }

}
