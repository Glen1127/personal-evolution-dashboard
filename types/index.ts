export interface DashboardData {
  antiVision: string;
  standards: {
    bottomLine: string;
    redLines: string;
  };
  currentProject: Project | null;
  tasks: Task[];
  energyLogs: EnergyLog[];
  currentWeek: number;
  settings: Settings;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  startDate: string;
  tasks: Task[];
}

export interface Task {
  id: string;
  text: string;
  completed: boolean;
  createdAt: string;
}

export interface EnergyLog {
  text: string;
  date: string;
  timestamp: number;
}

export interface Settings {
  pomodoroDuration: number;
  breakDuration: number;
  notificationEnabled: boolean;
  reminderTime: string;
}