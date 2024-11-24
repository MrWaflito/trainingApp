import { computed, effect, Injectable, signal } from '@angular/core';
import { Widget } from '../models/dashboard';
import { PlayerCardComponent } from '../pages/dashboard/widgets/player-card/player-card.component';

@Injectable()
export class DashboardService {
  widgets = signal<Widget[]>([
    {
      id: 1,
      label: 'Player',
      content: PlayerCardComponent,
      rows: 2,
      columns: 2,
    },
    {
      id: 2,
      label: 'Player2',
      content: PlayerCardComponent,
    },
    {
      id: 3,
      label: 'Player3',
      content: PlayerCardComponent,
    },
    {
      id: 4,
      label: 'Player4',
      content: PlayerCardComponent,
    },
  ]);
  addedWidgets = signal<Widget[]>([]);

  widgetsToAdd = computed(() => {
    const addedIds = this.addedWidgets().map((w) => w.id);
    return this.widgets().filter((w) => !addedIds.includes(w.id));
  });

  fetchWidgets() {
    const widgetAsString = localStorage.getItem('dashboardWidgets');
    if (widgetAsString) {
      const widgets = JSON.parse(widgetAsString) as Widget[];
      widgets.forEach((widget) => {
        const content = this.widgets().find((w) => w.id === widget.id)?.content;
        if (content) {
          widget.content = content;
        }
      });
      this.addedWidgets.set(widgets);
    }
  }

  addWidget(w: Widget) {
    console.log(this.addedWidgets());
    this.addedWidgets.set([...this.addedWidgets(), { ...w }]);
  }

  updateWidget(id: number, widget: Partial<Widget>) {
    const index = this.addedWidgets().findIndex((w) => w.id === id);
    if (index !== -1) {
      const newWidgets = [...this.addedWidgets()];
      newWidgets[index] = { ...newWidgets[index], ...widget };
      this.addedWidgets.set(newWidgets);
    }
  }

  updateWidgetPosition(sourceWidgetId: number, targetWidgetId: number) {
    const srcIndex = this.addedWidgets().findIndex(
      (w) => w.id === sourceWidgetId
    );
    if (srcIndex === -1) {
      return;
    }
    const newWidgets = [...this.addedWidgets()];
    const srcWidget = newWidgets.splice(srcIndex, 1)[0];
    const targetIndex = newWidgets.findIndex((w) => w.id === targetWidgetId);
    if (targetIndex === -1) {
      return;
    }
    const insertAt = targetIndex === srcIndex ? targetIndex + 1 : targetIndex;
    newWidgets.splice(insertAt, 0, srcWidget);
    this.addedWidgets.set(newWidgets);
  }

  removeWidget(id: number) {
    this.addedWidgets.set(this.addedWidgets().filter((w) => w.id !== id));
  }

  constructor() {
    this.fetchWidgets();
  }

  saveWidgets = effect(() => {
    const widgetsWithoutContent: Partial<Widget>[] = this.addedWidgets().map(
      (w) => ({ ...w })
    );
    widgetsWithoutContent.forEach((w) => {
      delete w.content;
    });
    localStorage.setItem(
      'dashboardWidgets',
      JSON.stringify(widgetsWithoutContent)
    );
  });
}
