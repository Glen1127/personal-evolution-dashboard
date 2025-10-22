'use client';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { DashboardData, Project, Task, EnergyLog } from '@/types';
import { storage, defaultDashboardData } from '@/lib/storage';
import { ReminderService } from '@/lib/reminders';

interface DashboardContextType {
    dashboardData: DashboardData;
    setDashboardData: React.Dispatch<React.SetStateAction<DashboardData>>;
    saveAntiVision: (text: string) => void;
    saveStandards: (bottomLine: string, redLines: string) => void;
    createProject: (title: string, description: string) => void;
    addTask: (taskText: string) => void;
    toggleTask: (taskId: string) => void;
    deleteTask: (taskId: string) => void;
    logEnergy: (logText: string) => void;
    conductTwoWeekReview: () => void;
    updateSettings: (newSettings: Partial<DashboardData['settings']>) => void;
    showSettings: boolean;
    setShowSettings: (show: boolean) => void;
    activeTab: string;
    setActiveTab: (tab: string) => void;
}

const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

export const DashboardProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [dashboardData, setDashboardData] = useState<DashboardData>(() => storage.get());
    const [showSettings, setShowSettings] = useState(false);
    const [activeTab, setActiveTab] = useState('anti-vision');

    // 数据持久化
    useEffect(() => {
        storage.set(dashboardData);
    }, [dashboardData]);

    // 设置提醒
    useEffect(() => {
        const reminderService = ReminderService.getInstance();

        if (dashboardData.settings.notificationEnabled) {
            reminderService.requestNotificationPermission().then(hasPermission => {
                if (hasPermission) {
                    reminderService.scheduleDailyReminder(
                        dashboardData.settings.reminderTime,
                        () => {
                            reminderService.showNotification(
                                '每日进化提醒',
                                { body: '别忘了检查你的反愿景和项目进展！保持进化！' }
                            );
                        }
                    );
                }
            });
        } else {
            reminderService.clearAllReminders();
        }

        return () => {
            reminderService.clearAllReminders();
        };
    }, [dashboardData.settings.notificationEnabled, dashboardData.settings.reminderTime]);

    const saveAntiVision = (text: string) => {
        setDashboardData(prev => ({ ...prev, antiVision: text }));
    };

    const saveStandards = (bottomLine: string, redLines: string) => {
        setDashboardData(prev => ({
            ...prev,
            standards: { bottomLine, redLines }
        }));
    };

    const createProject = (title: string, description: string) => {
        const newProject: Project = {
            id: Date.now().toString(),
            title,
            description,
            startDate: new Date().toISOString(),
            tasks: []
        };

        setDashboardData(prev => ({
            ...prev,
            currentProject: newProject
        }));
    };

    const addTask = (taskText: string) => {
        if (!dashboardData.currentProject) return;

        const newTask: Task = {
            id: Date.now().toString(),
            text: taskText,
            completed: false,
            createdAt: new Date().toISOString()
        };

        setDashboardData(prev => ({
            ...prev,
            currentProject: prev.currentProject ? {
                ...prev.currentProject,
                tasks: [...prev.currentProject.tasks, newTask]
            } : null
        }));
    };

    const toggleTask = (taskId: string) => {
        if (!dashboardData.currentProject) return;

        setDashboardData(prev => ({
            ...prev,
            currentProject: prev.currentProject ? {
                ...prev.currentProject,
                tasks: prev.currentProject.tasks.map(task =>
                    task.id === taskId ? { ...task, completed: !task.completed } : task
                )
            } : null
        }));
    };

    const deleteTask = (taskId: string) => {
        if (!dashboardData.currentProject) return;

        setDashboardData(prev => ({
            ...prev,
            currentProject: prev.currentProject ? {
                ...prev.currentProject,
                tasks: prev.currentProject.tasks.filter(task => task.id !== taskId)
            } : null
        }));
    };

    const logEnergy = (logText: string) => {
        const newLog: EnergyLog = {
            text: logText,
            date: new Date().toLocaleDateString('zh-CN'),
            timestamp: Date.now()
        };

        setDashboardData(prev => ({
            ...prev,
            energyLogs: [newLog, ...prev.energyLogs.slice(0, 19)] // 保留最近20条
        }));
    };

    const conductTwoWeekReview = () => {
        setDashboardData(prev => ({
            ...prev,
            currentWeek: prev.currentWeek + 1
        }));
    };

    const updateSettings = (newSettings: Partial<DashboardData['settings']>) => {
        setDashboardData(prev => ({
            ...prev,
            settings: { ...prev.settings, ...newSettings }
        }));
    };

    const value: DashboardContextType = {
        dashboardData,
        setDashboardData,
        saveAntiVision,
        saveStandards,
        createProject,
        addTask,
        toggleTask,
        deleteTask,
        logEnergy,
        conductTwoWeekReview,
        updateSettings,
        showSettings,
        setShowSettings,
        activeTab,
        setActiveTab
    };

    return (
        <DashboardContext.Provider value={value}>
            {children}
        </DashboardContext.Provider>
    );
};

export const useDashboard = () => {
    const context = useContext(DashboardContext);
    if (context === undefined) {
        throw new Error('useDashboard must be used within a DashboardProvider');
    }
    return context;
};