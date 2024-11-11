import { CommonModule } from '@angular/common';
import { Component, computed, Input, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterModule } from '@angular/router';
import { MenuItemComponent } from "../menu-item/menu-item.component";

export type MenuItem = {
  icon: string;
  label: string;
  route?: string;
  subItems?: MenuItem[];
};

@Component({
  selector: 'app-sidevav',
  standalone: true,
  imports: [
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    RouterModule,
    CommonModule,
    MenuItemComponent
],
  templateUrl: './sidevav.component.html',
  styleUrl: './sidevav.component.scss',
})
export class SidevavComponent {
  sideNavCollapsed = signal(false);

  @Input() set collapsed(value: boolean) {
    this.sideNavCollapsed.set(value);
  }

  profilePicSize = computed(()=> this.sideNavCollapsed() ? '32' : '100')

  menuItems = signal<MenuItem[]>([
    {
      icon: 'dashboard',
      label: 'Dashboard',
      route: 'dashboard'
    },
    {
      icon: 'insert_chart',
      label: 'Statistics',
      route: 'statistics',
      subItems: [
        {
          icon: 'table_rows',
          label: 'Leagues',
          route: 'leagues',
        },
        {
          icon: 'groups',
          label: 'Players',
          route: 'players'
        },
        {
          icon: 'event',
          label: 'Events',
          route: 'events'
        },
      ]
    },
    {
      icon: 'emoji_events',
      label: 'Challenges',
      route: 'challenges'
    },
    {
      icon: 'dataset',
      label: 'User Stats',
      route: 'userdata'
    },
    {
      icon: 'settings',
      label: 'Settings',
      route: 'settings'
    },
    {
      icon: 'logout',
      label: 'Log Out',
      route: 'dashboard'
    },
  ]);
}
