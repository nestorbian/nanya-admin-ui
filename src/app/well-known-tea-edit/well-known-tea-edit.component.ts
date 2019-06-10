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
  categories: any[];
  selectedCategories: any[] = [];
  // 表单
  productName: string;
  productDescription: string;
  productImages: Array<any> = [];
  productOriginalPrice: number;
  productDiscountPrice: number;
  productStock: number;
  flowerMaterial: string;
  productPackage: string;
  productScene: string;
  distribution: string;
  // teaId
  productId: string;

  constructor(private routerInfo: ActivatedRoute, private adminService: AdminService, private router: Router) { }

  ngOnInit() {
    this.productId = this.routerInfo.snapshot.paramMap.get('id');
    window.scrollTo(0, 0);

    this.adminService.findCategoryItems().subscribe((data) => {
      this.categories = data['data'];
    }, (err: HttpErrorResponse) => {
      this.handleError(err);
    });

    this.adminService.findProductById(this.productId).subscribe((data) => {
      const product = data['data'];
      this.productName = product['productName'];
      this.productDescription = product['productDescription'];
      this.productImages = product['productImages'];
      this.productOriginalPrice = product['productOriginalPrice'];
      this.productDiscountPrice = product['productDiscountPrice'];
      this.productStock = product['productStock'];
      this.flowerMaterial = product['flowerMaterial'];
      this.productPackage = product['productPackage'];
      this.productScene = product['productScene'];
      this.distribution = product['distribution'];
      this.selectedCategories = product['categories'];
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
      history.back();
      // this.router.navigate(['/home-admin/product']);
    }, 2000);
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

  onlyNumber(event: any): boolean {
    const code = event.keyCode;
    if (code >= 48 && code <= 57) {
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

  // 修改
  modifyProduct(): void {
    if (this.productImages.length <= 0) {
      this.errorMessage = '请添加图片';
      this.showErrorTip();
      return;
    }

    if (this.selectedCategories.length <= 0) {
      this.errorMessage = '请选择所属分类';
      this.showErrorTip();
      return;
    }

    const product = {productId: this.productId, productName: this.productName, productDescription: this.productDescription,
      productOriginalPrice: this.productOriginalPrice, productDiscountPrice: this.productDiscountPrice,
      productStock: this.productStock, flowerMaterial: this.flowerMaterial, productPackage: this.productPackage,
      productScene: this.productScene, distribution: this.distribution, productImages: this.productImages,
      categories: this.selectedCategories};
    this.adminService.modifyProduct(product).subscribe((data) => {
        this.successMessage = '修改成功';
        this.showSuccessTip();
    }, (err: HttpErrorResponse) => {
      this.handleError(err);
    });
  }

  // 删除图片
  deleteImage(index: number): void {
    this.productImages.splice(index, 1);
  }

  // 上传图片
  uploadImages(event: any): void {
    this.adminService.saveManyImage(event.target.files, 'product').subscribe((data) => {
      const images = data['data'];
      images.forEach(element => {
        this.productImages.push(element);
      });
    }, (err: HttpErrorResponse) => {
      this.handleError(err);
    });
  }

}
