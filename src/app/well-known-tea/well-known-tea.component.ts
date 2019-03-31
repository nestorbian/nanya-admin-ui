import { Component, OnInit } from '@angular/core';
import { LifecycleHook } from '@angular/core/src/render3';
import { AdminService } from '../service/admin.service';
import { HttpErrorResponse } from '@angular/common/http/src/response';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-well-known-tea',
  templateUrl: './well-known-tea.component.html',
  styleUrls: ['./well-known-tea.component.scss']
})
export class WellKnownTeaComponent implements OnInit {
  // 分页
  pageNum = 1;
  pageSize = 5;
  pages: number;
  // 错误提示弹窗
  isShowErrorTip = false;
  errorMessage: string;
  // 成功提示弹窗
  successMessage: string;
  isShowSuccessTip = false;
  // 显示list
  productList: any[] = null;
  // 删除
  productIdForDelete: string;
  isShowDeleteModule = false;
  // 遮罩层
  isShowBlock = false;
  // 预览图片
  previewUrl: string;

  constructor(private adminService: AdminService, private router: Router, private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.onLoadData(1, this.pageSize);
  }

  onLoadData(pageNum: number, pageSize: number): void {
    this.adminService.findProducts(pageNum, pageSize).subscribe((data) => {
      const pageInfo = data['data'];
      this.productList = pageInfo['content'];
      this.pages = pageInfo['totalPages'];
      this.pageNum = pageInfo['number'] + 1;
      console.log(this.productList);
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

  // 弹出删除对话框
  deleteProduct(productId: string): void {
    this.productIdForDelete = productId;
    this.isShowBlock = true;
    this.isShowDeleteModule = true;
  }

  // 隐藏删除对话框
  cancelDeleteModule(): void {
    this.isShowBlock = false;
    this.isShowDeleteModule = false;
    this.productIdForDelete = '';
  }

  // 确认删除
  confirmDeleteProduct(): void {
    this.adminService.deleteProductById(this.productIdForDelete).subscribe((data) => {
      this.cancelDeleteModule();
      this.successMessage = '删除成功';
      this.showSuccessTip();
      this.onLoadData(this.pageNum, this.pageSize);
    }, (err: HttpErrorResponse) => {
      this.handleError(err);
    });
  }

  // 上一页
  prePage(): void {
    if (this.pageNum > 1) {
      this.onLoadData(this.pageNum - 1, this.pageSize);
    }
  }

  // 下一页
  nextPage(): void {
    if (this.pageNum < this.pages) {
      this.onLoadData(this.pageNum + 1, this.pageSize);
    }
  }

  editWellKnownTea(productId: string): void {
    this.router.navigate(['/home-admin/edit-well-known-tea', productId]);
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
}
