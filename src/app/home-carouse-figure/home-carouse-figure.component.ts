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
  carouselFigureIdForModify: string;
  // 删除对话框
  isShowDeleteModule = false;
  deleteCarouselFigureId: string;
  deleteCarouselFigureImagePath: string;
  // 表单信息
  imageFile: File = null;
  carouselFigureTitle: string;
  carouselFigureContent: string;
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
  homeCarouselFigureList: HomeCarouselFigure[] = new Array<HomeCarouselFigure>();
  // imageUrl: any = this.sanitizer.bypassSecurityTrustUrl('http://localhost:8000/image/chadao.png');

  constructor(private adminService: AdminService, private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.onloadData(this.pageNum, this.pageSize);
  }

  // 加载数据
  onloadData(pageNum: number, pageSize: number): void {
    this.adminService.getAllHomeCarouselFigure(pageNum, pageSize).subscribe((data) => {
      if (data['status']) {
        const pageInfo = data['data'];
        this.homeCarouselFigureList = pageInfo['list'];
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
    this.carouselFigureTitle = '';
    this.carouselFigureContent = '';
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
  deleteHomeCarouselFigure(carouselFigureId: string, carouselFigureImagePath: string): void {
    this.deleteCarouselFigureId = carouselFigureId;
    this.deleteCarouselFigureImagePath = carouselFigureImagePath;
    this.isShowBlock = true;
    this.isShowDeleteModule = true;
  }

  // 取消删除
  cancelDeleteModule(): void {
    this.deleteCarouselFigureId = '';
    this.deleteCarouselFigureImagePath = '';
    this.isShowBlock = false;
    this.isShowDeleteModule = false;
  }

  // 删除轮播信息
  confirmDeleteHomeCarouselFigure(): void {
    this.adminService.deleteHomeCarouselFigureById(this.deleteCarouselFigureId, this.deleteCarouselFigureImagePath).subscribe((data) => {
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

  // 提交添加轮播表单
  addCarouse(): void {
    if (!this.imageFile) {
      this.errorMessage = '轮播图片不能为空';
      this.showErrorTip();
    } else {
      this.adminService.saveHomeCarouselFigure(this.imageFile, this.carouselFigureTitle, this.carouselFigureContent).subscribe((data) => {
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
  showModifyModule(homeCarouselFigure: HomeCarouselFigure): void {
    this.carouselFigureIdForModify = homeCarouselFigure.carouselFigureId;
    this.uploadFont = 'fa fa-upload';
    const list = homeCarouselFigure.carouselFigureImagePath.split('_');
    this.imageFileName = list[list.length - 1];
    this.carouselFigureTitle = homeCarouselFigure.carouselFigureTitle;
    this.carouselFigureContent = homeCarouselFigure.carouselFigureContent;
    this.isShowModifyModule = true;
    this.isShowBlock = true;
  }

  // 提交修改轮播表单
  modifyCarouse(): void {
    this.adminService.updateHomeCarouselFigureById(this.imageFile, this.carouselFigureTitle, this.carouselFigureContent,
       this.carouselFigureIdForModify).subscribe((data) => {
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

  // 取消修改轮播
  cancelModifyModule(): void {
    this.isShowModifyModule = false;
    this.isShowBlock = false;
    this.uploadFont = 'fa fa-plus';
    this.imageFileName = '上传图片';
    this.imageFile = null;
    this.carouselFigureTitle = '';
    this.carouselFigureContent = '';
  }

  // 预览图片
  previewImage(url: string): void {
    this.previewUrl = url;
    const modal = document.getElementById('myModal');
    modal.style.display = 'block';
  }

  // 关闭预览图片
  closePreview(): void {
    const modal = document.getElementById('myModal');
    modal.style.display = 'none';
  }
}
