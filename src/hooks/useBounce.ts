import { useState, useEffect, useRef } from 'react';

interface UseBounceOptions {
  delay?: number;
  scale?: number;
  duration?: number;
  easing?: string;
}

interface UseBounceReturn {
  isBouncing: boolean;
  bounce: () => void;
  bounceStyle: React.CSSProperties;
  bounceClass: string;
}

/**
 * Custom hook for bounce animations
 * Provides both CSS-in-JS and className-based bounce effects
 */
export const useBounce = (options: UseBounceOptions = {}): UseBounceReturn => {
  const {
    delay = 100,
    scale = 1.1,
    duration = 300,
    easing = 'cubic-bezier(0.68, -0.55, 0.265, 1.55)'
  } = options;

  const [isBouncing, setIsBouncing] = useState(false);
  const timeoutRef = useRef();

  const bounce = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    setIsBouncing(true);
    
    timeoutRef.current = setTimeout(() => {
      setIsBouncing(false);
    }, duration);
  };

  const bounceStyle: React.CSSProperties = {
    transform: isBouncing ? `scale(${scale})` : 'scale(1)',
    transition: `transform ${duration}ms ${easing}`,
  };

  const bounceClass = isBouncing ? 'animate-bounce' : '';

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return {
    isBouncing,
    bounce,
    bounceStyle,
    bounceClass,
  };
};

/**
 * Hook for trigger-based bounce animation
 * Automatically bounces when trigger changes
 */
export const useBounceTrigger = (
  trigger: any,
  options: UseBounceOptions = {}
): UseBounceReturn => {
  const bounceHook = useBounce(options);

  useEffect(() => {
    if (trigger !== undefined && trigger !== null) {
      bounceHook.bounce();
    }
  }, [trigger]);

  return bounceHook;
};

/**
 * Hook for hover-based bounce animation
 */
export const useBounceHover = (options: UseBounceOptions = {}) => {
  const bounceHook = useBounce(options);

  const onMouseEnter = () => {
    bounceHook.bounce();
  };

  const onMouseLeave = () => {
    // Optional: Add leave animation
  };

  return {
    ...bounceHook,
    onMouseEnter,
    onMouseLeave,
  };
};

/**
 * Hook for click-based bounce animation
 */
export const useBounceClick = (
  onClick?: () => void,
  options: UseBounceOptions = {}
) => {
  const bounceHook = useBounce(options);

  const handleClick = () => {
    bounceHook.bounce();
    if (onClick) {
      setTimeout(onClick, options.delay || 100);
    }
  };

  return {
    ...bounceHook,
    onClick: handleClick,
  };
};
