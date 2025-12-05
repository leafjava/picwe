'use client';

import React from 'react';
import Spline from '@splinetool/react-spline';
import { useRouter } from 'next/navigation';

export default function MainPage() {
  const router = useRouter();

  function onSplineMouseDown(e: any) {
    // 打印点击的对象信息，用于调试
    console.log('Clicked object:', e.target);
    console.log('Object name:', e.target?.name);
    console.log('Object id:', e.target?.id);
    
    // 如果点击了任何对象，都跳转到 home 页面
    // 你可以根据实际的 Spline 对象名称来调整条件
    if (e.target) {
      console.log('Navigating to /home');
      // router.push('/home');
    }
  }

  // 也可以使用 onClick 事件作为备选
  function onSplineClick(e: any) {
    console.log('Click event:', e);
    if (e.target) {
      // router.push('/home');
    }
  }

  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh', overflow: 'hidden' }}>
      <Spline
        style={{ width: '100%', height: '100%' }}
        scene="/scene.splinecode"
      />
      {/* 可点击的透明按钮区域 - 使用视口单位保持响应式 */}
      {/* <div 
        onClick={() => router.push('/home')}
        style={{
          position: 'absolute',
          width: '18vw',  // 使用视口宽度单位
          height: '10vh', // 使用视口高度单位
          top: '55%',
          left: '20%',
          transform: 'translate(-50%, -50%)', // 居中对齐
          cursor: 'pointer',
          // backgroundColor: 'rgba(255, 0, 0, 0.3)', // 调试时可以显示红色半透明
          backgroundColor: 'transparent', // 生产环境使用透明
        }}
      /> */}
    </div>
  );
}
