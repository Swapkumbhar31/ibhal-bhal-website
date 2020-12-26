import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MomentModule } from 'ngx-moment';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { NewsFeedComponent } from './news-feed/news-feed.component';
import { GroupsComponent } from './groups/groups.component';
import { FourmsComponent } from './fourms/fourms.component';
import { PagesComponent } from './pages/pages.component';
import { SideNavComponent } from './components/side-nav/side-nav.component';
import { MarketspaceComponent } from './marketspace/marketspace.component';
import { BlogsComponent } from './blogs/blogs.component';
import { MusicComponent } from './music/music.component';
import { EventsComponent } from './events/events.component';
import { SettingsComponent } from './settings/settings.component';
import { PhotosComponent } from './photos/photos.component';
import { MembersComponent } from './members/members.component';
import { MessagesComponent } from './messages/messages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AppRoutingModule } from './_modules/app-routing/app-routing.module';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { AppBootstrapModule } from './_modules/app-bootstrap/app-bootstrap.module';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ModalModule } from 'ngx-bootstrap/modal';
import { FeedComponent } from './components/feed/feed.component';
import { GroupComponent } from './components/group/group.component';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { PageComponent } from './components/page/page.component';
import { MarketspaceItemComponent } from './components/marketspace-item/marketspace-item.component';
import { AlbumComponent } from './components/album/album.component';
import { PhotoComponent } from './components/photo/photo.component';
import { AuthenticationService } from './_services/authentication.service';
import { AppHttpService } from './_services/app-http.service';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { BlogComponent } from './components/blog/blog.component';
import { ScrollEventModule } from 'ngx-scroll-event';
import { CommentsComponent } from './components/comments/comments.component';
import { SlideshowModule } from 'ng-simple-slideshow';
import { AgmCoreModule } from '@agm/core';
import { LocationStrategy, PathLocationStrategy } from '@angular/common';
import { RouterModule } from '@angular/router';
import { GroupDetailsComponent } from './group-details/group-details.component';
import { PageDetailsComponent } from './page-details/page-details.component';
import { WebcamModule } from 'ngx-webcam';
import { NotificationsComponent } from './notifications/notifications.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    NewsFeedComponent,
    GroupsComponent,
    FourmsComponent,
    PagesComponent,
    SideNavComponent,
    MarketspaceComponent,
    BlogsComponent,
    MusicComponent,
    EventsComponent,
    SettingsComponent,
    PhotosComponent,
    MembersComponent,
    MessagesComponent,
    DashboardComponent,
    LoginComponent,
    RegisterComponent,
    FeedComponent,
    GroupComponent,
    PageComponent,
    MarketspaceItemComponent,
    AlbumComponent,
    PhotoComponent,
    BlogComponent,
    CommentsComponent,
    GroupDetailsComponent,
    PageDetailsComponent,
    NotificationsComponent,
  ],
  imports: [
    MomentModule,
    WebcamModule,
    RouterModule,
    BrowserModule,
    SlideshowModule,
    HttpModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    ScrollEventModule,
    AppRoutingModule,
    AngularFontAwesomeModule,
    BsDropdownModule.forRoot(),
    TooltipModule.forRoot(),
    ModalModule.forRoot(),
    TabsModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAlkzGVPNL2_7tWJFqKOlYBAmda4W4Xqg4'
    })
  ],
  providers: [
    AppHttpService,
    AuthenticationService,
    { provide: LocationStrategy, useClass: PathLocationStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
