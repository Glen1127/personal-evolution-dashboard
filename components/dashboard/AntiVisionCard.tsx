'use client';
import React, { useState } from 'react';
import { useDashboard } from './DashboardContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';

export default function AntiVisionCard() {
  const {
    dashboardData,
    saveAntiVision,
    saveStandards,
    activeTab,
    setActiveTab
  } = useDashboard();

  const [antiVisionText, setAntiVisionText] = useState(dashboardData.antiVision);
  const [bottomLine, setBottomLine] = useState(dashboardData.standards.bottomLine);
  const [redLines, setRedLines] = useState(dashboardData.standards.redLines);

  const handleSaveAntiVision = () => {
    saveAntiVision(antiVisionText);
  };

  const handleSaveStandards = () => {
    saveStandards(bottomLine, redLines);
  };

  const tabs = [
    { id: 'anti-vision', label: '反愿景' },
    { id: 'standards', label: '人生标准' },
    { id: 'progress', label: '进展追踪' }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>📋 反愿景 & 人生标准</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="border-b">
          <nav className="-mb-px flex space-x-8">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="mt-4">
          {activeTab === 'anti-vision' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                我绝对不要的生活：
              </label>
              <textarea
                value={antiVisionText}
                onChange={(e) => setAntiVisionText(e.target.value)}
                placeholder="详细描述你最害怕的未来生活状态...这将是你改变的强大动力"
                className="w-full h-32 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button
                onClick={handleSaveAntiVision}
                className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                保存反愿景
              </button>
            </div>
          )}

          {activeTab === 'standards' && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  我的底线标准：
                </label>
                <textarea
                  value={bottomLine}
                  onChange={(e) => setBottomLine(e.target.value)}
                  placeholder="例如：银行存款不低于X元，每周运动3次，11点前睡觉..."
                  className="w-full h-20 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  我的行为红线：
                </label>
                <textarea
                  value={redLines}
                  onChange={(e) => setRedLines(e.target.value)}
                  placeholder="例如：绝不因害怕放弃机会，绝不熬夜刷手机，绝不..."
                  className="w-full h-20 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <button
                onClick={handleSaveStandards}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                保存标准
              </button>
            </div>
          )}

          {activeTab === 'progress' && (
            <div>
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
                <h4 className="font-semibold text-yellow-800 mb-2">Dan Koe 两周法则</h4>
                <p className="text-yellow-700 text-sm">
                  如果两周后你在目标上没有明显进展，说明你在做错事。停下来，不是认输，是止损。
                </p>
              </div>

              {dashboardData.currentProject && (
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">项目进度：</span>
                    <span className="text-sm text-gray-600">
                      {dashboardData.currentProject.tasks.filter(t => t.completed).length}/
                      {dashboardData.currentProject.tasks.length} 任务完成
                    </span>
                  </div>

                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-green-600 h-2 rounded-full transition-all duration-300"
                      style={{
                        width: `${dashboardData.currentProject.tasks.length > 0
                          ? (dashboardData.currentProject.tasks.filter(t => t.completed).length / dashboardData.currentProject.tasks.length) * 100
                          : 0
                          }%`
                      }}
                    ></div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}