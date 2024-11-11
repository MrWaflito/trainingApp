import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LeaguesComponent } from './pages/statistics/leagues/leagues.component';
import { PlayersComponent } from './pages/statistics/players/players.component';
import { EventsComponent } from './pages/statistics/events/events.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { ChallengesComponent } from './pages/challenges/challenges.component';
import { UserDataComponent } from './pages/user-data/user-data.component';
import { StatisticsComponent } from './pages/statistics/statistics.component';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'dashboard',
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
  },
  {
    path: 'statistics',
    component: StatisticsComponent,
    children: [
      {
        path: 'leagues',
        component: LeaguesComponent
      },
      {
        path: 'players',
        component: PlayersComponent,
      },
      {
        path: 'events',
        component: EventsComponent
      }
    ],
  },
  {
    path: 'challenges',
    component: ChallengesComponent,
  },
  {
    path: 'userdata',
    component: UserDataComponent,
  },
  {
    path: 'settings',
    component: SettingsComponent,
  },
];
