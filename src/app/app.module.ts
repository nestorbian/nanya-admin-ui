import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { UploadComponent } from './upload/upload.component';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {HttpModule} from '@angular/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ButtonModule, InputTextModule} from 'primeng/primeng';
import { RegisterComponent } from './register/register.component';
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';
import { IpService } from './service/ip.service';
import { UserService } from './service/user.service';
import { AdminService } from './service/admin.service';
import { LoginComponent } from './login/login.component';
import {CheckboxModule} from 'primeng/checkbox';
import { TeaComponent } from './tea/tea.component';
import { HomeComponent } from './home/home.component';
import { LoadingModule, ANIMATION_TYPES } from 'ngx-loading';
import { TeaAdminComponent } from './tea-admin/tea-admin.component';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { HomeCarouseFigureComponent } from './home-carouse-figure/home-carouse-figure.component';
import {BlockUIModule} from 'primeng/blockui';
import {FileUploadModule} from 'primeng/fileupload';
import { WellKnownTeaComponent } from './well-known-tea/well-known-tea.component';
import {CardModule} from 'primeng/card';
import { WellKnownTeaAddComponent } from './well-known-tea-add/well-known-tea-add.component';
import {EditorModule} from 'primeng/editor';
import { WellKnownTeaEditComponent } from './well-known-tea-edit/well-known-tea-edit.component';
import { TeaSetNewsComponent } from './tea-set-news/tea-set-news.component';
import { FooterComponent } from './footer/footer.component';
import { TeaHistoryComponent } from './tea-history/tea-history.component';
import { TeaSetComponent } from './tea-set/tea-set.component';
import { WellKnownTeaDetailComponent } from './well-known-tea-detail/well-known-tea-detail.component';
import { GalleriaModule } from 'primeng/galleria';
import { WellKnownTeaResolve } from './guard/WellKnownTeaResolve';
import { TeaSkillAdminComponent } from './tea-skill-admin/tea-skill-admin.component';
import { TeaSkillUserComponent } from './tea-skill-user/tea-skill-user.component';
import { TeaSkillDetailComponent } from './tea-skill-detail/tea-skill-detail.component';
import { IndexUserGuard } from './guard/IndexUserGuard';
import { TeaLeafNewsComponent } from './tea-leaf-news/tea-leaf-news.component';
import {ChartModule} from 'primeng/chart';
import { TeaLeafNewsAdminComponent } from './tea-leaf-news-admin/tea-leaf-news-admin.component';
import {CalendarModule} from 'primeng/calendar';
import {CarouselModule} from 'primeng/carousel';
import { UserInfoComponent } from './user-info/user-info.component';
import { UserInfoAdminComponent } from './user-info-admin/user-info-admin.component';
import { CommunicationRegionUserComponent } from './communication-region-user/communication-region-user.component';
import { PostDetailComponent } from './post-detail/post-detail.component';
import { MyCollectionComponent } from './my-collection/my-collection.component';
import { NoticeDetailComponent } from './notice-detail/notice-detail.component';
import { ModifyPasswordComponent } from './modify-password/modify-password.component';
import { PostAdminComponent } from './post-admin/post-admin.component';
import { PostDetailAdminComponent } from './post-detail-admin/post-detail-admin.component';
import {GrowlModule} from 'primeng/growl';
import { LoginGuard } from './guard/LoginGuard';
import { Code404Component } from './code404/code404.component';
import {MultiSelectModule} from 'primeng/multiselect';

@NgModule({
  declarations: [
    AppComponent,
    UploadComponent,
    RegisterComponent,
    LoginComponent,
    TeaComponent,
    HomeComponent,
    TeaAdminComponent,
    HomeCarouseFigureComponent,
    WellKnownTeaComponent,
    WellKnownTeaAddComponent,
    WellKnownTeaEditComponent,
    TeaSetNewsComponent,
    FooterComponent,
    TeaHistoryComponent,
    TeaSetComponent,
    WellKnownTeaDetailComponent,
    TeaSkillAdminComponent,
    TeaSkillUserComponent,
    TeaSkillDetailComponent,
    TeaLeafNewsComponent,
    TeaLeafNewsAdminComponent,
    UserInfoComponent,
    UserInfoAdminComponent,
    CommunicationRegionUserComponent,
    PostDetailComponent,
    MyCollectionComponent,
    NoticeDetailComponent,
    ModifyPasswordComponent,
    PostAdminComponent,
    PostDetailAdminComponent,
    Code404Component
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    HttpModule,
    BrowserAnimationsModule,
    InputTextModule,
    ButtonModule,
    MessagesModule,
    MessageModule,
    CheckboxModule,
    LoadingModule.forRoot({
      animationType: ANIMATION_TYPES.threeBounce,
      backdropBackgroundColour: 'rgba(255,255,255,0.3)',
      backdropBorderRadius: '10px',
      primaryColour: '#ffffff',
      secondaryColour: '#ffffff',
      tertiaryColour: '#ffffff'
  }),
  ScrollPanelModule,
  BlockUIModule,
  FileUploadModule,
  CardModule,
  EditorModule,
  GalleriaModule,
  ChartModule,
  CalendarModule,
  CarouselModule,
  GrowlModule,
  MultiSelectModule
  ],
  providers: [IpService, UserService, AdminService, WellKnownTeaResolve, IndexUserGuard, LoginGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
