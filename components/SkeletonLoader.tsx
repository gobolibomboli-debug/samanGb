import React from 'react';

interface SkeletonLoaderProps {
  className?: string;
}

const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({ className = 'h-8 w-full' }) => {
  return (
    <div className={`relative overflow-hidden bg-gray-800/50 rounded-md ${className}`}>
      <div className="shimmer absolute top-0 right-0 bottom-0 left-0"></div>
    </div>
  );
};

export default SkeletonLoader;
