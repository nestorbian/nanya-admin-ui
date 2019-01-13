import { Component, OnInit } from '@angular/core';
import { UserService } from '../service/user.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-tea',
  templateUrl: './tea.component.html',
  styleUrls: ['./tea.component.scss']
})
export class TeaComponent implements OnInit {
  webSocket: WebSocket;
  opacity = '1';
  // 错误提示弹窗
  isShowErrorTip = false;
  errorMessage: string;
  // 消息
  messageNumber = 0;
  noticeList: any[] = [];
  msgs: any[] = [];
  noticeAtOnce: any;
  // nav skin
  backgroundColor = '#e5dcd3';
  backgroundRepeat = 'no-repeat';
  backgroundImage = 'url(/assets/images/nav-skin.jpg)';
  // id
  userId: string;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.userService.getUserBySession().subscribe((data) => {
      if (data['status']) {
        const user = data['data'];
        if (user) {
          this.userId = user['userId'];
          this.onloadData();
          // socket
          this.webSocket = new WebSocket('ws://localhost:8888/notice');
          // 连接发生错误的回调方法
          this.webSocket.onerror = () => {
            console.log('error');
          };
          // 连接成功建立的回调方法
          this.webSocket.onopen = function(event) {
            console.log('open');
          };
          // 接收到消息的回调方法
          this.webSocket.onmessage = (event) => {
            this.messageNumber += 1;
            this.noticeAtOnce = JSON.parse(event.data);
            this.noticeAtOnce['content'] = JSON.parse(this.noticeAtOnce['content']);
            this.noticeList.push(this.noticeAtOnce);
            this.msgs = [];
            if (this.noticeAtOnce['noticeType'] === 1) {
              this.msgs.push({severity: 'info', summary: this.noticeAtOnce['content']['user']['userName'] + '评论你',
              detail: this.noticeAtOnce['content']['content']});
            } else {
              this.msgs.push({severity: 'info', summary: this.noticeAtOnce['content']['sendUser']['userName'] + '回复你',
              detail: this.noticeAtOnce['content']['content']});
            }
          };
          // 连接关闭的回调方法
          this.webSocket.onclose = () => {
             console.log('close');
          };
        } else {
          this.userId = '';
        }
      } else {
        this.errorMessage = data['message'];
        this.showErrorTip();
      }
    }, (err: HttpErrorResponse) => {
      this.handleError(err);
    });

    // window.onmousewheel = document.onmousewheel = this.scrollFunc;

    // if (document.addEventListener) {
    //   document.addEventListener('DOMMouseScroll', this.scrollFunc, false);
    // }
  }

  onloadData(): void {
    this.userService.findNoticeByReceiver(this.userId).subscribe((data) => {
      if (data['status']) {
        this.noticeList = data['data'];
        this.messageNumber = this.noticeList.length;
        this.noticeList.forEach(element => {
          element['content'] = JSON.parse(element['content']);
        });
      } else {
        this.errorMessage = data['message'];
        this.showErrorTip();
      }
    }, (err: HttpErrorResponse) => {
      this.handleError(err);
    });
  }

  // scrollFunc(): void {
  //   const nav = document.getElementById('nav');
  //   if (nav) {
  //     if (document.documentElement.scrollTop > 84) {
  //       nav.style.opacity = '1';
  //     } else {
  //       nav.style.opacity = '0.6';
  //     }
  //   }
  // }

  // 登出
  logout(): void {
    this.userService.logout().subscribe((data) => {
      this.router.navigate(['/login']);
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

  // 发送消息
  //   function send(){
  //     var message = document.getElementById('text').value;
  //     websocket.send(message);
  // }

  deleteNotice(noticeId): void {
    this.userService.deleteNoticeById(noticeId).subscribe((data) => {
      if (data['status']) {
        this.onloadData();
      } else {
        this.errorMessage = data['message'];
        this.showErrorTip();
      }
    }, (err: HttpErrorResponse) => {
      this.handleError(err);
    });
  }

  reply(noticeId: string, noticeType: number, id: string): void {
    this.deleteNotice(noticeId);
    if (noticeType === 1) {
      if (location.href.indexOf('notice-detail') >= 0) {
        location.href = `/home/notice-detail?commentId=${id}`;
      } else {
        this.router.navigate(['/home/notice-detail'], {queryParams: {commentId: id}});
      }
    } else {
      if (location.href.indexOf('notice-detail') >= 0) {
        location.href = `/home/notice-detail?replyId=${id}`;
      } else {
        this.router.navigate(['/home/notice-detail'], {queryParams: {replyId: id}});
      }
    }
  }

  replyAtOnce(): void {
    this.deleteNotice(this.noticeAtOnce.noticeId);
    if (this.noticeAtOnce.noticeType === 1) {
      if (location.href.indexOf('notice-detail') >= 0) {
        location.href = `/home/notice-detail?commentId=${this.noticeAtOnce.content.commentId}`;
      } else {
        this.router.navigate(['/home/notice-detail'], {queryParams: {commentId: this.noticeAtOnce.content.commentId}});
      }
    } else {
      if (location.href.indexOf('notice-detail') >= 0) {
        location.href = `/home/notice-detail?replyId=${this.noticeAtOnce.content.replyId}`;
      } else {
        this.router.navigate(['/home/notice-detail'], {queryParams: {replyId: this.noticeAtOnce.content.replyId}});
      }
    }
  }

  // cahnge skin
  changeSkin(a: string, b: string, c: string): void {
    this.backgroundColor = a;
    this.backgroundRepeat = b;
    this.backgroundImage = c;
  }
}
