import { Component, OnInit } from '@angular/core';
import { LifecycleHook } from '@angular/core/src/render3';
import { AdminService } from '../service/admin.service';
import { HttpErrorResponse } from '@angular/common/http/src/response';
import { Router } from '@angular/router';

@Component({
  selector: 'app-well-known-tea',
  templateUrl: './well-known-tea.component.html',
  styleUrls: ['./well-known-tea.component.scss']
})
export class WellKnownTeaComponent implements OnInit {
  // 分页
  pageNum = 1;
  pageSize = 4;
  pages: number;
  // 错误提示弹窗
  isShowErrorTip = false;
  errorMessage: string;
  // 成功提示弹窗
  successMessage: string;
  isShowSuccessTip = false;
  // 显示list
  wellknownTeaList: any[] = null;
  // 删除
  wellKnownTeaIdForDelete: string;
  isShowDeleteModule = false;
  // 遮罩层
  isShowBlock = false;

  constructor(private adminService: AdminService, private router: Router) { }

  ngOnInit() {
    const screenWidth = window.document.body.clientWidth;
    if (screenWidth >= 1200) {
      this.pageSize = 4;
    } else if (screenWidth >= 992 && screenWidth < 1200) {
      this.pageSize = 3;
    } else if (screenWidth >= 768 && screenWidth < 992) {
      this.pageSize = 2;
    } else {
      this.pageSize = 1;
    }
    this.onLoadData(1, this.pageSize);
  }

  onLoadData(pageNum: number, pageSize: number): void {
    this.adminService.findAllWellKnownTea(pageNum, pageSize).subscribe((data) => {
      if (data['status']) {
        const pageInfo = data['data'];
        this.wellknownTeaList = pageInfo['list'];
        this.pages = pageInfo['pages'];
        this.pageNum = pageInfo['pageNum'];
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

  // 弹出删除对话框
  deleteWellKnownTea(wellKnownTeaId: string): void {
    this.wellKnownTeaIdForDelete = wellKnownTeaId;
    this.isShowBlock = true;
    this.isShowDeleteModule = true;
  }

  // 隐藏删除对话框
  cancelDeleteModule(): void {
    this.isShowBlock = false;
    this.isShowDeleteModule = false;
    this.wellKnownTeaIdForDelete = '';
  }

  // 确认删除
  confirmDeleteWellKnownTea(): void {
    this.adminService.deleteWellKnownTeaById(this.wellKnownTeaIdForDelete).subscribe((data) => {
      if (data['status']) {
        this.cancelDeleteModule();
        this.successMessage = '删除成功';
        this.showSuccessTip();
        this.onLoadData(this.pageNum, this.pageSize);
      } else {
        this.errorMessage = data['message'];
        this.showErrorTip();
      }
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

    editWellKnownTea(wellKnownTeaId: string): void {
      this.router.navigate(['/home-admin/edit-well-known-tea', wellKnownTeaId]);
    }
}
