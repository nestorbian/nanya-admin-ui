import { Component, OnInit } from '@angular/core';
import { UserService } from '../service/user.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { element } from 'protractor';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.scss']
})
export class PostDetailComponent implements OnInit {

  // 错误提示弹窗
  isShowErrorTip = false;
  errorMessage: string;
  // 路由获取postId
  postId: string;
  // session获取ownId
  ownId = '';
  // form
  // commentContent = '';
  post: any;
  // 成功提示弹窗
  successMessage: string;
  isShowSuccessTip = false;
  // 分页
  pageNum = 1;
  pageSize = 10;
  pages: number;
  commentList: any[];
  total: number;
  pageForSkip = '1';
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
  isShowLink = false;
  linkName: string;
  linkAddress: string;
  // 回复框
  replyExpressionArray: HTMLCollection;
  replyInputArray: HTMLCollection;
  replyDivArray: HTMLCollection;
  replyContent = '';
  replyReceiver = '';
  // 光标
  selection: any;
  range: any;
  // 预览人物
  previewUserInfo: any;
  constructor(private userService: UserService, private routerInfo: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.postId = this.routerInfo.snapshot.paramMap.get('id');
    this.userService.getPostById(this.postId).subscribe((data) => {
      if (data['status']) {
        if (data['data']) {
          this.post = data['data'];
        } else {
          this.router.navigate(['/home/communication-region']);
        }
      } else {
        this.errorMessage = data['message'];
        this.showErrorTip();
      }
    }, (err: HttpErrorResponse) => {
      this.handleError(err);
    });
    this.userService.getUserBySession().subscribe((data) => {
      if (data['status']) {
        const user = data['data'];
        if (user) {
          this.ownId = user['userId'];
        } else {
          // this.router.navigate(['/login'], { queryParams: { path: `/home/post-detail/${this.postId}` } });
        }
      } else {
        this.errorMessage = data['message'];
        this.showErrorTip();
      }
    }, (err: HttpErrorResponse) => {
      this.handleError(err);
    });
    this.onloadData(1, this.pageSize);
    window.scrollTo(0, 0);
  }

  // 加载数据
  onloadData(pageNum: number, pageSize: number): void {
    this.userService.findCommentByPostId(pageNum, pageSize, this.postId).subscribe((data) => {
      if (data['status']) {
        const pageInfo = data['data'];
        this.commentList = pageInfo['list'];
        this.pages = pageInfo['pages'];
        this.pageNum = pageInfo['pageNum'];
        this.total = pageInfo['total'];
        this.hideReplyAndExpressionArea();
      } else {
        this.errorMessage = data['message'];
        this.showErrorTip();
      }
    }, (err: HttpErrorResponse) => {
      this.handleError(err);
    });
  }

