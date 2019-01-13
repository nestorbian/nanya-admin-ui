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
  // 添加对话框
  isShowAddModule = false;
  imageFileName = '上传图片';
  uploadFont = 'fa fa-plus';
  // 修改对话框
  isShowModifyModule = false;
  teaSetIdForModify: string;
  // 删除对话框
  isShowDeleteModule = false;
  teaSetIdForDelete: string;
  // 表单信息
  imageFile: File = null;
  teaSetName: string;
  price: number;
  description: string;
  goodUrl: string;
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
  teaSetNewsList: any[];
  // imageUrl: any = this.sanitizer.bypassSecurityTrustUrl('http://localhost:8000/image/chadao.png');

  constructor(private adminService: AdminService, private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.onloadData(this.pageNum, this.pageSize);
  }

  // 加载数据
  onloadData(pageNum: number, pageSize: number): void {
    this.adminService.findAllTeaSetNews(pageNum, pageSize).subscribe((data) => {
      const pageInfo = data['data'];
      this.teaSetNewsList = pageInfo['list'];
      this.pages = pageInfo['pages'];
      this.pageNum = pageInfo['pageNum'];
    }, (err: HttpErrorResponse) => {
      this.handleError(err);
    });
  }

  // 选择上传图片
  onImageUpload(event: any): void {
    this.imageFile = event.target.files[0];
    this.imageFileName = this.imageFile.name;
    this.uploadFont = 'fa fa-upload';
  }

  // 取消添加对话框
  cancelAddModule(): void {
    this.isShowAddModule = false;
    this.isShowBlock = false;
    this.uploadFont = 'fa fa-plus';
    this.imageFileName = '上传图片';
    this.imageFile = null;
    this.teaSetName = '';
    this.price = null;
    this.description = '';
    this.goodUrl = '';
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

  // 显示删除对话框
  deleteTeaSetNews(teaSetId: string): void {
    this.teaSetIdForDelete = teaSetId;
    this.isShowBlock = true;
    this.isShowDeleteModule = true;
  }

  // 取消删除
  cancelDeleteModule(): void {
    this.teaSetIdForDelete = '';
    this.isShowBlock = false;
    this.isShowDeleteModule = false;
  }

  // 删除茶具信息
  confirmDeleteTeaSetNews(): void {
    this.adminService.deleteTeaSetNewsById(this.teaSetIdForDelete).subscribe((data) => {
      if (data['status']) {
        this.isShowBlock = false;
        this.isShowDeleteModule = false;
        this.successMessage = '删除成功';
        this.showSuccessTip();
        this.onloadData(this.pageNum, this.pageSize);
      } else {
        this.errorMessage = data['message'];
        this.showErrorTip();
      }
    }, (err: HttpErrorResponse) => {
      this.handleError(err);
    });
  }

  // 提交添加茶具表单
  addTeaSetNews(): void {
    if (!this.imageFile) {
      this.errorMessage = '茶具图片不能为空';
      this.showErrorTip();
    } else {
      this.adminService.addTeaSetNews(this.imageFile, this.teaSetName, this.price, this.description, this.goodUrl).subscribe((data) => {
        if (data['status']) {
          this.cancelAddModule();
          this.successMessage = '添加成功';
          this.showSuccessTip();
          this.onloadData(1, this.pageSize);
        } else {
          this.errorMessage = data['message'];
          this.showErrorTip();
        }
      }, (err: HttpErrorResponse) => {
        this.handleError(err);
      });
    }
  }

  // 显示修改的模块
  showModifyModule(teaSetNews: any): void {
    this.teaSetIdForModify = teaSetNews.teaSetId;
    this.uploadFont = 'fa fa-upload';
    const list = teaSetNews.imagePath.split('_');
    this.imageFileName = list[list.length - 1];
    this.teaSetName = teaSetNews.teaSetName;
    this.price = teaSetNews.price;
    this.description = teaSetNews.description;
    this.goodUrl = teaSetNews.goodUrl;
    this.isShowModifyModule = true;
    this.isShowBlock = true;
  }

  // 提交修改茶具表单
  modifyTeaSetNews(): void {
    this.adminService.updateTeaSetNewsById(this.teaSetIdForModify, this.teaSetName, this.imageFile, this.price, this.description,
       this.goodUrl).subscribe((data) => {
        if (data['status']) {
          this.cancelModifyModule();
          this.successMessage = '修改成功';
          this.showSuccessTip();
          this.onloadData(this.pageNum, this.pageSize);
        } else {
          this.errorMessage = data['message'];
          this.showErrorTip();
        }
      }, (err: HttpErrorResponse) => {
          this.handleError(err);
      });
  }

  // 取消修改茶具
  cancelModifyModule(): void {
    this.isShowModifyModule = false;
    this.isShowBlock = false;
    this.uploadFont = 'fa fa-plus';
    this.imageFileName = '上传图片';
    this.imageFile = null;
    this.teaSetName = '';
    this.price = null;
    this.description = '';
    this.goodUrl = '';
  }

  // 只能输入数字
  removeChar(event: any): boolean {
    const code = event.keyCode;
    if (code >= 48 && code <= 57 || code === 46) {
      return true;
    } else {
      return false;
    }
  }

  removeInvalid(event: any): void {
    // 先把非数字的都替换掉，除了数字和.
    event.target.value = event.target.value.replace(/[^\d.]/g, '');
    // 必须保证第一个为数字而不是.
    event.target.value = event.target.value.replace(/^\./g, '');
    // 保证只有出现一个.而没有多个.
    event.target.value = event.target.value.replace(/\.{2,}/g, '.');
    // 保证.只出现一次，而不能出现两次以上
    event.target.value = event.target.value.replace('.', '$#$').replace(/\./g, '').replace('$#$', '.');
    // 保证.只后面只能出现两位有效数字
    event.target.value = event.target.value.replace(/([0-9]+\.[0-9]{2})[0-9]*/, '$1');
  }

}
