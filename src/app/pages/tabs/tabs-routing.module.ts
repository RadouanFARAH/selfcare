import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path:'',
    redirectTo:'/tabs/Menu',
    pathMatch:'full'
  },
  {
    path: '',
    component: TabsPage,
    children:[
      {
        path: 'Menu',
        loadChildren: () => import('../menu/menu.module').then( m => m.MenuPageModule)
      },
      {
        path: 'Notifications',
        loadChildren: () => import('../notifications/notifications.module').then( m => m.NotificationsPageModule)
      },
      {
        path: 'Apropos',
        loadChildren: () => import('../apropos/apropos.module').then( m => m.AproposPageModule)
      },
      {
        path: 'Compte',
        loadChildren: () => import('../compte/compte.module').then( m => m.ComptePageModule)
      },
      {
        path:'',
        redirectTo:'/tabs/Menu',
        pathMatch:'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
