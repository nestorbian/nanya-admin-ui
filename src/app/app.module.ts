import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {HttpModule} from '@angular/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ButtonModule, InputTextModule} from 'primeng/primeng';
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';
import { IpService } from './service/ip.service';
import { UserService } from './service/user.service';
import { AdminService } from './service/admin.service';
import { LoginComponent } from './login/login.component';
import {CheckboxModule} from 'primeng/checkbox';
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
import { GalleriaModule } from 'primeng/galleria';
import {ChartModule} from 'primeng/chart';
import {CalendarModule} from 'primeng/calendar';
import {CarouselModule} from 'primeng/carousel';
import {GrowlModule} from 'primeng/growl';
import { Code404Component } from './code404/code404.component';
import {MultiSelectModule} from 'primeng/multiselect';
import {DropdownModule} from 'primeng/dropdown';
import { PrintComponent } from './print/print.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    TeaAdminComponent,
    HomeCarouseFigureComponent,
    WellKnownTeaComponent,
    WellKnownTeaAddComponent,
    WellKnownTeaEditComponent,
    TeaSetNewsComponent,
    FooterComponent,
    Code404Component,
    PrintComponent
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
  MultiSelectModule,
  DropdownModule
  ],
  providers: [IpService, UserService, AdminService],
  bootstrap: [AppComponent]
})
export class AppModule { }
