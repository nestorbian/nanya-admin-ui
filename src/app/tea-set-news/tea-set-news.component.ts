import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { AdminService } from '../service/admin.service';
import { Router } from '@angular/router';
import { HomeCarouselFigure } from '../mdoel/HomeCarouselFigure';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-tea-set-news',
  templateUrl: './tea-set-news.component.html',
  styleUrls: ['./tea-set-news.component.scss']
})
export class TeaSetNewsComponent implements OnInit {
  // 遮罩层
  isShowBlock = false;
  // 编辑快递单号对话框
  isShowEditTrackingNumber = false;
  trackingNumber: string;
  orderId: string;
  // 确认收货框
  isShowConfirmReceive = false;
  // 确认退款
  isShowConfirmRefund = false;
  // 查询信息
  orderNumber = '';
  orderStatuses: any[] = [{name: '待支付', code: 'PENDING_PAY'}, {name: '待发货', code: 'PENDING_DELIVERY'},
  {name: '待收货', code: 'PENDING_RECEIVE'}, {name: '待评价', code: 'PENDING_COMMENT'}, {name: '交易关闭', code: 'CLOSE'},
  {name: '交易完成', code: 'FINISH'}, {name: '待退款', code: 'PENDING_REFUND'}, {name: '完成退款', code: 'FINISH_REFUND'}];
  orderStatus: any;
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
  orderList: any[];
  // imageUrl: any = this.sanitizer.bypassSecurityTrustUrl('http://localhost:8000/image/chadao.png');
  // 预览图片
  previewUrl: string;

  constructor(private adminService: AdminService, private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.onloadData(this.pageNum, this.pageSize);
  }

  // 加载数据
  onloadData(pageNum: number, pageSize: number): void {
    const orderQuery = {pageNumber: pageNum, pageSize: pageSize, orderNumber: this.orderNumber,
      orderStatus: this.orderStatus ? this.orderStatus.code : ''};
    this.adminService.listOrderByOrderQuery(orderQuery).subscribe((data) => {
      const pageInfo = data['data'];
      this.pageNum = pageInfo.number + 1;
      this.pages = pageInfo.totalPages;
      this.orderList = pageInfo.content;
      console.log(pageInfo);
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

  // 编辑快递单号，弹出编辑框
  editTrackingNumber(orderId: string): void {
    this.isShowBlock = true;
    this.orderId = orderId;
    this.isShowEditTrackingNumber = true;
    setTimeout(() => {
      const item = document.getElementById('trackingNumber');
      item.focus();
    }, 100);
  }

  // 取消编辑快递单号
  cancelEditModule(): void {
    this.isShowEditTrackingNumber = false;
    this.isShowBlock = false;
    this.orderId = '';
    this.trackingNumber = '';
  }

  // 确认编辑快递单号
  saveEditModule(): void {
    this.adminService.updateTrackingNumber(this.orderId, this.trackingNumber).subscribe((data) => {
        this.cancelEditModule();
        this.successMessage = '编辑成功';
        this.showSuccessTip();
        this.onloadData(this.pageNum, this.pageSize);
    }, (err: HttpErrorResponse) => {
        this.handleError(err);
    });
  }

  query(event): void {
    this.onloadData(this.pageNum, this.pageSize);
  }

  // 弹出确认收货框
  popupConfirmReceive(orderId: string): void {
    this.isShowConfirmReceive = true;
    this.isShowBlock = true;
    this.orderId = orderId;
  }

  // 提交确认收货框
  confirmReceive(): void {
    this.adminService.confirmProduct(this.orderId).subscribe((data) => {
      this.cancelConfirmReceive();
      this.successMessage = '修改成功';
      this.showSuccessTip();
      this.onloadData(this.pageNum, this.pageSize);
    }, (err: HttpErrorResponse) => {
        this.handleError(err);
    });
  }

  // 取消确认收货框
  cancelConfirmReceive(): void {
    this.isShowConfirmReceive = false;
    this.isShowBlock = false;
    this.orderId = '';
  }

  // 弹出确认退款框
  popupConfirmRefund(orderId: string): void {
    this.isShowConfirmRefund = true;
    this.isShowBlock = true;
    this.orderId = orderId;
  }

  // 取消确认退款
  cancelConfirmRefund(): void {
    this.isShowConfirmRefund = false;
    this.isShowBlock = false;
    this.orderId = '';
  }

  // 确认退款
  confirmRefund(): void {
    this.adminService.confirmRefund(this.orderId).subscribe((data) => {
      this.cancelConfirmRefund();
      this.successMessage = '退款成功';
      this.showSuccessTip();
      this.onloadData(this.pageNum, this.pageSize);
    }, (err: HttpErrorResponse) => {
        this.handleError(err);
    });
  }

  // 查看物流
  findLogistics(): void {
    window.open('http://www.sf-express.com/cn/sc/');
  }

  // 打印
  printOrder(orderId: string): void {
    window.open(`/#/print-order/${orderId}`);
  }

  // 预览图片
  previewImage(url: string): void {
    this.previewUrl = url;
    const modal = document.getElementById('myModal');
    modal.style.display = 'flex';
  }

  // 关闭预览图片
  closePreview(): void {
    const modal = document.getElementById('myModal');
    modal.style.display = 'none';
  }

  confirmTrackingNumber(event): void {
    if (event.keyCode === 13) {
      this.saveEditModule();
    }
  }

}
