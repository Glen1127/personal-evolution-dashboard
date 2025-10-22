'use client';
import React from 'react';
import { useDashboard } from '@/components/dashboard/DashboardContext';
import AntiVisionCard from '@/components/dashboard/AntiVisionCard';
import MVPProjectCard from '@/components/dashboard/MVPProjectCard';
import PomodoroTimer from '@/components/dashboard/PomodoroTimer';
import EnergyLogCard from '@/components/dashboard/EnergyLogCard';
import ProgressCard from '@/components/dashboard/ProgressCard';
import SettingsModal from '@/components/dashboard/SettingsModal';

export default function DashboardPage() {
  const {
    dashboardData,
    showSettings,
    setShowSettings
  } = useDashboard();

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <header className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            🚀 个人进化仪表盘
          </h1>
          <p className="text-gray-600">
            基于 Dan Koe 12原则的实操工具 | 第
            <span className="font-semibold mx-1">
              {dashboardData.currentWeek}
            </span>
            周
          </p>
        </div>
        <button
          onClick={() => setShowSettings(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          设置
        </button>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-6">
          <AntiVisionCard />
          <MVPProjectCard />
        </div>

        <div className="space-y-6">
          <PomodoroTimer />
          <EnergyLogCard />
          <ProgressCard />
        </div>
      </div>

      {showSettings && <SettingsModal />}
    </div>
  );
}