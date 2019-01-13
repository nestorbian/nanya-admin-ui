import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UploadComponent } from './upload/upload.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { TeaComponent } from './tea/tea.component';
import { TeaAdminComponent } from './tea-admin/tea-admin.component';
import { HomeCarouseFigureComponent } from './home-carouse-figure/home-carouse-figure.component';
import { HomeComponent } from './home/home.component';
import { WellKnownTeaComponent } from './well-known-tea/well-known-tea.component';
import { WellKnownTeaAddComponent } from './well-known-tea-add/well-known-tea-add.component';
import { WellKnownTeaEditComponent } from './well-known-tea-edit/well-known-tea-edit.component';
import { TeaSetNewsComponent } from './tea-set-news/tea-set-news.component';
import { TeaHistoryComponent } from './tea-history/tea-history.component';
import { TeaSetComponent } from './tea-set/tea-set.component';
import { WellKnownTeaDetailComponent } from './well-known-tea-detail/well-known-tea-detail.component';
import { WellKnownTeaResolve } from './guard/WellKnownTeaResolve';
import { TeaSkillAdminComponent } from './tea-skill-admin/tea-skill-admin.component';
import { TeaSkillUserComponent } from './tea-skill-user/tea-skill-user.component';
import { TeaSkillDetailComponent } from './tea-skill-detail/tea-skill-detail.component';
import { IndexUserGuard } from './guard/IndexUserGuard';
import { TeaLeafNewsComponent } from './tea-leaf-news/tea-leaf-news.component';
import { TeaLeafNewsAdminComponent } from './tea-leaf-news-admin/tea-leaf-news-admin.component';
import { UserInfoComponent } from './user-info/user-info.component';
import { UserInfoAdminComponent } from './user-info-admin/user-info-admin.component';
import { CommunicationRegionUserComponent } from './communication-region-user/communication-region-user.component';
import { PostDetailComponent } from './post-detail/post-detail.component';
import { MyCollectionComponent } from './my-collection/my-collection.component';
import { NoticeDetailComponent } from './notice-detail/notice-detail.component';
import { ModifyPasswordComponent } from './modify-password/modify-password.component';
import { PostAdminComponent } from './post-admin/post-admin.component';
import { PostDetailAdminComponent } from './post-detail-admin/post-detail-admin.component';
import { LoginGuard } from './guard/LoginGuard';
import { Code404Component } from './code404/code404.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'upload',  component: UploadComponent },
  { path: 'register',  component: RegisterComponent },
  { path: 'login',  component: LoginComponent, canActivate: [LoginGuard]},
  { path: 'home',  component: TeaComponent, children: [
    { path: '',  component: HomeComponent},
    { path: 'index',  component: HomeComponent},
    { path: 'tea-history',  component: TeaHistoryComponent},
    { path: 'tea-set',  component: TeaSetComponent},
    { path: 'well-known-tea/:id',  component: WellKnownTeaDetailComponent},
    { path: 'tea-skill',  component: TeaSkillUserComponent},
    { path: 'tea-skill-detail/:id',  component: TeaSkillDetailComponent},
    { path: 'tea-leaf-news',  component: TeaLeafNewsComponent},
    { path: 'user-info',  component: UserInfoComponent},
    { path: 'communication-region',  component: CommunicationRegionUserComponent},
    { path: 'post-detail/:id',  component: PostDetailComponent},
    { path: 'my-collection',  component: MyCollectionComponent},
    { path: 'notice-detail',  component: NoticeDetailComponent},
    { path: 'modify-password',  component: ModifyPasswordComponent}
  ]},
  { path: 'home-admin',  component: TeaAdminComponent, children: [
    { path: '',  component: HomeCarouseFigureComponent},
    { path: 'carousel-figure',  component: HomeCarouseFigureComponent },
    { path: 'well-known-tea',  component: WellKnownTeaComponent },
    { path: 'add-well-known-tea',  component: WellKnownTeaAddComponent },
    { path: 'edit-well-known-tea/:id',  component: WellKnownTeaEditComponent },
    { path: 'tea-set-news',  component: TeaSetNewsComponent },
    { path: 'tea-skill',  component: TeaSkillAdminComponent },
    { path: 'tea-leaf-news',  component: TeaLeafNewsAdminComponent },
    { path: 'user-info',  component: UserInfoAdminComponent },
    { path: 'post',  component: PostAdminComponent },
    { path: 'post-detail/:id',  component: PostDetailAdminComponent }
  ]},
  { path: '**',  component: Code404Component },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'}) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {
}
