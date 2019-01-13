import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { UserService } from '../service/user.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-notice-detail',
  templateUrl: './notice-detail.component.html',
  styleUrls: ['./notice-detail.component.scss']
})
export class NoticeDetailComponent implements OnInit {

  // 错误提示弹窗
  isShowErrorTip = false;
  errorMessage: string;
  // 路由获取
  commentId: string;
  replyId: string;
  // session获取ownId
  ownId = '';
  // data
  noticeDetail: any;
  comment: any;
  post: any;
  // 成功提示弹窗
  successMessage: string;
  isShowSuccessTip = false;
  // 发帖框
  expressionArray = [
    ['/assets/expressions/i_f01.png', '/assets/expressions/i_f02.png', '/assets/expressions/i_f03.png', '/assets/expressions/i_f04.png',
    '/assets/expressions/i_f05.png', '/assets/expressions/i_f06.png', '/assets/expressions/i_f07.png', '/assets/expressions/i_f08.png',
    '/assets/expressions/i_f09.png', '/assets/expressions/i_f10.png'],
    ['/assets/expressions/i_f11.png', '/assets/expressions/i_f12.png', '/assets/expressions/i_f13.png', '/assets/expressions/i_f14.png',
    '/assets/expressions/i_f15.png', '/assets/expressions/i_f16.png', '/assets/expressions/i_f17.png', '/assets/expressions/i_f18.png',
    '/assets/expressions/i_f19.png', '/assets/expressions/i_f20.png'],
    ['/assets/expressions/i_f21.png', '/assets/expressions/i_f22.png', '/assets/expressions/i_f23.png', '/assets/expressions/i_f24.png',
    '/assets/expressions/i_f25.png', '/assets/expressions/i_f26.png', '/assets/expressions/i_f27.png', '/assets/expressions/i_f28.png',
    '/assets/expressions/i_f29.png', '/assets/expressions/i_f30.png'],
    ['/assets/expressions/i_f31.png', '/assets/expressions/i_f32.png', '/assets/expressions/i_f33.png', '/assets/expressions/i_f34.png',
    '/assets/expressions/i_f35.png', '/assets/expressions/i_f36.png', '/assets/expressions/i_f37.png', '/assets/expressions/i_f38.png',
    '/assets/expressions/i_f39.png', '/assets/expressions/i_f40.png'],
    ['/assets/expressions/i_f41.png', '/assets/expressions/i_f42.png', '/assets/expressions/i_f43.png', '/assets/expressions/i_f44.png',
    '/assets/expressions/i_f45.png', '/assets/expressions/i_f46.png', '/assets/expressions/i_f47.png', '/assets/expressions/i_f48.png',
    '/assets/expressions/i_f49.png', '/assets/expressions/i_f50.png']
  ];
  isShowExpression = false;
  // 回复框
  replyExpressionArray: HTMLCollection;
  replyInputArray: HTMLCollection;
  replyDivArray: HTMLCollection;
  replyContent = '';
  replyReceiver = '';
  // 预览人物
  previewUserInfo: any;

 constructor(private userService: UserService, private routerInfo: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.commentId = this.routerInfo.snapshot.queryParamMap.get('commentId');
    this.replyId = this.routerInfo.snapshot.queryParamMap.get('replyId');
    this.noticeDetail = null;
    this.comment = null;
    this.post = null;
    this.userService.getUserBySession().subscribe((data) => {
      if (data['status']) {
        const user = data['data'];
        if (user) {
          this.ownId = user['userId'];
        } else {
          // this.router.navigate(['/login'], { queryParams: { path: `/home/communication-region` } });
        }
      } else {
        this.errorMessage = data['message'];
        this.showErrorTip();
      }
    }, (err: HttpErrorResponse) => {
      this.handleError(err);
    });
    this.onloadData();
  }

