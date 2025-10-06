import React, { useState, useEffect, useRef } from 'react';

interface SectionWrapperProps {
  children: React.ReactNode;
  className?: string; // For any passthrough classes
}

const SectionWrapper: React.FC<SectionWrapperProps> = ({ children, className = '' }) => {
  const [isFocused, setIsFocused] = useState(false);
  const domRef = useRef<HTMLDivElement>(null);
  const [scrollContainer, setScrollContainer] = useState<Element | null>(null);

  useEffect(() => {
    // This effect runs once to find the nearest scrollable ancestor container.
    // This allows the component to work correctly inside modals or other overflow containers.
    if (domRef.current) {
        let parent = domRef.current.parentElement;
        while (parent) {
            const style = window.getComputedStyle(parent);
            if (style.overflowY === 'auto' || style.overflowY === 'scroll') {
                setScrollContainer(parent);
                break;
            }
            // Stop at the document element
            if (parent === document.documentElement) break;
            parent = parent.parentElement;
        }
    }
  }, []);

  useEffect(() => {
    // The observer's root is the found scroll container, or null which defaults to the viewport.
    // The rootMargin of '-40%' on top and bottom creates a "focus zone" in the middle 20% of the container.
    const observer = new IntersectionObserver(
      (entries) => {
        setIsFocused(entries[0].isIntersecting);
      },
      {
        root: scrollContainer,
        rootMargin: '-40% 0px -40% 0px',
        threshold: 0, // Trigger as soon as any part of the element enters the focus zone
      }
    );

    const currentRef = domRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [scrollContainer]);

  return (
    <div 
      ref={domRef}
      className={`transition-all duration-700 ease-out ${isFocused ? 'opacity-100 scale-100' : 'opacity-50 scale-95'} ${className}`}
    >
      {children}
    </div>
  );
};

export default SectionWrapper;