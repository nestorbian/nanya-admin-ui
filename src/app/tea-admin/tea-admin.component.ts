import { Component, OnInit } from '@angular/core';
import { AdminService } from '../service/admin.service';
import { HttpErrorResponse } from '@angular/common/http/src/response';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tea-admin',
  templateUrl: './tea-admin.component.html',
  styleUrls: ['./tea-admin.component.scss']
})
export class TeaAdminComponent implements OnInit {
  isShowChildMenu = false;
  ChildMenuStyle = '';
  isShowChildSettingMenu = false;
  ChildSettingMenuStyle = '';
  // active control
  categoryActive = true;
  wellKnownTeaActive = false;
  tenFamousTeaActive = false;
  teaSetNewsActive = false;
  teaSkillActive = false;
  teaLeafNewsActive = false;
  userActive = false;
  citySkinActive = false;
  defaultSkinActive = false;
  cloudySkinActive = false;
  palmSkinActive = false;
  postActive = false;
  // 错误提示弹窗
  isShowErrorTip = false;
  errorMessage: string;
  // 皮肤控制
  menuSkin = '/assets/images/bg-palm-light.png';
  titleSkin = 'transparent';
  topSkin = '#00bcd4';
  // 管理员信息
  admin: any;
  constructor(private adminService: AdminService, private router: Router) { }

  ngOnInit() {
    this.adminService.getUserFromSession().subscribe((data) => {
      if (data['data']) {
        this.admin = data['data'];
      } else {
        this.router.navigate(['/login']);
      }
    }, (err: HttpErrorResponse) => {
      this.handleError(err);
    });
  }

  showChildMenu(): void {
    this.categoryActive = false;
    this.wellKnownTeaActive = false;
    this.tenFamousTeaActive = false;
    this.teaSetNewsActive = false;
    this.teaSkillActive = false;
    this.teaLeafNewsActive = false;
    this.userActive = false;
    this.isShowChildSettingMenu = false;
    this.citySkinActive = false;
    this.defaultSkinActive = false;
    this.cloudySkinActive = false;
    this.palmSkinActive = false;
    this.postActive = false;
    this.isShowChildMenu = !this.isShowChildMenu;
  }

  showChildSettingMenu(): void {
    this.categoryActive = false;
    this.wellKnownTeaActive = false;
    this.tenFamousTeaActive = false;
    this.teaSetNewsActive = false;
    this.teaSkillActive = false;
    this.teaLeafNewsActive = false;
    this.userActive = false;
    this.isShowChildMenu = false;
    this.citySkinActive = false;
    this.defaultSkinActive = false;
    this.cloudySkinActive = false;
    this.palmSkinActive = false;
    this.postActive = false;
    this.isShowChildSettingMenu = !this.isShowChildSettingMenu;
  }

  clearActive(): void {
    this.categoryActive = false;
    this.wellKnownTeaActive = false;
    this.tenFamousTeaActive = false;
    this.teaSetNewsActive = false;
    this.teaSkillActive = false;
    this.teaLeafNewsActive = false;
    this.userActive = false;
    this.isShowChildMenu = false;
    this.isShowChildSettingMenu = false;
    this.citySkinActive = false;
    this.defaultSkinActive = false;
    this.cloudySkinActive = false;
    this.palmSkinActive = false;
    this.postActive = false;
  }

  // 弹出错误提示框
  showErrorTip(): void {
    this.isShowErrorTip = true;
    setTimeout(() => {
      this.errorMessage = '';
      this.isShowErrorTip = false;
    }, 3000);
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

  // 登出
  logout(): void {
    this.adminService.logout().subscribe((data) => {
      if (data['status'] === 0) {
        this.router.navigate(['/login']);
      } else {
        this.errorMessage = data['message'];
        this.showErrorTip();
      }
      // location.href = '/login';
    }, (err: HttpErrorResponse) => {
      this.handleError(err);
    });
  }

  modifySkin(a: string, b: string, c: string): void {
    this.menuSkin = a;
    this.topSkin = b;
    this.titleSkin = c;
  }
}
