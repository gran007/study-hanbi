import { useEffect } from "react";

// const gap = 8;

export const checkIsInViewport = (elem: HTMLDivElement | null, debug: boolean | undefined) => {
  if (!elem || !window) {
    return false;
  }

  const {
    top: elementTop,
    bottom: elementBottom,
  } = elem.getBoundingClientRect();
  
  if(debug) {
    console.log(elementTop, window.pageYOffset, elementBottom);
  }

  return (
    // window.pageYOffset <= elementBottom && 
  window.pageYOffset >= elementTop
);
};

export const useWindowScrollEvent = (listener: EventListener) => {
  useEffect(() => {
    window.addEventListener('scroll', listener);

    return () => {
      window.removeEventListener('scroll', listener);
    };
  }, []);
};

export const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}