import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IpService } from './ip.service';
import { Observable } from 'rxjs/Observable';
import { forEach } from '@angular/router/src/utils/collection';


@Injectable()
export class AdminService {

  constructor(private http: HttpClient, private ipService: IpService) { }

  // 轮播图管理
  saveHomeCarouselFigure(imageFile: File, carouselFigureTitle: string, carouselFigureContent: string): Observable<any> {
    const formData = new FormData();
    formData.append('imageFile', imageFile);
    formData.append('carouselFigureTitle', carouselFigureTitle);
    formData.append('carouselFigureContent', carouselFigureContent);
    return this.http.post('/tea/home-carsouel-figures', formData);
  }

  getAllHomeCarouselFigure(pageNum: number, pageSize: number): Observable<any> {
    return this.http.get(`/tea/home-carsouel-figures/${pageNum}/${pageSize}`);
  }

  deleteHomeCarouselFigureById(carouselFigureId: string, carouselFigureImagePath: string): Observable<any> {
    return this.http.delete(`/tea/home-carsouel-figures/${carouselFigureId}`, {params: {carouselFigureImagePath: carouselFigureImagePath}});
  }

  updateHomeCarouselFigureById(imageFile: File, carouselFigureTitle: string, carouselFigureContent: string,
    carouselFigureId: string): Observable<any> {
    const formData = new FormData();
    formData.append('imageFile', imageFile);
    formData.append('carouselFigureTitle', carouselFigureTitle);
    formData.append('carouselFigureContent', carouselFigureContent);
    return this.http.put(`/tea/home-carsouel-figures/${carouselFigureId}`, formData);
  }

  // 登陆
  getAdminByAdminNameAndPassword(adminName: string, password: string): Observable<any> {
    const formData = new FormData();
    formData.append('adminName', adminName);
    formData.append('password', password);
    return this.http.post(`/nanyahuayi/admins/login`, formData);
  }

  // 根据session获取管理员信息
  getUserFromSession(): Observable<any> {
    return this.http.get('/nanyahuayi/admins/session');
  }

  // 登出
  logout(): Observable<any> {
    return this.http.get('/tea/admins/logout');
  }

  // 主流茶管理
  addWellKnownTea(imageFiles: File[], wellKnownTeaName: string, productionPlace: string, description: string, detailPart: string)
  : Observable<any> {
    const formData = new FormData();
    imageFiles.forEach((value) => {
      formData.append('imageFiles', value);
    });
    formData.append('wellKnownTeaName', wellKnownTeaName);
    formData.append('productionPlace', productionPlace);
    formData.append('description', description);
    formData.append('detailPart', detailPart);
    return this.http.post('/tea/well-known-teas', formData);
  }

  findAllWellKnownTea(pageNum: number, pageSize: number): Observable<any> {
    return this.http.get(`/tea/well-known-teas/${pageNum}/${pageSize}`);
  }
  // findAllWellKnownTea(): Observable<any> {
  //   return this.http.get(`/tea/well-known-teas`);
  // }

  deleteWellKnownTeaById(wellKnownTeaId: string): Observable<any> {
    return this.http.delete(`/tea/well-known-teas/${wellKnownTeaId}`);
  }

  getWellKnownTeaById(wellKnownTeaId: string): Observable<any> {
    return this.http.get(`/tea/well-known-teas/${wellKnownTeaId}`);
  }

  modifyWellKnownTeaById(wellKnownTeaId: string, wellKnownTeaName: string, productionPlace: string, description: string, detailPart: string)
  : Observable<any> {
    const param = {wellKnownTeaId: wellKnownTeaId, wellKnownTeaName: wellKnownTeaName, productionPlace: productionPlace,
       description: description, detailPart: detailPart};
    return this.http.put('/tea/well-known-teas', param);
  }

  // 茶图片管理
  addTeaImageByTeaId(teaImages: File[], teaId: string): Observable<any> {
    const formData = new FormData();
    for (let i = 0; i < teaImages.length; i ++) {
      formData.append('teaImages', teaImages[i]);
    }
    formData.append('teaId', teaId);
    return this.http.post('/tea/tea-images', formData);
  }

  findTeaImageByTeaId(teaId: string): Observable<any> {
    return this.http.get(`/tea/tea-images/${teaId}`);
  }

  deleteTeaImageByImageId(imageId: string, imagePath: string): Observable<any> {
    return this.http.delete(`/tea/tea-images/${imageId}`, {params: {imagePath: imagePath}});
  }

