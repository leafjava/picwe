import React from 'react'
import Spline from '@splinetool/react-spline';
export default function page() {
  return (
    <Spline
      style={{position:'absolute',transform:'scale(1)'}}
      scene="/scene.splinecode" 
    />
  )
}
