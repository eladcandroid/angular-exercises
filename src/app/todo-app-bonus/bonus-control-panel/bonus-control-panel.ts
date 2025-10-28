import { Component, ChangeDetectionStrategy, input, model } from '@angular/core';
import { DataSource, SyncState } from '../../models/performance.model';

@Component({
  selector: 'app-bonus-control-panel',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './bonus-control-panel.html',
  styleUrl: './bonus-control-panel.scss',
})
export class BonusControlPanelComponent {
  // Two-way bindings using model()
  useResource = model<boolean>(false);
  useHttpResource = model<boolean>(false);
  enableSync = model<boolean>(false);
  enableOptimistic = model<boolean>(false);
  enableDragDrop = model<boolean>(false);
  showPerformance = model<boolean>(true);

  // Read-only inputs
  dataSource = input.required<DataSource>();
  syncState = input.required<SyncState>();
}