  // 茶具资讯管理
  findAllTeaSetNews(pageNum: number, pageSize: number): Observable<any> {
      return this.http.get(`/tea/tea-set-news/${pageNum}/${pageSize}`);
  }

  deleteTeaSetNewsById(teaSetId: string): Observable<any> {
    return this.http.delete(`/tea/tea-set-news/${teaSetId}`);
  }

  addTeaSetNews(imageFile: File, teaSetName: string, price: number, description: string, goodUrl: string): Observable<any> {
    const formData = new FormData();
    formData.append('imageFile', imageFile);
    formData.append('teaSetName', teaSetName);
    formData.append('price', price.toString());
    formData.append('description', description);
    formData.append('goodUrl', goodUrl);
    return this.http.post(`/tea/tea-set-news`, formData);
  }

  updateTeaSetNewsById(teaSetId: string, teaSetName: string, imageFile: File,  price: number, description: string, goodUrl: string)
  : Observable<any> {
    const formData = new FormData();
    formData.append('imageFile', imageFile);
    formData.append('teaSetName', teaSetName);
    formData.append('price', price.toString());
    formData.append('description', description);
    formData.append('goodUrl', goodUrl);
    return this.http.put(`/tea/tea-set-news/${teaSetId}`, formData);
  }

  // 泡茶技巧
  findAllTeaSkill(pageNum: number, pageSize: number): Observable<any> {
    return this.http.get(`/tea/tea-skills/${pageNum}/${pageSize}`);
  }

  deleteTeaSkillById(teaSkillId: string): Observable<any> {
    return this.http.delete(`/tea/tea-skills/${teaSkillId}`);
  }

  addTeaSkill(title: string, author: string, essay: string): Observable<any> {
    const formData = new FormData();
    formData.append('title', title);
    formData.append('author', author);
    formData.append('essay', essay);
    return this.http.post(`/tea/tea-skills`, formData);
  }

  getTeaSkillById(teaSkillId: string): Observable<any> {
    return this.http.get(`/tea/tea-skills/${teaSkillId}`);
  }

  modifyTeaSkillById(teaSkillId: string, title: string, author: string, essay: string): Observable<any> {
    const param = {teaSkillId: teaSkillId, title: title, author: author, essay: essay};
    return this.http.put(`/tea/tea-skills`, param);
  }
  // 茶叶资讯
  findAllTeaLeafData(pageNum: number, pageSize: number): Observable<any> {
    return this.http.get(`/tea/tea-leaf-datas/${pageNum}/${pageSize}`);
  }

  deleteTeaLeafDataById(dataId: string): Observable<any> {
    return this.http.delete(`/tea/tea-leaf-datas/${dataId}`);
  }

  updateTeaLeafDataById(dataId: string, dataName: string, price: number, address: string, phone: number, surveyTime: Date)
  : Observable<any> {
    const param = {dataId: dataId, dataName: dataName, price: price, address: address, phone: phone, surveyTime: surveyTime};
    return this.http.put(`/tea/tea-leaf-datas`, param);
  }

  addTeaLeafData(dataName: string, price: number, address: string, phone: number, surveyTime: Date): Observable<any> {
    const param = {dataName: dataName, price: price, address: address, phone: phone, surveyTime: surveyTime};
    return this.http.post('/tea/tea-leaf-datas', param);
  }

  getTeaLeafDataById(dataId: string): Observable<any> {
    return this.http.get(`/tea/tea-leaf-datas/${dataId}`);
  }

  // 生成茶叶资讯
  generateTeaLeafNews(startTime: Date, endTime: Date): Observable<any> {
    return this.http.get(`/tea/tea-leaf-datas?startTime=${startTime.getTime()}&endTime=${endTime.getTime()}`);
  }

  // 获取茶叶资讯
  findAllTeaLeafNews(pageNum: number, pageSize: number): Observable<any> {
    return this.http.get(`/tea/tea-leaf-news/${pageNum}/${pageSize}`);
  }

  generateXls(): Observable<any> {
    return this.http.get(`/tea/tea-leaf-news/generate-xls`);
  }
  // 获取全部用户信息
  findAllUser(pageNum: number, pageSize: number, search: string): Observable<any> {
    return this.http.get(`/tea/users?pageNum=${pageNum}&pageSize=${pageSize}&search=${search}`);
  }

  modifyHeadSculptureByUrl(headSculptureUrl: string, userId: string): Observable<any> {
    const param = {headSculptureUrl: headSculptureUrl, userId: userId};
    return this.http.put(`/tea/users/head-sculpture`, param);
  }

  modifyUserById(user: any): Observable<any> {
    return this.http.put(`/tea/users`, user);
  }
}
