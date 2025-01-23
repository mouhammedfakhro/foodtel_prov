'use client';
import React from 'react';
import Lottie from 'lottie-react';

interface LottieAnimationProps {
  animationData: any;
  className?: string;
  autoplay?: boolean; 
  loop?: boolean; 
}

const LottieAnimation: React.FC<LottieAnimationProps> = ({
  animationData,
  className = 'max-w-96',
  autoplay = true,
  loop = true,
}) => {
  return (
    <div className={className}>
      <Lottie animationData={animationData} autoplay={autoplay} loop={loop} />
    </div>
  );
};

export default LottieAnimation;