  // 加载数据
  onloadData(): void {
    if (this.commentId && !this.replyId) {
      this.userService.getNoticeDetailByCommentId(this.commentId).subscribe((data) => {
        if (data['status']) {
          this.noticeDetail = data['data'];
          if (this.noticeDetail) {
            this.comment = this.noticeDetail.comment;
            this.post = this.noticeDetail.post;
          } else {
            this.errorMessage = '该条信息已被删除';
            this.isShowErrorTip = true;
            setTimeout(() => {
              this.errorMessage = '';
              this.isShowErrorTip = false;
              this.router.navigate(['/home/communication-region']);
            }, 1000);
          }
        } else {
          this.errorMessage = data['message'];
          this.showErrorTip();
        }
      }, (err: HttpErrorResponse) => {
        this.handleError(err);
      });
    } else {
      this.userService.getNoticeDetailByReplyId(this.replyId).subscribe((data) => {
        if (data['status']) {
          this.noticeDetail = data['data'];
          if (this.noticeDetail) {
            this.comment = this.noticeDetail.comment;
            this.post = this.noticeDetail.post;
          } else {
            this.errorMessage = '该条信息已被删除';
            this.isShowErrorTip = true;
            setTimeout(() => {
              this.errorMessage = '';
              this.isShowErrorTip = false;
              this.router.navigate(['/home/communication-region']);
            }, 1000);
          }
        }
      }, (err: HttpErrorResponse) => {
        this.handleError(err);
      });
    }
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

  // 获取回复内容
  replyDiv(event: any): void {
    this.replyContent = event.target.innerHTML.replace(/\n/g, '<br>');
  }

  // 显示回复输入区域
  toggleReplyInput(receiver: string): void {
    this.replyContent = '';
    const expressionReply = window.document.getElementById('expressionReply');
    const replyInput = window.document.getElementById('replyInput');
    const replyDiv = window.document.getElementById('replyDiv');
    expressionReply.style.display = 'none';
    replyInput.style.display = 'block';
    replyDiv.style.display = 'block';
    this.replyReceiver = receiver;
    window.scrollTo(0, replyInput['offsetTop'] - 300);
  }

  // 添加回复表情
  addReplyExpression(expression: any): void {
    const expressionReply = window.document.getElementById('expressionReply');
    if (this.replyContent.indexOf('</div>') >= 0) {
      this.replyContent = this.replyContent.substring(0, this.replyContent.length - 6) + `<img src=${expression} /></div>`;
    } else {
      this.replyContent += `<img src=${expression} />`;
    }
    expressionReply['style'].display = 'none';
  }

  // 显示回复表情区域
  toggleReplyExpression(): void {
    const expressionReply = window.document.getElementById('expressionReply');
    if (expressionReply['style'].display === 'block') {
      expressionReply['style'].display = 'none';
    } else {
      expressionReply['style'].display = 'block';
    }
  }

  // 隐藏回复表情区域
  hideReplyExpression(): void {
    const expressionReply = window.document.getElementById('expressionReply');
    expressionReply['style'].display = 'none';
  }

  // 回复
  addReply(commentId: string): void {
    if (this.replyContent) {
      this.userService.addReply(this.replyContent, this.replyReceiver, commentId).subscribe((data) => {
        if (data['status']) {
          this.replyContent = '';
          this.successMessage = '发表成功';
          this.showSuccessTip();
           this.onloadData();
        } else {
          this.errorMessage = data['message'];
          this.showErrorTip();
        }
      }, (err: HttpErrorResponse) => {
        this.handleError(err);
      });
    } else {
      this.errorMessage = '回复内容不能为空';
      this.showErrorTip();
    }
  }

  // 删除评论
  deleteComment(commentId: string): void {
    this.userService.deleteCommentById(commentId).subscribe((data) => {
      if (data['status']) {
        this.successMessage = '删除成功';
        this.showSuccessTip();
         this.onloadData();
      } else {
        this.errorMessage = data['message'];
        this.showErrorTip();
      }
    }, (err: HttpErrorResponse) => {
      this.handleError(err);
    });
  }

  // 删除回复
  deleteReply(replyId: string): void {
    this.userService.deleteReplyById(replyId).subscribe((data) => {
      if (data['status']) {
        this.successMessage = '删除成功';
        this.showSuccessTip();
         this.onloadData();
      } else {
        this.errorMessage = data['message'];
        this.showErrorTip();
      }
    }, (err: HttpErrorResponse) => {
      this.handleError(err);
    });
  }

  // 预览信息
  previewUser(user: any): void {
    this.previewUserInfo = user;
    const modal = document.getElementById('myModal');
    modal.style.display = 'block';
  }

  // 关闭预览信息
  closePreview(): void {
    const modal = document.getElementById('myModal');
    modal.style.display = 'none';
  }
}
