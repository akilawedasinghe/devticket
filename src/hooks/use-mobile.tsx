
import * as React from "react";

// Mobile breakpoint set to 768px for standard tablet/mobile detection
const MOBILE_BREAKPOINT = 768;

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean>(false);

  React.useEffect(() => {
    // Initial check function that determines if viewport width is below mobile breakpoint
    const checkMobile = () => {
      const mobileCheck = window.innerWidth < MOBILE_BREAKPOINT;
      if (isMobile !== mobileCheck) {
        setIsMobile(mobileCheck);
      }
    };
    
    // Check on mount
    checkMobile();
    
    // Add resize listener with throttling to improve performance
    let resizeTimer: number;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(checkMobile, 100);
    };
    
    window.addEventListener("resize", handleResize);
    
    // Clean up
    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(resizeTimer);
    };
  }, [isMobile]);

  return isMobile;
}

// Additional hook for getting specific breakpoints
export function useBreakpoint() {
  const [breakpoint, setBreakpoint] = React.useState<'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'>('md');
  
  React.useEffect(() => {
    const checkBreakpoint = () => {
      const width = window.innerWidth;
      if (width < 480) return 'xs';
      if (width < 640) return 'sm';
      if (width < 768) return 'md';
      if (width < 1024) return 'lg';
      if (width < 1280) return 'xl';
      return '2xl';
    };
    
    const updateBreakpoint = () => {
      setBreakpoint(checkBreakpoint());
    };
    
    // Check on mount
    updateBreakpoint();
    
    // Add resize listener with throttling
    let resizeTimer: number;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(updateBreakpoint, 100);
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(resizeTimer);
    };
  }, []);
  
  return {
    breakpoint,
    isMobile: ['xs', 'sm', 'md'].includes(breakpoint),
    isTablet: breakpoint === 'md',
    isDesktop: ['lg', 'xl', '2xl'].includes(breakpoint)
  };
}
