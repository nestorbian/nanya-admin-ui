import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { AdminService } from '../service/admin.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-tea-skill-admin',
  templateUrl: './tea-skill-admin.component.html',
  styleUrls: ['./tea-skill-admin.component.scss']
})
export class TeaSkillAdminComponent implements OnInit {
  // 遮罩层
  isShowBlock = false;
  // 添加对话框
  isShowAddModule = false;
  // 修改对话框
  isShowModifyModule = false;
  teaSkillIdForModify: string;
  // 删除对话框
  isShowDeleteModule = false;
  teaSkillIdForDelete: string;
  // 表单信息
  title: string;
  author: string;
  essay: string;
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
  teaSkillList: any[];
  total: number;
  pageForSkip = '1';

  constructor(private adminService: AdminService) { }

  ngOnInit() {
    this.onloadData(this.pageNum, this.pageSize);
  }

  // 加载数据
  onloadData(pageNum: number, pageSize: number): void {
    this.adminService.findAllTeaSkill(pageNum, pageSize).subscribe((data) => {
      if (data['status']) {
        const pageInfo = data['data'];
        this.teaSkillList = pageInfo['list'];
        this.pages = pageInfo['pages'];
        this.pageNum = pageInfo['pageNum'];
        this.total = pageInfo['total'];
      } else {
        this.errorMessage = data['message'];
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
    this.title = '';
    this.author = '';
    this.essay = '';
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

  // 跳页
  skipPage(pageNum: number): void {
    this.onloadData(pageNum, this.pageSize);
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

  // 显示删除对话框
  deleteTeaSkill(teaSkillId: string): void {
    this.teaSkillIdForDelete = teaSkillId;
    this.isShowBlock = true;
    this.isShowDeleteModule = true;
  }

  // 取消删除
  cancelDeleteModule(): void {
    this.teaSkillIdForDelete = '';
    this.isShowBlock = false;
    this.isShowDeleteModule = false;
  }

  // 删除轮播信息
  confirmDeleteTeaSkill(): void {
    this.adminService.deleteTeaSkillById(this.teaSkillIdForDelete).subscribe((data) => {
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
  addTeaSkill(): void {
    this.adminService.addTeaSkill(this.title, this.author, this.essay).subscribe((data) => {
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

  // 显示修改的模块
  showModifyModule(teaSkillId: string): void {
    this.adminService.getTeaSkillById(teaSkillId).subscribe((data) => {
      if (data['status']) {
        const teaSkill = data['data'];
        this.teaSkillIdForModify = teaSkill.teaSkillId;
        this.title = teaSkill.title;
        this.author = teaSkill.author;
        this.essay = teaSkill.essay;
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
  modifyTeaSkillById(): void {
    console.log(this.title);
    this.adminService.modifyTeaSkillById(this.teaSkillIdForModify, this.title, this.author, this.essay).subscribe((data) => {
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
    this.title = '';
    this.author = '';
    this.essay = '';
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
