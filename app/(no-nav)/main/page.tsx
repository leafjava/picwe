'use client';

import React from 'react';
import Spline from '@splinetool/react-spline';
import { useRouter } from 'next/navigation';

/**
 * 主入口页面（带 3D 场景）
 * 功能：展示 Spline 3D 场景，点击按钮跳转到首页
 */
export default function MainPage() {
  const router = useRouter();

  /**
   * Spline 鼠标按下事件处理
   */
  function onSplineMouseDown(e: any) {
    console.log('Clicked object:', e.target);
    console.log('Object name:', e.target?.name);
    console.log('Object id:', e.target?.id);
    
    if (e.target) {
      console.log('Navigating to /home');
    }
  }

  /**
   * Spline 点击事件处理
   */
  function onSplineClick(e: any) {
    console.log('Click event:', e);
    if (e.target) {
      router.push('/home');
    }
  }

  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh', overflow: 'hidden' }}>
      {/* Spline 3D 场景 */}
      <Spline
        style={{  width: '100%', height: '100%' }}
        scene="/scene6.splinecode"
        onMouseDown={onSplineMouseDown}
        onClick={onSplineClick}
      />
      
      {/* 可点击的透明按钮区域 - 覆盖在 3D 场景的按钮位置上 */}
      <div 
        onClick={() => router.push('/home')}
        style={{
          position: 'absolute',
          width: '18vw',  // 使用视口宽度单位保持响应式
          height: '10vh', // 使用视口高度单位保持响应式
          top: '55%',     // 垂直位置
          left: '20%',    // 水平位置
          transform: 'translate(-50%, -50%)', // 居中对齐
          cursor: 'pointer',
          // backgroundColor: 'rgba(255, 0, 0, 0.3)', // 调试时可以显示红色半透明
          backgroundColor: 'transparent', // 生产环境使用透明
        }}
      />
    </div>
  );
}
