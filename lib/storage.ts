import { DashboardData } from '@/types';

const STORAGE_KEY = 'evolutionDashboard';

export const defaultDashboardData: DashboardData = {
  antiVision: '',
  standards: { bottomLine: '', redLines: '' },
  currentProject: null,
  tasks: [],
  energyLogs: [],
  currentWeek: 1,
  settings: {
    pomodoroDuration: 25,
    breakDuration: 5,
    notificationEnabled: true,
    reminderTime: '09:00'
  }
};

export const storage = {
  get(): DashboardData {
    if (typeof window === 'undefined') return defaultDashboardData;

    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? { ...defaultDashboardData, ...JSON.parse(stored) } : defaultDashboardData;
    } catch {
      return defaultDashboardData;
    }
  },

  set(data: DashboardData): void {
    if (typeof window === 'undefined') return;

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (error) {
      console.error('Failed to save data:', error);
    }
  }
};