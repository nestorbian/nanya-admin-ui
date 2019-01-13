import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IpService } from './ip.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class UserService {

  constructor(private http: HttpClient, private ipService: IpService) {
  }

  // register组件
  register(userName: string, password: string, phoneNumber: string): Observable<any> {
    const param = {userName: userName, password: password, phone: phoneNumber};
    return this.http.post('/tea/users', param);
  }

  logout(): Observable<any> {
    return this.http.get('/tea/users/logout');
  }

  // login组件
  // getUserByUserName(userName: string): Observable<any> {
  //   return this.http.get(`/tea/users/${userName}`);
  // }

  // getUserByPhone(phone: string): Observable<any> {
  //   return this.http.get(`/tea/users?phone=${phone}`);
  // }

  getUserByUserNameAndPassword(userName: string, password: string): Observable<any> {
    return this.http.get(`/tea/users/${userName}/${password}`);
  }

  // 获得session中的用户
  getUserBySession(): Observable<any> {
    return this.http.get('/tea/users/session');
  }

  // 获取轮播图
  getAllHomeCarouselFigure(): Observable<any> {
    return this.http.get('/tea/home-carsouel-figures');
  }

  // 主流茶
  findAllWellKnownTea(): Observable<any> {
    return this.http.get(`/tea/well-known-teas`);
  }

  getWellKnownTeaById(wellKnownTeaId: string): Observable<any> {
    return this.http.get(`/tea/well-known-teas/${wellKnownTeaId}`);
  }

  // 茶具资讯
  findAllTeaSetNews(pageNum: number, pageSize: number): Observable<any> {
    return this.http.get(`/tea/tea-set-news/${pageNum}/${pageSize}`);
}


  // 茶图片
  findTeaImageByTeaId(teaId: string): Observable<any> {
    return this.http.get(`/tea/tea-images/${teaId}`);
  }

  // 泡茶技巧
  findAllTeaSkill(pageNum: number, pageSize: number): Observable<any> {
    return this.http.get(`/tea/tea-skills/${pageNum}/${pageSize}`);
  }

  getTeaSkillById(teaSkillId: string): Observable<any> {
    return this.http.get(`/tea/tea-skills/${teaSkillId}`);
  }

  updateReadNumberById(teaSkillId: string): Observable<any> {
    return this.http.put(`/tea/tea-skills/${teaSkillId}`, null);
  }

  // 获取茶叶数据
  findAllTeaLeafData(pageNum: number, pageSize: number): Observable<any> {
    return this.http.get(`/tea/tea-leaf-datas/${pageNum}/${pageSize}`);
  }

  // 获取茶叶资讯
  findAllTeaLeafNews(pageNum: number, pageSize: number): Observable<any> {
    return this.http.get(`/tea/tea-leaf-news/${pageNum}/${pageSize}`);
  }

  findTeaLeafNews(): Observable<any> {
    return this.http.get(`/tea/tea-leaf-news`);
  }

  // 获取用户信息
  getUserById(userId: string): Observable<any> {
    return this.http.get(`/tea/users/${userId}`);
  }

  modifyHeadSculptureByFile(headSculpture: File, userId: string): Observable<any> {
    const formData = new FormData();
    formData.append('headSculpture', headSculpture);
    formData.append('userId', userId);
    return this.http.post(`/tea/users/head-sculpture`, formData);
  }

  modifyHeadSculptureByUrl(headSculptureUrl: string, userId: string): Observable<any> {
    const param = {headSculptureUrl: headSculptureUrl, userId: userId};
    return this.http.put(`/tea/users/head-sculpture`, param);
  }

  modifyUserById(user: any): Observable<any> {
    return this.http.put(`/tea/users`, user);
  }

  // 上传帖子图片
  uploadImage(image: File): Observable<any> {
    const formData = new FormData();
    formData.append('image', image);
    return this.http.post('/tea/post-images', formData);
  }

  addPost(title: string, content: string): Observable<any> {
    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    return this.http.post('/tea/posts', formData);
  }

  // 获取所有帖子
  findAllPost(pageNum: number, pageSize: number): Observable<any> {
    return this.http.get(`/tea/posts/${pageNum}/${pageSize}`);
  }

  getPostById(postId: string): Observable<any> {
    return this.http.get(`/tea/posts/${postId}`);
  }
  // 添加评论
  addComment(content: string, receiver: string, postId: string): Observable<any> {
    const formData = new FormData();
    formData.append('content', content);
    formData.append('receiver', receiver);
    formData.append('postId', postId);
    return this.http.post('/tea/comments', formData);
  }

  findCommentByPostId(pageNum: number, pageSize: number, postId: string): Observable<any> {
    return this.http.get(`/tea/comments/${pageNum}/${pageSize}?postId=${postId}`);
  }

  // 添加回复
  addReply(content: string, receiver: string, commentId: string): Observable<any> {
    const formData = new FormData();
    formData.append('content', content);
    formData.append('receiver', receiver);
    formData.append('commentId', commentId);
    return this.http.post('/tea/replies', formData);
  }

  // 添加收藏
  addCollection(teaSkillId: string): Observable<any> {
    const formData = new FormData();
    formData.append('teaSkillId', teaSkillId);
    return this.http.post('/tea/collections', formData);
  }

  // 删除收藏
  deleteCollectionById(collectionId: string): Observable<any> {
    return this.http.delete(`/tea/collections/${collectionId}`);
  }

  // 获取是否收藏
  getCollectionByUserIdAndTeaSkillId(userId: string, teaSkillId: string): Observable<any> {
    return this.http.get(`/tea/collections?userId=${userId}&teaSkillId=${teaSkillId}`);
  }

  // 获取所有文章id
  findAllTeaSkillId(): Observable<any> {
    return this.http.get(`/tea/tea-skill-ids`);
  }

  // 获取用户的收藏
  findCollectionByUserId(userId: string, pageNum: number, pageSize: number): Observable<any> {
    return this.http.get(`/tea/collections/${userId}?pageNum=${pageNum}&pageSize=${pageSize}`);
  }

  // 删除回复
  deleteReplyById(replyId: string): Observable<any> {
    return this.http.delete(`/tea/replies/${replyId}`);
  }

  // 删除评论
  deleteCommentById(commentId: string): Observable<any> {
    return this.http.delete(`/tea/comments/${commentId}`);
  }

  // 删除帖子
  deletePostById(postId: string): Observable<any> {
    return this.http.delete(`/tea/posts/${postId}`);
  }

  // 获取提示
  findNoticeByReceiver(receiver: string): Observable<any> {
    return this.http.get(`/tea/notices/${receiver}`);
  }

  // 删除提示
  deleteNoticeById(noticeId: string): Observable<any> {
    return this.http.delete(`/tea/notices/${noticeId}`);
  }

  // 根据commentId查询详情
  getNoticeDetailByCommentId(commentId): Observable<any> {
    return this.http.get(`/tea/notice-details?commentId=${commentId}`);
  }

  // 根据replyId查询详情
  getNoticeDetailByReplyId(replyId): Observable<any> {
    return this.http.get(`/tea/notice-details/${replyId}`);
  }

  // 修改密码
  modifyPasswordById(userId: string, oldPassword: string, newPassword: string): Observable<any> {
    return this.http.put(`/tea/users/password?userId=${userId}&oldPassword=${oldPassword}&newPassword=${newPassword}`, null);
  }
}
