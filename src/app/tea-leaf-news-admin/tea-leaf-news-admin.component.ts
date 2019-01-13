import { Component, OnInit } from '@angular/core';
import { AdminService } from '../service/admin.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-tea-leaf-news-admin',
  templateUrl: './tea-leaf-news-admin.component.html',
  styleUrls: ['./tea-leaf-news-admin.component.scss']
})
export class TeaLeafNewsAdminComponent implements OnInit {
  // 遮罩层
  isShowBlock = false;
  // 添加对话框
  isShowAddModule = false;
  // 修改对话框
  isShowModifyModule = false;
  dataIdForModify: string;
  // 删除对话框
  isShowDeleteModule = false;
  dataIdForDelete: string;
  // 表单信息
  dataName: string;
  price: number;
  address: string;
  phone: number;
  surveyTime: Date;
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
  total: number;
  teaLeafDataList: any[];
  pageForSkip = '1';
  // 资讯分页
  pageNumForNews = 1;
  pageSizeForNews = 5;
  pagesForNews: number;
  totalForNews: number;
  pageForSkipForNews = '1';
  teaLeafNewsList: any[];
  // 日期选择框
  rangeDates: Date[];
  maxDate: Date = new Date();
  // en
  en: any;

  constructor(private adminService: AdminService) { }

  ngOnInit() {
    this.en = {
      firstDayOfWeek: 0,
      dayNames: ['日', '一', '二', '三', '四', '五', '六'],
      dayNamesShort: ['日', '一', '二', '三', '四', '五', '六'],
      dayNamesMin: ['日', '一', '二', '三', '四', '五', '六'],
      monthNames: [ '1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月' ],
      monthNamesShort: [ '1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月' ],
      today: '今天',
      clear: '清除'
    };
    this.onloadData(this.pageNum, this.pageSize);
    this.onloadNews(this.pageNumForNews, this.pageSizeForNews);
  }

  // 加载数据
  onloadData(pageNum: number, pageSize: number): void {
    this.adminService.findAllTeaLeafData(pageNum, pageSize).subscribe((data) => {
      const pageInfo = data['data'];
      this.teaLeafDataList = pageInfo['list'];
      this.pages = pageInfo['pages'];
      this.pageNum = pageInfo['pageNum'];
      this.total = pageInfo['total'];
    }, (err: HttpErrorResponse) => {
      this.handleError(err);
    });
  }

  onloadNews(pageNum: number, pageSize: number): void {
    this.adminService.findAllTeaLeafNews(pageNum, pageSize).subscribe((item) => {
      if (item['status']) {
        const pageInfo = item['data'];
        this.teaLeafNewsList = pageInfo['list'];
        this.pagesForNews = pageInfo['pages'];
        this.pageNumForNews = pageInfo['pageNum'];
        this.totalForNews = pageInfo['total'];
      } else {
        this.errorMessage = item['message'];
        this.showErrorTip();
      }
    }, (err: HttpErrorResponse) => {
      this.handleError(err);
    });
  }

  // 取消添加对话框
  cancelAddModule(): void {
    this.isShowAddModule = false;
    this.isShowBlock = false;
    this.dataName = '';
    this.price = null;
    this.address = '';
    this.phone = null;
    this.surveyTime = null;
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

  prePageForNews(): void {
    if (this.pageNumForNews > 1) {
      this.onloadNews(this.pageNumForNews - 1, this.pageSizeForNews);
    }
  }

  // 下一页
  nextPage(): void {
    if (this.pageNum < this.pages) {
      this.onloadData(this.pageNum + 1, this.pageSize);
    }
  }

  nextPageForNews(): void {
    if (this.pageNumForNews < this.pagesForNews) {
      this.onloadNews(this.pageNumForNews + 1, this.pageSizeForNews);
    }
  }

  // 跳页
  skipPage(pageNum: number): void {
    this.onloadData(pageNum, this.pageSize);
  }

  skipPageForNews(pageNum: number): void {
    this.onloadNews(pageNum, this.pageSizeForNews);
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

  goPageForNews(): void {
    const reg = /^[1-9]\d*$/;
    if (reg.test(this.pageForSkipForNews)) {
      if (parseInt(this.pageForSkipForNews, 10) > this.pagesForNews) {
        this.pageForSkipForNews = this.pagesForNews.toString();
        this.skipPageForNews(parseInt(this.pageForSkipForNews, 10));
      } else {
        this.skipPageForNews(parseInt(this.pageForSkipForNews, 10));
      }
    } else {
      this.pageForSkipForNews = '1';
      alert('输入格式不正确，请输入正整数');
    }
  }

  // 显示删除对话框
  deleteTeaLeafData(dataId: string): void {
    this.dataIdForDelete = dataId;
    this.isShowBlock = true;
    this.isShowDeleteModule = true;
  }

  // 取消删除
  cancelDeleteModule(): void {
    this.dataIdForDelete = '';
    this.isShowBlock = false;
    this.isShowDeleteModule = false;
  }

  // 删除轮播信息
  confirmDeleteTeaLeafData(): void {
    this.adminService.deleteTeaLeafDataById(this.dataIdForDelete).subscribe((data) => {
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
  addTeaLeafData(): void {
    const regex = /^1[3|4|5|8][0-9]\d{4,8}$/;
    if (regex.test(this.phone.toString())) {
      this.adminService.addTeaLeafData(this.dataName, this.price, this.address, this.phone, this.surveyTime).subscribe((data) => {
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
    } else {
      alert('手机号码格式错误');
    }
  }

  // 显示修改的模块
  showModifyModule(dataId: string): void {
    this.adminService.getTeaLeafDataById(dataId).subscribe((data) => {
      if (data['status']) {
        const teaLeafData = data['data'];
        this.dataIdForModify = teaLeafData.dataId;
        this.dataName = teaLeafData.dataName;
        this.price = teaLeafData.price;
        this.address = teaLeafData.address;
        this.phone = teaLeafData.phone;
        this.surveyTime = new Date(teaLeafData.surveyTime);
        this.isShowModifyModule = true;
        this.isShowBlock = true;
      } else {
        this.errorMessage = data['message'];
        this.showErrorTip();
      }
    }, (err: HttpErrorResponse) => {
      this.handleError(err);
    });
  }

  // 提交修改轮播表单
  modifyTeaLeafDataById(): void {
    this.adminService.updateTeaLeafDataById(this.dataIdForModify, this.dataName, this.price, this.address, this.phone,
       this.surveyTime).subscribe((data) => {
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
    this.dataName = '';
    this.price = null;
    this.address = '';
    this.phone = null;
    this.surveyTime = null;
  }

  generateTeaLeafNews(): void {
    if (!this.rangeDates || this.rangeDates.length < 2 || this.rangeDates[1] === null) {
      this.errorMessage = '请选择正确的日期范围';
      this.showErrorTip();
    } else {
      this.adminService.generateTeaLeafNews(this.rangeDates[0], this.rangeDates[1]).subscribe((data) => {
        if (data['status']) {
          this.successMessage = '生成成功';
          this.showSuccessTip();
          this.onloadNews(this.pageNumForNews, this.pageSizeForNews);
          this.adminService.generateXls().subscribe((item) => {
            if (!item['status']) {
              this.errorMessage = item['message'];
              this.showErrorTip();
            }
          }, (err: HttpErrorResponse) => {
            this.handleError(err);
          });
        } else {
          this.errorMessage = data['message'];
          this.showErrorTip();
        }
      }, (err: HttpErrorResponse) => {
        this.handleError(err);
      });
    }
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
