import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from '../service/admin.service';
import { HttpErrorResponse } from '@angular/common/http';
import { error } from 'util';


@Component({
  selector: 'app-well-known-tea-edit',
  templateUrl: './well-known-tea-edit.component.html',
  styleUrls: ['./well-known-tea-edit.component.scss']
})
export class WellKnownTeaEditComponent implements OnInit {
  // 错误提示弹窗
  isShowErrorTip = false;
  errorMessage: string;
  // 成功提示弹窗
  successMessage: string;
  isShowSuccessTip = false;
  // data
  wellKnownTea: any;
  teaImages: any[];
  // 表单
  detailPart: string;
  wellKnownTeaName: string;
  description: string;
  productionPlace: string;
  // teaId
  wellKnownTeaId: string;

  constructor(private routerInfo: ActivatedRoute, private adminService: AdminService, private router: Router) { }

  ngOnInit() {
    this.wellKnownTeaId = this.routerInfo.snapshot.paramMap.get('id');
    this.adminService.getWellKnownTeaById(this.wellKnownTeaId).subscribe((data) => {
      if (data['status']) {
        this.wellKnownTea = data['data'];
        this.teaImages = this.wellKnownTea['teaImages'];
        this.wellKnownTeaName = this.wellKnownTea['wellKnownTeaName'];
        this.productionPlace = this.wellKnownTea['productionPlace'];
        this.description = this.wellKnownTea['description'];
        this.detailPart = this.wellKnownTea['detailPart'];
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

  // 弹出成功提示框
  showSuccessTip(): void {
    this.isShowSuccessTip = true;
    setTimeout(() => {
      this.successMessage = '';
      this.isShowSuccessTip = false;
      // this.router.navigate(['/home-admin/well-known-tea']);
    }, 2000);
  }

  // 加载图片
  reloadImage(): void {
    this.adminService.findTeaImageByTeaId(this.wellKnownTeaId).subscribe((data) => {
      if (data['status']) {
        this.teaImages = data['data'];
      } else {
        this.errorMessage = data['message'];
        this.showErrorTip();
      }
    }, (err: HttpErrorResponse) => {
      this.handleError(err);
    });
  }

  // 上传图片
  uploadImages(event: any): void {
    this.adminService.addTeaImageByTeaId(event.target.files, this.wellKnownTeaId).subscribe((data) => {
      if (data['status']) {
        this.successMessage = '上传成功';
        this.showSuccessTip();
        this.reloadImage();
      } else {
        this.errorMessage = data['message'];
        this.showErrorTip();
      }
    }, (err: HttpErrorResponse) => {
      this.handleError(err);
    });
  }

  // 删除图片
  deleteTeaImage(imageId: string, imagePath: string): void {
    if (this.teaImages.length <= 1) {
      this.errorMessage = '不能删除所有图片';
      this.showErrorTip();
    } else {
      this.adminService.deleteTeaImageByImageId(imageId, imagePath).subscribe((data) => {
        if (data['status']) {
          this.successMessage = '删除成功';
          this.showSuccessTip();
          this.reloadImage();
        } else {
          this.errorMessage = data['message'];
          this.showErrorTip();
        }
      }, (err: HttpErrorResponse) => {
        this.handleError(err);
      });
    }
  }

  // 修改
  modifyTea(): void {
    console.log(this.description);
    this.adminService.modifyWellKnownTeaById(this.wellKnownTeaId, this.wellKnownTeaName, this.productionPlace, this.description,
       this.detailPart).subscribe((data) => {
        if (data['status']) {
          this.successMessage = '修改成功';
          this.isShowSuccessTip = true;
          setTimeout(() => {
            this.successMessage = '';
            this.isShowSuccessTip = false;
            this.router.navigate(['/home-admin/well-known-tea']);
          }, 1000);
        } else {
          this.errorMessage = data['message'];
          this.showErrorTip();
        }
       }, (err: HttpErrorResponse) => {
         this.handleError(err);
       });
  }

}
