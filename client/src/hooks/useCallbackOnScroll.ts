import { useEffect } from "react";

export const useCallbackOnScroll = (targetPercent: number, callback: () => void) => {
  useEffect(() => {
    const handleScrollChange = () => {
      const progress = window.pageYOffset + window.innerHeight;
      if (progress / document.body.scrollHeight * 100 >= targetPercent) {
        callback();
      }
    }

    window.addEventListener('scroll', handleScrollChange);
    return () => window.removeEventListener('scroll', handleScrollChange);
  }, [callback, targetPercent]);
}