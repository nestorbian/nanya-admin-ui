import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { UserService } from '../service/user.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tea-skill-detail',
  templateUrl: './tea-skill-detail.component.html',
  styleUrls: ['./tea-skill-detail.component.scss']
})
export class TeaSkillDetailComponent implements OnInit {
  // 错误提示弹窗
  isShowErrorTip = false;
  errorMessage: string;
  // data
  teaSkill: any;
  teaSkillId: string;
  readNumber: number;
  collectionClass = 'fa-heart-o';
  collectionSpan = '收藏';
  // userId: string;
  collectionId: string;
  collectionIdArray: string[];
  // 上一篇 下一篇
  preTeaSkill = '';
  nextTeaSkill = '';
  // 成功提示弹窗
  successMessage: string;
  isShowSuccessTip = false;

  constructor(private userService: UserService, private routerInfo: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.teaSkillId = this.routerInfo.snapshot.paramMap.get('id');
    // 获取文章
    this.userService.getTeaSkillById(this.teaSkillId).subscribe((data) => {
      if (data['status']) {
        this.teaSkill = data['data'];
        if (!this.teaSkill) {
          this.router.navigate(['/home/tea-skill']);
        } else {
          // 文章阅读数
          this.readNumber = this.teaSkill['readNumber'] + 1;
          this.userService.updateReadNumberById(this.teaSkillId).subscribe((item) => {
            if (!item['status']) {
              this.errorMessage = item['message'];
              this.showErrorTip();
            }
          }, (err: HttpErrorResponse) => {
            this.handleError(err);
          });
        }
      } else {
        this.errorMessage = data['message'];
        this.showErrorTip();
      }
    }, (err: HttpErrorResponse) => {
      this.handleError(err);
    });
    // 获取用户id
    this.userService.getUserBySession().subscribe((data) => {
      if (data['status']) {
        const user = data['data'];
        if (user) {
          const userId = user['userId'];
          // 是否收藏
          this.userService.getCollectionByUserIdAndTeaSkillId(userId, this.teaSkillId).subscribe((item) => {
            if (item['status']) {
              if (item['data']) {
                this.collectionClass = 'fa-heart red';
                this.collectionSpan = '已收藏';
                this.collectionId = item['data']['collectionId'];
              } else {
                this.collectionClass = 'fa-heart-o';
                this.collectionSpan = '收藏';
              }
            } else {
              this.errorMessage = item['message'];
              this.showErrorTip();
            }
          }, (err: HttpErrorResponse) => {
            this.handleError(err);
          });
        } else {
          // this.router.navigate(['/login'], { queryParams: { path: `/home/tea-skill-detail/${this.teaSkillId}` } });
        }
      } else {
        this.errorMessage = data['message'];
        this.showErrorTip();
      }
    }, (err: HttpErrorResponse) => {
      this.handleError(err);
    });
    // 获取所有文章id
    this.userService.findAllTeaSkillId().subscribe((data) => {
      if (data['status']) {
        this.collectionIdArray = data['data'];
        const index = this.collectionIdArray.indexOf(this.teaSkillId);
        if (index === 0 && this.collectionIdArray.length > 1) {
          this.preTeaSkill = '';
          this.nextTeaSkill = this.collectionIdArray[1];
        } else if (index === 0 && this.collectionIdArray.length === 1) {
        } else if (index === this.collectionIdArray.length - 1 && this.collectionIdArray.length > 1) {
          this.preTeaSkill = this.collectionIdArray[index - 1];
        } else {
          this.preTeaSkill = this.collectionIdArray[index - 1];
          this.nextTeaSkill = this.collectionIdArray[index + 1];
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

  // 收藏
  collect(): void {
    if (this.collectionClass === 'fa-heart-o') {
      this.userService.addCollection(this.teaSkill['teaSkillId']).subscribe((data) => {
        if (data['status']) {
          this.collectionClass = 'fa-heart red';
          this.collectionSpan = '已收藏';
          this.successMessage = '收藏成功';
          this.showSuccessTip();
        } else {
          this.errorMessage = data['message'];
          this.showErrorTip();
        }
      }, (err: HttpErrorResponse) => {
        this.handleError(err);
      });
    } else {
      this.userService.deleteCollectionById(this.collectionId).subscribe((data) => {
        if (data['status']) {
          this.collectionClass = 'fa-heart-o';
          this.collectionSpan = '收藏';
        } else {
          this.errorMessage = data['message'];
          this.showErrorTip();
        }
      }, (err: HttpErrorResponse) => {
        this.handleError(err);
      });
    }
  }

  preSkill(): void {
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(['/home/tea-skill-detail', this.preTeaSkill]);
    setTimeout(() => {
      this.ngOnInit();
    }, 500);
  }

  nextSkill(): void {
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(['/home/tea-skill-detail', this.nextTeaSkill]);
    setTimeout(() => {
      this.ngOnInit();
    }, 500);
  }
}
