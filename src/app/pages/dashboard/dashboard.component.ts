import { Component, ElementRef, inject, signal, viewChild } from '@angular/core';
import { WidgetComponent } from '../../components/widget/widget.component';
import { DashboardService } from '../../services/dashboard.service';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { wrapGrid} from 'animate-css-grid';
import { CdkDragDrop, CdkDropList, CdkDropListGroup } from '@angular/cdk/drag-drop';
import { C } from '@angular/cdk/keycodes';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [WidgetComponent, MatButtonModule, MatIcon, MatMenuModule, CdkDropList, CdkDropListGroup],
  providers: [DashboardService],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  store = inject(DashboardService);
  dashboard = viewChild.required<ElementRef>('dashboard')

  ngOnOnit() {
    wrapGrid(this.dashboard().nativeElement, { duration: 300})
  }
  drop(event: CdkDragDrop<number,any>){
    const { previousContainer, container} = event;
    this.store.updateWidgetPosition(previousContainer.data,container.data)
  }
}
