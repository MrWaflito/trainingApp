import { CommonModule } from '@angular/common';
import { Component, computed, inject, Input, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterModule } from '@angular/router';
import { MenuItemComponent } from '../menu-item/menu-item.component';
import { TranslateService } from '@ngx-translate/core';
import { merge, Subject, takeUntil } from 'rxjs';

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
    MenuItemComponent,
  ],
  templateUrl: './sidevav.component.html',
  styleUrl: './sidevav.component.scss',
})
export class SidevavComponent {
  private destroy$ = new Subject<void>();
  translate: TranslateService = inject(TranslateService);
  sideNavCollapsed = signal(false);
  profilePicSize = computed(() => (this.sideNavCollapsed() ? '32' : '100'));
  menuItems = signal<MenuItem[]>([]);

  constructor() {
    merge(this.translate.get('sidenav'), this.translate.onLangChange)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.initializeMenu();
      });
  }

  @Input() set collapsed(value: boolean) {
    this.sideNavCollapsed.set(value);
  }

  private initializeMenu(): void {
    this.menuItems.set([
      {
        icon: 'dashboard',
        label: this.translate.instant('sidenav.DASHBOARD'),
        route: 'dashboard',
      },
      {
        icon: 'insert_chart',
        label: this.translate.instant('sidenav.STATISTICS'),
        route: 'statistics',
        subItems: [
          {
            icon: 'table_rows',
            label: this.translate.instant('sidenav.LEAGUES'),
            route: 'leagues',
          },
          {
            icon: 'groups',
            label: this.translate.instant('sidenav.PLAYERS'),
            route: 'players',
          },
          {
            icon: 'event',
            label: this.translate.instant('sidenav.EVENTS'),
            route: 'events',
          },
        ],
      },
      {
        icon: 'emoji_events',
        label: this.translate.instant('sidenav.CHALLENGES'),
        route: 'challenges',
      },
      {
        icon: 'dataset',
        label: this.translate.instant('sidenav.USER_STATS'),
        route: 'userdata',
      },
      {
        icon: 'settings',
        label: this.translate.instant('sidenav.SETTINGS'),
        route: 'settings',
      },
      {
        icon: 'logout',
        label: this.translate.instant('sidenav.LOG_OUT'),
        route: 'dashboard',
      },
    ]);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
