'use client';
import React from 'react';
import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            🚀 个人进化仪表盘
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            基于 Dan Koe 12原则的实操工具
            <br />
            设计你的反愿景，追踪最小可行项目，实现个人进化
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 space-y-6">
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-900 text-center">
              开始你的进化之旅
            </h2>

            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <span className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm">1</span>
                <span className="text-gray-700">设定你的反愿景和人生标准</span>
              </div>

              <div className="flex items-center space-x-3">
                <span className="w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-sm">2</span>
                <span className="text-gray-700">创建最小可行项目并分解任务</span>
              </div>

              <div className="flex items-center space-x-3">
                <span className="w-6 h-6 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-sm">3</span>
                <span className="text-gray-700">使用番茄工作法保持专注</span>
              </div>

              <div className="flex items-center space-x-3">
                <span className="w-6 h-6 bg-yellow-100 text-yellow-600 rounded-full flex items-center justify-center text-sm">4</span>
                <span className="text-gray-700">追踪能量模式，优化精力分配</span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <Link
              href="/dashboard"
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-4 rounded-lg font-medium hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 transform hover:scale-105 block text-center"
            >
              进入仪表盘
            </Link>

            <div className="text-center">
              <p className="text-sm text-gray-500">
                基于 Dan Koe 的12条反常识改命原则
              </p>
            </div>
          </div>
        </div>

        <div className="text-center text-sm text-gray-500">
          <p>数据存储在本地浏览器中，保护你的隐私</p>
        </div>
      </div>
    </div>
  );
}