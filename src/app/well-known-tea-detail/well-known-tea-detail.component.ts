import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../service/user.service';
import { HttpErrorResponse } from '@angular/common/http/src/response';
import { Router } from '@angular/router';

@Component({
  selector: 'app-well-known-tea-detail',
  templateUrl: './well-known-tea-detail.component.html',
  styleUrls: ['./well-known-tea-detail.component.scss']
})
export class WellKnownTeaDetailComponent implements OnInit {

  // 错误提示弹窗
  isShowErrorTip = false;
  errorMessage: string;
  // wellKnownTea
  wellKnownTea: any;
  teaImages: any[] = [];
  wellknownTeaId: string;
  constructor(private routerInfo: ActivatedRoute, private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.wellknownTeaId = this.routerInfo.snapshot.paramMap.get('id');
    if (!this.wellknownTeaId) {
      this.router.navigate(['/home/index']);
    }
    this.userService.getWellKnownTeaById(this.wellknownTeaId).subscribe((data) => {
      if (data['status']) {
        if (!data['data']) {
          this.router.navigate(['/home/index']);
        } else {
          this.wellKnownTea = data['data'];
          this.teaImages = this.wellKnownTea.teaImages;
        }
      } else {
        this.errorMessage = data['message'];
        this.showErrorTip();
      }
    }, (err: HttpErrorResponse) => {
      this.handleError(err);
    });
    window.scrollTo(0, 0);
  }

  reloadImages(): void {
    this.userService.findTeaImageByTeaId(this.wellknownTeaId).subscribe((data) => {
      if (data['status']) {
        this.teaImages = data['data'];
        console.log(this.teaImages);
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

  download(imageId: string): void {
    location.href = `/tea/download/${imageId}`;
    setTimeout(() => {
      this.reloadImages();
    }, 1000);
  }

}
