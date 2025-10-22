'use client';
import React, { useState } from 'react';
import { useDashboard } from './DashboardContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { calculateProgress } from '@/lib/utils';

export default function MVPProjectCard() {
  const {
    dashboardData,
    createProject,
    addTask,
    toggleTask,
    deleteTask
  } = useDashboard();

  const [projectTitle, setProjectTitle] = useState('');
  const [projectDesc, setProjectDesc] = useState('');
  const [newTask, setNewTask] = useState('');

  const handleCreateProject = () => {
    if (!projectTitle.trim()) return;

    createProject(projectTitle, projectDesc);
    setProjectTitle('');
    setProjectDesc('');
  };

  const handleAddTask = () => {
    if (!newTask.trim() || !dashboardData.currentProject) return;

    addTask(newTask);
    setNewTask('');
  };

  const progress = dashboardData.currentProject
    ? calculateProgress(dashboardData.currentProject.tasks)
    : 0;

  return (
    <Card>
      <CardHeader>
        <CardTitle>🎯 最小可行项目 (MVP)</CardTitle>
      </CardHeader>
      <CardContent>
        {!dashboardData.currentProject ? (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                项目名称 *
              </label>
              <input
                type="text"
                value={projectTitle}
                onChange={(e) => setProjectTitle(e.target.value)}
                placeholder="给你的项目起个名字"
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                项目描述
              </label>
              <textarea
                value={projectDesc}
                onChange={(e) => setProjectDesc(e.target.value)}
                placeholder="描述这个项目的目标和预期成果"
                className="w-full h-20 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <button
              onClick={handleCreateProject}
              disabled={!projectTitle.trim()}
              className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
            >
              创建项目
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="font-semibold text-blue-900">{dashboardData.currentProject.title}</h3>
              {dashboardData.currentProject.description && (
                <p className="text-blue-800 text-sm mt-1">{dashboardData.currentProject.description}</p>
              )}
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">项目进度</span>
                <span className="text-sm text-gray-600">{progress}%</span>
              </div>

              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className="bg-green-600 h-3 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={newTask}
                  onChange={(e) => setNewTask(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleAddTask()}
                  placeholder="添加新任务..."
                  className="flex-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button
                  onClick={handleAddTask}
                  disabled={!newTask.trim()}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 transition-colors"
                >
                  添加
                </button>
              </div>

              <div className="space-y-2 max-h-60 overflow-y-auto">
                {dashboardData.currentProject.tasks.map(task => (
                  <div
                    key={task.id}
                    className={`flex items-center justify-between p-3 border rounded-lg ${task.completed ? 'bg-gray-50 border-gray-200' : 'bg-white border-gray-300'
                      }`}
                  >
                    <span className={`flex-1 ${task.completed ? 'line-through text-gray-500' : 'text-gray-900'}`}>
                      {task.text}
                    </span>

                    <div className="flex space-x-2">
                      <button
                        onClick={() => toggleTask(task.id)}
                        className={`px-3 py-1 rounded text-sm ${task.completed
                            ? 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200'
                            : 'bg-green-100 text-green-800 hover:bg-green-200'
                          }`}
                      >
                        {task.completed ? '重做' : '完成'}
                      </button>

                      <button
                        onClick={() => deleteTask(task.id)}
                        className="px-3 py-1 bg-red-100 text-red-800 rounded text-sm hover:bg-red-200"
                      >
                        删除
                      </button>
                    </div>
                  </div>
                ))}

                {dashboardData.currentProject.tasks.length === 0 && (
                  <p className="text-center text-gray-500 py-4">暂无任务，添加第一个任务开始吧！</p>
                )}
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}