  // 隐藏回复区域和表情区域
  hideReplyAndExpressionArea(): void {
    setTimeout(() => {
      this.replyExpressionArray = window.document.getElementsByClassName('expression-reply');
      this.replyInputArray = window.document.getElementsByClassName('reply-input');
      this.replyDivArray = window.document.getElementsByClassName('reply-div');
    }, 100);
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

  // 获取评论内容
  // div(event: any): void {
  //   this.commentContent = event.target.innerHTML.replace(/\n/g, '<br>');
  // }

  // 获取回复内容
  replyDiv(event: any): void {
    this.replyContent = event.target.innerHTML.replace(/\n/g, '<br>');
  }

  // 添加表情
  addExpression(expression: any): void {
    this.isShowExpression = false;
    // if (this.commentContent.indexOf('</div>') >= 0) {
    //   this.commentContent = this.commentContent.substring(0, this.commentContent.length - 6) + `<img src=${expression} /></div>`;
    // } else {
    //   this.commentContent += `<img src=${expression} />`;
    // }
    this._insertimg(`<img src=${expression} />`);
  }

  // 选择图片
  chooseImage(): void {
    document.getElementById('image').click();
  }

  // 添加图片
  addImage(event: any): void {
    this.userService.uploadImage(event.target.files[0]).subscribe((data) => {
      if (data['status']) {
        const url = data['data'];
        // if (this.commentContent.indexOf('</div>') >= 0) {
        //   this.commentContent = this.commentContent.substring(0, this.commentContent.length - 6) +
        //  `<img src=${url} width='560' /></div>`;
        // } else {
        //   this.commentContent += `<img src=${url} width='560' />`;
        // }
        this._insertimg(`<img src=${url} width='560' />`);
      } else {
        this.errorMessage = data['message'];
        this.showErrorTip();
      }
    }, (err: HttpErrorResponse) => {
      this.handleError(err);
    });
  }

   // 上一页
   prePage(): void {
    if (this.pageNum > 1) {
      this.onloadData(this.pageNum - 1, this.pageSize);
      window.scrollTo(0, 0);
    }
  }

  // 下一页
  nextPage(): void {
    if (this.pageNum < this.pages) {
      this.onloadData(this.pageNum + 1, this.pageSize);
      window.scrollTo(0, 0);
    }
  }

  // 跳页
  skipPage(pageNum: number): void {
    this.onloadData(pageNum, this.pageSize);
    window.scrollTo(0, 0);
  }

  // 跳指定页
  goPage(): void {
    const reg = /^[1-9]\d*$/;
    if (reg.test(this.pageForSkip)) {
      if (parseInt(this.pageForSkip, 10) > this.pages) {
        this.pageForSkip = this.pages.toString();
        this.skipPage(parseInt(this.pageForSkip, 10));
      } else {
        this.skipPage(parseInt(this.pageForSkip, 10));
      }
    } else {
      this.pageForSkip = '1';
      alert('输入格式不正确，请输入正整数');
    }
  }

  // 移动到评论框
  moveToComment(): void {
    window.scrollTo(0, document.getElementById('post')['offsetTop'] - 200);
  }

  // 添加链接
  addLink(): void {
    if (this.linkAddress.indexOf('https://') !== 0) {
      this.linkAddress = 'https://' + this.linkAddress;
    }
    // if (this.commentContent.indexOf('</div>') >= 0) {
    //   this.commentContent = this.commentContent.substring(0, this.commentContent.length - 6)
    //                  + `<a href=${this.linkAddress} target='_blank' alt='loading' />${this.linkName}</a></div>`;
    // } else {
    //   this.commentContent += `<a href=${this.linkAddress} target='_blank'  alt='loading' />${this.linkName}</a>`;
    // }
    this._insertimg(`<a href=${this.linkAddress} target='_blank'  alt='loading' />${this.linkName}</a>`);
    this.isShowLink = false;
  }

  // 评论
  addComment(): void {
    const commentContent = document.getElementById('edit').innerHTML.replace(/\n/g, '<br>');
    if (commentContent.length <= 1000 && commentContent.length > 0) {
      this.userService.addComment(commentContent, this.post.sender, this.postId).subscribe((data) => {
        if (data['status']) {
          document.getElementById('edit').innerHTML = '';
          this.successMessage = '发表成功';
          this.showSuccessTip();
          this.onloadData(this.pageNum, this.pageSize);
        } else {
          this.errorMessage = data['message'];
          this.showErrorTip();
        }
      }, (err: HttpErrorResponse) => {
        this.handleError(err);
      });
    } else if (commentContent.length === 0) {
      this.errorMessage = '内容不能为空';
      this.showErrorTip();
    } else {
      this.errorMessage = '内容不能超过1000字';
      this.showErrorTip();
    }
  }

  // 显示回复输入区域
  toggleReplyInput(commentIndex: number, receiver: string): void {
    this.replyContent = '';
    for (let i = 0; i < this.replyExpressionArray.length; i ++) {
      this.replyExpressionArray[i]['style'].display = 'none';
      this.replyInputArray[i]['style'].display = 'none';
      this.replyDivArray[i]['style'].display = 'none';
   }
    this.replyInputArray[commentIndex]['style'].display = 'block';
    this.replyDivArray[commentIndex]['style'].display = 'block';
    this.replyReceiver = receiver;
    window.scrollTo(0, this.replyInputArray[commentIndex]['offsetTop'] - 300);
  }

  // 添加回复表情
  addReplyExpression(expression: any, commentIndex: number): void {
    if (this.replyContent.indexOf('</div>') >= 0) {
      this.replyContent = this.replyContent.substring(0, this.replyContent.length - 6) + `<img src=${expression} /></div>`;
    } else {
      this.replyContent += `<img src=${expression} />`;
    }
    this.replyExpressionArray[commentIndex]['style'].display = 'none';
  }

  // 显示回复表情区域
  toggleReplyExpression(commentIndex: number): void {
    if (this.replyExpressionArray[commentIndex]['style'].display === 'block') {
      this.replyExpressionArray[commentIndex]['style'].display = 'none';
    } else {
      this.replyExpressionArray[commentIndex]['style'].display = 'block';
    }
  }

  // 隐藏回复表情区域
  hideReplyExpression(commentIndex: number): void {
    this.replyExpressionArray[commentIndex]['style'].display = 'none';
  }

  // 回复
  addReply(commentId: string): void {
    if (this.replyContent) {
      this.userService.addReply(this.replyContent, this.replyReceiver, commentId).subscribe((data) => {
        if (data['status']) {
          this.replyContent = '';
          this.successMessage = '发表成功';
          this.showSuccessTip();
          this.onloadData(this.pageNum, this.pageSize);
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

  // 删除帖子
  deletePost(): void {
    this.userService.deletePostById(this.postId).subscribe((data) => {
      if (data['status']) {
        this.successMessage = '删除成功';
        this.showSuccessTip();
        this.router.navigate(['/home/communication-region']);
      } else {
        this.errorMessage = data['message'];
        this.showErrorTip();
      }
    }, (err: HttpErrorResponse) => {
      this.handleError(err);
    });
  }

  // 删除评论
  deleteComment(commentId: string): void {
    this.userService.deleteCommentById(commentId).subscribe((data) => {
      if (data['status']) {
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

  // 删除回复
  deleteReply(replyId: string): void {
    this.userService.deleteReplyById(replyId).subscribe((data) => {
      if (data['status']) {
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

  // 锁定编辑器中鼠标光标位置。。
  _insertimg(str) {
    if (!window.getSelection) {
      document.getElementById('edit').focus();
      this.range.pasteHTML(str);
      this.range.collapse(false);
      this.range.select();
    } else {
    document.getElementById('edit').focus();
    this.range.collapse(false);
    const hasR = this.range.createContextualFragment(str);
    let hasR_lastChild = hasR.lastChild;
    while (hasR_lastChild && hasR_lastChild.nodeName.toLowerCase() === 'br' && hasR_lastChild.previousSibling &&
    hasR_lastChild.previousSibling.nodeName.toLowerCase() === 'br') {
      const e = hasR_lastChild;
      hasR_lastChild = hasR_lastChild.previousSibling;
      hasR.removeChild(e);
    }
    this.range.insertNode(hasR);
    if (hasR_lastChild) {
      this.range.setEndAfter(hasR_lastChild);
      this.range.setStartAfter(hasR_lastChild);
    }
    this.selection.removeAllRanges();
    this.selection.addRange(this.range);
    }
  }

  // 设置光标
  setSelectionAndRang(): void {
    // 获取选定对象
    this.selection = window.getSelection ? window.getSelection() : document['selection'];
    // 设置最后光标对象
    this.range = this.selection.createRange ? this.selection.createRange() : this.selection.getRangeAt(0);
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

  // 只能输入数字
  removeChar(event: any): boolean {
    const code = event.keyCode;
    if (code < 48 || code > 57) {
      return false;
    } else {
      return true;
    }
  }
}
