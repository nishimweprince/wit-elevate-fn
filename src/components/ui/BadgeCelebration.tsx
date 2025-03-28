import React, { useEffect, useRef } from 'react';
import Confetti from 'react-confetti';
import { useWindowSize } from 'react-use';

interface BadgeCelebrationProps {
  isVisible: boolean;
  onComplete?: () => void;
}

export const BadgeCelebration: React.FC<BadgeCelebrationProps> = ({ isVisible, onComplete }) => {
  const { width, height } = useWindowSize();
  const timeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (isVisible) {
      // Clear any existing timeout
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      // Set new timeout
      timeoutRef.current = setTimeout(() => {
        if (onComplete) {
          onComplete();
        }
      }, 5000); // Show confetti for 5 seconds

      // Cleanup function
      return () => {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
      };
    }
  }, [isVisible, onComplete]);

  if (!isVisible) return null;

  return (
    <Confetti
      width={width}
      height={height}
      numberOfPieces={200}
      recycle={false}
      colors={['#4E44F4', '#FFD700', '#FF69B4', '#00FF00', '#FF4500']}
      gravity={0.3}
      initialVelocityY={30}
      tweenDuration={5000}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        pointerEvents: 'none',
        zIndex: 9999
      }}
    />
  );
}; 
