'use client';
import React from 'react';
import { useDashboard } from './DashboardContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { calculateProgress } from '@/lib/utils';

export default function ProgressCard() {
  const { dashboardData, conductTwoWeekReview } = useDashboard();

  const getProgressAssessment = () => {
    if (!dashboardData.currentProject) {
      return { message: '请先创建一个项目来跟踪进展', color: 'text-gray-600', emoji: '📋' };
    }

    const progress = calculateProgress(dashboardData.currentProject.tasks);
    const totalTasks = dashboardData.currentProject.tasks.length;
    const completedTasks = dashboardData.currentProject.tasks.filter(t => t.completed).length;

    if (progress >= 70) {
      return {
        message: '优秀进展！继续保持这个方向。',
        color: 'text-green-600',
        emoji: '✅'
      };
    } else if (progress >= 30) {
      return {
        message: '有一些进展，但可能需要调整方法。',
        color: 'text-yellow-600',
        emoji: '⚠️'
      };
    } else {
      return {
        message: '进展缓慢，需要重新评估方向或方法。',
        color: 'text-red-600',
        emoji: '❌'
      };
    }
  };

  const assessment = getProgressAssessment();

  return (
    <Card>
      <CardHeader>
        <CardTitle>📈 进展追踪</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {dashboardData.currentProject ? (
            <>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-semibold text-blue-900 mb-2">当前项目</h4>
                <p className="text-blue-800">{dashboardData.currentProject.title}</p>
                {dashboardData.currentProject.description && (
                  <p className="text-blue-700 text-sm mt-1">{dashboardData.currentProject.description}</p>
                )}
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">任务完成度</span>
                  <span className="text-sm font-semibold">
                    {dashboardData.currentProject.tasks.filter(t => t.completed).length}/
                    {dashboardData.currentProject.tasks.length}
                    ({calculateProgress(dashboardData.currentProject.tasks)}%)
                  </span>
                </div>

                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-green-600 h-3 rounded-full transition-all duration-300"
                    style={{ width: `${calculateProgress(dashboardData.currentProject.tasks)}%` }}
                  ></div>
                </div>
              </div>

              <div className={`p-3 rounded-lg border ${assessment.color.replace('text', 'border')} bg-opacity-10`}>
                <div className="flex items-center">
                  <span className="text-xl mr-2">{assessment.emoji}</span>
                  <span className={assessment.color}>{assessment.message}</span>
                </div>
              </div>
            </>
          ) : (
            <div className="text-center py-6">
              <p className="text-gray-500 mb-4">还没有创建项目</p>
              <p className="text-sm text-gray-400">创建一个最小可行项目(MVP)开始追踪进展</p>
            </div>
          )}

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <h4 className="font-semibold text-yellow-800 mb-2">Dan Koe 两周检验法则</h4>
            <p className="text-yellow-700 text-sm mb-3">
              如果两周后没有明显进展，说明你在做错事。停下来，不是认输，是止损。
            </p>

            <div className="flex justify-between items-center">
              <span className="text-yellow-800 text-sm">
                当前周期: 第 {dashboardData.currentWeek} 周
              </span>

              <button
                onClick={conductTwoWeekReview}
                className="px-3 py-1 bg-yellow-600 text-white rounded text-sm hover:bg-yellow-700 transition-colors"
              >
                进行两周检验
              </button>
            </div>
          </div>

          {dashboardData.currentProject && (
            <div className="space-y-2">
              <h5 className="font-medium text-gray-700">任务详情：</h5>
              <div className="max-h-40 overflow-y-auto space-y-1">
                {dashboardData.currentProject.tasks.map(task => (
                  <div
                    key={task.id}
                    className={`flex items-center p-2 text-sm ${task.completed ? 'bg-green-50 text-green-700' : 'bg-gray-50 text-gray-700'
                      } rounded`}
                  >
                    <span className={`flex-1 ${task.completed ? 'line-through' : ''}`}>
                      {task.text}
                    </span>
                    <span className={`text-xs px-2 py-1 rounded ${task.completed ? 'bg-green-200 text-green-800' : 'bg-gray-200 text-gray-600'
                      }`}>
                      {task.completed ? '已完成' : '进行中'}
                    </span>
                  </div>
                ))}

                {dashboardData.currentProject.tasks.length === 0 && (
                  <p className="text-center text-gray-500 py-2 text-sm">暂无任务</p>
                )}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}