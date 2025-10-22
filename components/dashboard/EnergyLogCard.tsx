'use client';
import React, { useState } from 'react';
import { useDashboard } from './DashboardContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';

export default function EnergyLogCard() {
  const { dashboardData, logEnergy } = useDashboard();
  const [logText, setLogText] = useState('');

  const handleLogEnergy = () => {
    if (!logText.trim()) return;

    logEnergy(logText);
    setLogText('');
  };

  const analyzeEnergyPatterns = () => {
    if (dashboardData.energyLogs.length === 0) {
      return { energizing: [], draining: [] };
    }

    const energizing: string[] = [];
    const draining: string[] = [];

    dashboardData.energyLogs.forEach(log => {
      const text = log.text.toLowerCase();
      if (text.includes('充满能量') || text.includes('精力充沛') || text.includes('兴奋') || text.includes('专注')) {
        const activity = log.text.split('：')[1] || log.text;
        if (!energizing.includes(activity)) energizing.push(activity);
      }
      if (text.includes('耗尽') || text.includes('疲惫') || text.includes('压力') || text.includes('焦虑')) {
        const activity = log.text.split('：')[1] || log.text;
        if (!draining.includes(activity)) draining.push(activity);
      }
    });

    return { energizing, draining };
  };

  const { energizing, draining } = analyzeEnergyPatterns();

  return (
    <Card>
      <CardHeader>
        <CardTitle>💪 能量与热情记录</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <textarea
              value={logText}
              onChange={(e) => setLogText(e.target.value)}
              placeholder="今天什么让我充满能量? 什么耗尽了我的能量? (例如: 充满能量：晨跑30分钟；耗尽能量：无效会议2小时)"
              className="w-full h-20 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button
              onClick={handleLogEnergy}
              disabled={!logText.trim()}
              className="w-full mt-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:bg-gray-400 transition-colors"
            >
              记录能量
            </button>
          </div>

          <div className="space-y-4">
            {energizing.length > 0 && (
              <div>
                <h4 className="font-semibold text-green-700 mb-2">🔋 充满能量的活动：</h4>
                <ul className="space-y-1">
                  {energizing.map((activity, index) => (
                    <li key={index} className="text-sm text-green-600 bg-green-50 p-2 rounded">
                      {activity}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {draining.length > 0 && (
              <div>
                <h4 className="font-semibold text-red-700 mb-2">🔋 耗尽能量的活动：</h4>
                <ul className="space-y-1">
                  {draining.map((activity, index) => (
                    <li key={index} className="text-sm text-red-600 bg-red-50 p-2 rounded">
                      {activity}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="border-t pt-4">
              <h4 className="font-semibold text-gray-700 mb-2">最近记录：</h4>
              <div className="space-y-2 max-h-40 overflow-y-auto">
                {dashboardData.energyLogs.length === 0 ? (
                  <p className="text-center text-gray-500 py-4">暂无能量记录</p>
                ) : (
                  dashboardData.energyLogs.slice(0, 5).map((log, index) => (
                    <div key={index} className="text-sm p-2 border-b border-gray-100 last:border-b-0">
                      <div className="flex justify-between">
                        <span className="font-medium text-gray-900">{log.date}</span>
                        <span className="text-gray-500 text-xs">
                          {new Date(log.timestamp).toLocaleTimeString('zh-CN', {
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </span>
                      </div>
                      <p className="text-gray-700 mt-1">{log.text}</p>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}