import { Component, OnInit } from '@angular/core';
import { AdminService } from '../service/admin.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-well-known-tea-add',
  templateUrl: './well-known-tea-add.component.html',
  styleUrls: ['./well-known-tea-add.component.scss']
})
export class WellKnownTeaAddComponent implements OnInit {
  // 表单
  uploadedFiles: File[] = [];
  detailPart: string;
  wellKnownTeaName: string;
  description: string;
  productionPlace: string;
  // 错误提示弹窗
  isShowErrorTip = false;
  errorMessage: string;
  // 成功提示弹窗
  successMessage: string;
  isShowSuccessTip = false;

  constructor(private adminService: AdminService, private router: Router) { }

  ngOnInit() {
    window.scrollTo(0, 0);
  }

  // 上传图片
  onUpload(event) {
    for (const file of event.files) {
        this.uploadedFiles.push(file);
    }
  }

  // 清除单个图片
  removeImage(event: any): void {
    this.uploadedFiles.splice(this.uploadedFiles.indexOf(event.file), 1);
    console.log(this.uploadedFiles);
  }

  // 清空图片
  clearImages(): void {
    this.uploadedFiles = [];
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
      this.router.navigate(['/home-admin/well-known-tea']);
    }, 1000);
  }

  // 添加主流茶
  addTea(): void {
    if (this.uploadedFiles.length > 0) {
      this.adminService.addWellKnownTea(this.uploadedFiles, this.wellKnownTeaName, this.productionPlace, this.description, this.detailPart)
      .subscribe((data) => {
        if (data['status']) {
          this.successMessage = '添加成功';
          this.showSuccessTip();
        } else {
          this.errorMessage = data['message'];
          this.showErrorTip();
        }
      }, (err: HttpErrorResponse) => {
        this.handleError(err);
      });
    } else {
      this.errorMessage = '请添加图片';
      this.showErrorTip();
    }
  }

}
