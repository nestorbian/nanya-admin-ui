import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { AdminService } from '../service/admin.service';
import { Router } from '@angular/router';
import { HomeCarouselFigure } from '../mdoel/HomeCarouselFigure';
import { DomSanitizer } from '@angular/platform-browser';



@Component({
  selector: 'app-home-carouse-figure',
  templateUrl: './home-carouse-figure.component.html',
  styleUrls: ['./home-carouse-figure.component.scss']
})
export class HomeCarouseFigureComponent implements OnInit {
  // 遮罩层
  isShowBlock = false;
  // 添加对话框
  isShowAddModule = false;
  imageFileName = '上传图片';
  uploadFont = 'fa fa-plus';
  // 修改对话框
  isShowModifyModule = false;
  categoryIdForModify: string;
  // 删除对话框
  isShowDeleteModule = false;
  deleteCategoryId: string;
  // 表单信息
  imageFile: File = null;
  categoryName: string;
  categoryDescription: string;
  needShowInHome = false;
  imagePath: string;
  imageUrl: string;
  createTime: Date;
  // 错误提示弹窗
  isShowErrorTip = false;
  errorMessage: string;
  // 成功提示弹窗
  successMessage: string;
  isShowSuccessTip = false;
  // 预览图片
  previewUrl: string;
  // 分页
  pageNum = 1;
  pageSize = 5;
  pages: number;
  categoryList: any;
  // imageUrl: any = this.sanitizer.bypassSecurityTrustUrl('http://localhost:8000/image/chadao.png');

  constructor(private adminService: AdminService, private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.onloadData(this.pageNum, this.pageSize);
  }

  // 加载数据
  onloadData(pageNum: number, pageSize: number): void {
    this.adminService.getAllCategories(pageNum, pageSize).subscribe((data) => {
      const pageInfo = data['data'];
      this.categoryList = pageInfo['content'];
      this.pages = pageInfo['totalPages'];
      this.pageNum = pageInfo['number'] + 1;
    }, (err: HttpErrorResponse) => {
      this.handleError(err);
    });
  }

  // 选择上传图片
  onImageUpload(event: any): void {
    this.imageFile = event.target.files[0];

    this.adminService.saveOneImage(this.imageFile, 'category').subscribe((data) => {
      const image = data['data'];
      this.imagePath = image['imagePath'];
      this.imageUrl = image['imageUrl'];

      this.imageFileName = this.imageFile.name;
      this.uploadFont = 'fa fa-upload';
    }, (err: HttpErrorResponse) => {
      this.handleError(err);
    });
  }

  // 取消添加对话框
  cancelAddModule(): void {
    this.isShowAddModule = false;
    this.isShowBlock = false;
    this.uploadFont = 'fa fa-plus';
    this.imageFileName = '上传图片';
    this.imageFile = null;
    this.categoryName = '';
    this.categoryDescription = '';
    this.needShowInHome = false;
    this.imagePath = '';
    this.imageUrl = '';
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

  // 显示删除对话框
  deleteCategory(categoryId: string): void {
    this.deleteCategoryId = categoryId;
    this.isShowBlock = true;
    this.isShowDeleteModule = true;
  }

  // 取消删除
  cancelDeleteModule(): void {
    this.deleteCategoryId = '';
    this.isShowBlock = false;
    this.isShowDeleteModule = false;
  }

  // 删除轮播信息
  confirmDeleteCategory(): void {
    this.adminService.deleteCategory(this.deleteCategoryId).subscribe((data) => {
        this.isShowBlock = false;
        this.isShowDeleteModule = false;
        this.successMessage = '删除成功';
        this.showSuccessTip();
        this.onloadData(this.pageNum, this.pageSize);
    }, (err: HttpErrorResponse) => {
      this.handleError(err);
    });
  }

  // 提交添加轮播表单
  addCategory(): void {

    if (this.needShowInHome) {
      if (!this.categoryDescription) {
        this.errorMessage = '分类描述不能为空';
        this.showErrorTip();
        return;
      }

      if (!this.imageUrl || !this.imagePath) {
        this.errorMessage = '分类图片不能为空';
        this.showErrorTip();
        return;
      }
    }

    this.adminService.addCategory(this.categoryName, this.categoryDescription, this.needShowInHome, this.imagePath, this.imageUrl)
    .subscribe((data) => {
      this.cancelAddModule();
      this.successMessage = '添加成功';
      this.showSuccessTip();
      this.onloadData(1, this.pageSize);
    }, (err: HttpErrorResponse) => {
      this.handleError(err);
    });
  }

  // 显示修改的模块
  showModifyModule(item: any): void {
    this.categoryIdForModify = item.categoryId;
    this.uploadFont = 'fa fa-upload';
    const list = item.imagePath.split('/');
    this.imageFileName = list[list.length - 1];
    this.imagePath = item.imagePath;
    this.imageUrl = item.imageUrl;
    this.categoryName = item.categoryName;
    this.categoryDescription = item.categoryDescription;
    this.needShowInHome = item.needShowInHome;
    this.createTime = item.createTime;

    this.isShowModifyModule = true;
    this.isShowBlock = true;
  }

  // 提交修改轮播表单
  modifyCategory(): void {
    this.adminService.modifyCategory(this.categoryName, this.categoryDescription, this.needShowInHome, this.imagePath,
      this.imageUrl, this.categoryIdForModify, this.createTime).subscribe((data) => {
        this.cancelModifyModule();
        this.successMessage = '修改成功';
        this.showSuccessTip();
        this.onloadData(this.pageNum, this.pageSize);
       }, (err: HttpErrorResponse) => {
         this.handleError(err);
       });
  }

  // 取消修改轮播
  cancelModifyModule(): void {
    this.isShowModifyModule = false;
    this.isShowBlock = false;
    this.uploadFont = 'fa fa-plus';
    this.imageFileName = '上传图片';
    this.imageFile = null;
    this.categoryName = '';
    this.categoryDescription = '';
    this.needShowInHome = false;
    this.imagePath = '';
    this.imageUrl = '';
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
