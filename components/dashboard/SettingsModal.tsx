'use client';
import React from 'react';
import { useDashboard } from './DashboardContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';

export default function SettingsModal() {
  const { dashboardData, updateSettings, setShowSettings } = useDashboard();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    updateSettings({
      pomodoroDuration: parseInt(formData.get('pomodoroDuration') as string),
      breakDuration: parseInt(formData.get('breakDuration') as string),
      notificationEnabled: formData.get('notificationEnabled') === 'on',
      reminderTime: formData.get('reminderTime') as string
    });

    setShowSettings(false);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <CardTitle>⚙️ 设置</CardTitle>
            <button
              onClick={() => setShowSettings(false)}
              className="text-gray-500 hover:text-gray-700 text-xl"
            >
              ✕
            </button>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  番茄钟工作时间 (分钟)
                </label>
                <input
                  type="number"
                  name="pomodoroDuration"
                  defaultValue={dashboardData.settings.pomodoroDuration}
                  min="5"
                  max="60"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  休息时间 (分钟)
                </label>
                <input
                  type="number"
                  name="breakDuration"
                  defaultValue={dashboardData.settings.breakDuration}
                  min="1"
                  max="30"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="notificationEnabled"
                  defaultChecked={dashboardData.settings.notificationEnabled}
                  className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  id="notificationEnabled"
                />
                <label htmlFor="notificationEnabled" className="ml-2 block text-sm text-gray-700">
                  启用每日提醒
                </label>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  每日提醒时间
                </label>
                <input
                  type="time"
                  name="reminderTime"
                  defaultValue={dashboardData.settings.reminderTime}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium text-gray-700 mb-2">数据管理</h4>
                <div className="space-y-2">
                  <button
                    type="button"
                    onClick={() => {
                      if (confirm('确定要导出所有数据吗？')) {
                        const dataStr = JSON.stringify(dashboardData, null, 2);
                        const dataBlob = new Blob([dataStr], { type: 'application/json' });
                        const url = URL.createObjectURL(dataBlob);
                        const link = document.createElement('a');
                        link.href = url;
                        link.download = `personal-evolution-data-${new Date().toISOString().split('T')[0]}.json`;
                        link.click();
                        URL.revokeObjectURL(url);
                      }
                    }}
                    className="w-full px-3 py-2 bg-green-100 text-green-700 text-sm rounded hover:bg-green-200 transition-colors"
                  >
                    导出数据
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      if (confirm('这将清除所有数据，确定要继续吗？')) {
                        localStorage.removeItem('evolutionDashboard');
                        window.location.reload();
                      }
                    }}
                    className="w-full px-3 py-2 bg-red-100 text-red-700 text-sm rounded hover:bg-red-200 transition-colors"
                  >
                    清除所有数据
                  </button>
                </div>
              </div>

              <div className="flex space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowSettings(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  取消
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  保存设置
                </button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}