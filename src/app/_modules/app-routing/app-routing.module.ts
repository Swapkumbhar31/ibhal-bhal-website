import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from '../../dashboard/dashboard.component';
import { AuthGuard } from '../../_services/auth-guard';
import { LoginComponent } from '../../auth/login/login.component';
import { RegisterComponent } from '../../auth/register/register.component';
import { AppBootstrapModule } from '../app-bootstrap/app-bootstrap.module';
import { NewsFeedComponent } from '../../news-feed/news-feed.component';
import { GroupsComponent } from '../../groups/groups.component';
import { FourmsComponent } from '../../fourms/fourms.component';
import { PagesComponent } from '../../pages/pages.component';
import { MarketspaceComponent } from '../../marketspace/marketspace.component';
import { BlogsComponent } from '../../blogs/blogs.component';
import { MusicComponent } from '../../music/music.component';
import { EventsComponent } from '../../events/events.component';
import { SettingsComponent } from '../../settings/settings.component';
import { PhotosComponent } from '../../photos/photos.component';
import { MembersComponent } from '../../members/members.component';
import { MessagesComponent } from '../../messages/messages.component';
import { GroupDetailsComponent } from 'src/app/group-details/group-details.component';
import { PageDetailsComponent } from 'src/app/page-details/page-details.component';
import { NotificationsComponent } from 'src/app/notifications/notifications.component';
const routes: Routes = [
  {
    path: '',
    redirectTo: 'news-feed',
    pathMatch: 'full',
    canActivate: [AuthGuard]
  },
  {
    path: 'news-feed',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: NewsFeedComponent
      }
    ]
  },
  {
    path: 'groups',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: GroupsComponent
      },
      {
        path: ':id',
        component: GroupDetailsComponent
      }
    ]
  },
  {
    path: 'fourms',
    canActivate: [AuthGuard],
    component: DashboardComponent,
    children: [
      {
        path: '',
        component: FourmsComponent
      }
    ]
  },
  {
    path: 'pages',
    canActivate: [AuthGuard],
    component: DashboardComponent,
    children: [
      {
        path: '',
        component: PagesComponent
      },
      {
        path: ':id',
        component: PageDetailsComponent
      },
    ]
  },
  {
    path: 'marketplace',
    canActivate: [AuthGuard],
    component: DashboardComponent,
    children: [
      {
        path: '',
        component: MarketspaceComponent
      }
    ]
  },
  {
    path: 'blogs',
    canActivate: [AuthGuard],
    component: DashboardComponent,
    children: [
      {
        path: '',
        component: BlogsComponent
      }
    ]
  },
  {
    path: 'music',
    canActivate: [AuthGuard],
    component: DashboardComponent,
    children: [
      {
        path: '',
        component: MusicComponent
      }
    ]
  },
  {
    path: 'events',
    canActivate: [AuthGuard],
    component: DashboardComponent,
    children: [
      {
        path: '',
        component: EventsComponent
      }
    ]
  },
  {
    path: 'settings',
    canActivate: [AuthGuard],
    component: DashboardComponent,
    children: [
      {
        path: '',
        component: SettingsComponent
      }
    ]
  },
  {
    canActivate: [AuthGuard],
    path: 'photo',
    component: DashboardComponent,
    children: [
      {
        path: '',
        component: PhotosComponent
      }
    ]
  },
  {
    canActivate: [AuthGuard],
    path: 'members',
    component: DashboardComponent,
    children: [
      {
        path: '',
        component: MembersComponent
      }
    ]
  },
  {
    path: 'messages',
    canActivate: [AuthGuard],
    component: DashboardComponent,
    children: [
      {
        path: '',
        component: MessagesComponent
      }
    ]
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'notifications',
    canActivate: [AuthGuard],
    component: DashboardComponent,
    children: [
      {
        path: '',
        component: NotificationsComponent
      }
    ]
  }
];
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes),
    AppBootstrapModule,
  ],
  exports: [
    RouterModule,
  ],
  providers: [
    AuthGuard,
  ],
  declarations: []
})
export class AppRoutingModule { }
