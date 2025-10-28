export interface PerformanceMetrics {
  filterComputationTime: number;
  tasksProcessed: number;
  recomputationCount: number;
  averageTime: number;
  lastUpdate: Date;
}

export type SyncStatus = 'idle' | 'syncing' | 'synced' | 'error';

export interface SyncState {
  status: SyncStatus;
  lastSync: Date | null;
  error: string | null;
}

export type DataSource = 'localStorage' | 'api';

export interface BonusFeatureToggles {
  useResource: boolean;
  useHttpResource: boolean;
  enableSync: boolean;
  enableOptimistic: boolean;
  enableDragDrop: boolean;
  showPerformance: boolean;
}
