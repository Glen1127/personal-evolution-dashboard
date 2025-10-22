export class ReminderService {
  private static instance: ReminderService;
  private intervals: NodeJS.Timeout[] = [];

  private constructor() { }

  static getInstance(): ReminderService {
    if (!ReminderService.instance) {
      ReminderService.instance = new ReminderService();
    }
    return ReminderService.instance;
  }

  scheduleDailyReminder(reminderTime: string, callback: () => void) {
    this.clearAllReminders();

    const [hours, minutes] = reminderTime.split(':').map(Number);
    const now = new Date();
    const reminderDate = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      hours,
      minutes
    );

    if (now > reminderDate) {
      reminderDate.setDate(reminderDate.getDate() + 1);
    }

    const timeUntilReminder = reminderDate.getTime() - now.getTime();

    const timeout = setTimeout(() => {
      callback();
      // Schedule next day
      const dailyInterval = setInterval(() => {
        callback();
      }, 24 * 60 * 60 * 1000);

      this.intervals.push(dailyInterval);
    }, timeUntilReminder);

    this.intervals.push(timeout);
  }

  schedulePomodoroReminder(duration: number, callback: () => void) {
    const timeout = setTimeout(() => {
      callback();
    }, duration * 60 * 1000);

    this.intervals.push(timeout);
    return timeout;
  }

  clearAllReminders() {
    this.intervals.forEach(clearTimeout);
    this.intervals = [];
  }

  async requestNotificationPermission(): Promise<boolean> {
    if (!('Notification' in window)) return false;

    if (Notification.permission === 'granted') {
      return true;
    }

    const permission = await Notification.requestPermission();
    return permission === 'granted';
  }

  showNotification(title: string, options?: NotificationOptions) {
    if (Notification.permission === 'granted') {
      new Notification(title, options);
    }
  }
}