import { useEffect } from "react";

export const checkIsInViewport = (elem: HTMLDivElement | null) => {
  if (!elem || !window) {
    return false;
  }

  const {
    top: elementTop,
    bottom: elementBottom,
  } = elem.getBoundingClientRect();

  return elementBottom > 0 && elementTop <= window.innerHeight;
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