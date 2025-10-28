import { Component, ChangeDetectionStrategy, input, computed } from '@angular/core';
import { SyncState } from '../../models/performance.model';

@Component({
  selector: 'app-sync-status',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './sync-status.html',
  styleUrl: './sync-status.scss',
})
export class SyncStatusComponent {
  syncState = input.required<SyncState>();

  statusIcon = computed(() => {
    const status = this.syncState().status;
    switch (status) {
      case 'idle':
        return '⏸️';
      case 'syncing':
        return '🔄';
      case 'synced':
        return '✅';
      case 'error':
        return '❌';
      default:
        return '❓';
    }
  });

  statusLabel = computed(() => {
    const status = this.syncState().status;
    switch (status) {
      case 'idle':
        return 'לא פעיל';
      case 'syncing':
        return 'מסנכרן...';
      case 'synced':
        return 'מסונכרן';
      case 'error':
        return 'שגיאה';
      default:
        return 'לא ידוע';
    }
  });

  lastSyncFormatted = computed(() => {
    const lastSync = this.syncState().lastSync;
    if (!lastSync) return 'אף פעם';

    const now = new Date();
    const diff = now.getTime() - lastSync.getTime();
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);

    if (seconds < 60) {
      return `לפני ${seconds} שניות`;
    } else if (minutes < 60) {
      return `לפני ${minutes} דקות`;
    } else {
      return lastSync.toLocaleTimeString('he-IL');
    }
  });
}
