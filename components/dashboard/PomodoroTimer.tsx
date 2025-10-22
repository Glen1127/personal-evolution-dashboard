// ...existing code...
'use client';
import React, { useState, useEffect, useRef } from 'react';
import { useDashboard } from './DashboardContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { formatTime } from '@/lib/utils';
import { ReminderService } from '@/lib/reminders';

type TimerMode = 'work' | 'break' | 'idle';

export default function PomodoroTimer() {
  const { dashboardData } = useDashboard();
  const [timeLeft, setTimeLeft] = useState(dashboardData.settings.pomodoroDuration * 60);
  const [isActive, setIsActive] = useState(false);
  const [mode, setMode] = useState<TimerMode>('idle');
  const [currentTask, setCurrentTask] = useState('');
  // 改为 number | null，使用浏览器的 setInterval 返回类型
  const intervalRef = useRef<number | null>(null);

  const workDuration = dashboardData.settings.pomodoroDuration * 60;
  const breakDuration = dashboardData.settings.breakDuration * 60;

  useEffect(() => {
    if (isActive) {
      // 使用 window.setInterval 保证在浏览器环境返回 number
      intervalRef.current = window.setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            // 时间结束，清除定时器并更新状态
            if (intervalRef.current !== null) {
              window.clearInterval(intervalRef.current);
              intervalRef.current = null;
            }
            setIsActive(false);

            const reminderService = ReminderService.getInstance();
            if (mode === 'work') {
              reminderService.showNotification(
                '工作时间结束',
                { body: '恭喜完成一个番茄钟！该休息一下了。' }
              );
              setMode('break');
              setTimeLeft(breakDuration);
            } else {
              reminderService.showNotification(
                '休息时间结束',
                { body: '休息时间到，准备开始下一个工作时段吧！' }
              );
              setMode('idle');
              setTimeLeft(workDuration);
            }

            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (intervalRef.current !== null) {
        window.clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    return () => {
      if (intervalRef.current !== null) {
        window.clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isActive, mode, workDuration, breakDuration]);

  const startTimer = (timerMode: TimerMode) => {
    setIsActive(true);
    setMode(timerMode);

    if (timerMode === 'work') {
      setTimeLeft(workDuration);
    } else {
      setTimeLeft(breakDuration);
    }
  };

  const pauseTimer = () => {
    setIsActive(false);
  };

  const resetTimer = () => {
    setIsActive(false);
    setMode('idle');
    setTimeLeft(workDuration);
  };

  const getTimerColor = () => {
    if (mode === 'work') return 'text-red-600';
    if (mode === 'break') return 'text-green-600';
    return 'text-gray-600';
  };

  const getModeText = () => {
    if (mode === 'work') return '工作中';
    if (mode === 'break') return '休息中';
    return '准备开始';
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>⏱️ 番茄工作法</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-center space-y-4">
          <div className={`text-5xl font-mono font-bold ${getTimerColor()}`}>
            {formatTime(timeLeft)}
          </div>

          <div className="text-sm text-gray-600">
            {getModeText()}
            {currentTask && ` · ${currentTask}`}
          </div>

          <div className="flex flex-col space-y-2">
            <input
              type="text"
              value={currentTask}
              onChange={(e) => setCurrentTask(e.target.value)}
              placeholder="当前任务..."
              className="w-full p-2 border border-gray-300 rounded-lg text-center"
            />

            <div className="flex space-x-2 justify-center">
              {!isActive ? (
                <>
                  <button
                    onClick={() => startTimer('work')}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                  >
                    开始工作
                  </button>
                  <button
                    onClick={() => startTimer('break')}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    开始休息
                  </button>
                </>
              ) : (
                <button
                  onClick={pauseTimer}
                  className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors"
                >
                  暂停
                </button>
              )}

              <button
                onClick={resetTimer}
                className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
              >
                重置
              </button>
            </div>
          </div>

          <div className="text-xs text-gray-500">
            <p>工作: {dashboardData.settings.pomodoroDuration}分钟</p>
            <p>休息: {dashboardData.settings.breakDuration}分钟</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
// ...existing code...