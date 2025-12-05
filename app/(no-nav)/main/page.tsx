'use client';

import React from 'react';
import Spline from '@splinetool/react-spline';
import { useRouter } from 'next/navigation';

export default function MainPage() {
  const router = useRouter();

  function onSplineMouseDown(e: any) {
    // 检查点击的对象名称
    if (e.target.name === 'Transform Your Business' || 
        e.target.name === 'Discover more' ||
        e.target.name === 'Button1' || 
        e.target.name === 'Button2') {
      router.push('/home');
    }
  }

  return (
    <Spline
      style={{ position: 'absolute', width: '100%', height: '100%' }}
      scene="/scene.splinecode"
      onMouseDown={onSplineMouseDown}
    />
  );
}
