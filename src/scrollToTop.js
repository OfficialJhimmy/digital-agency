import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

// function onScroll (evt) {

//   // Store the scroll value for laterz.
//   lastScrollY = window.scrollY;

//   // Prevent multiple rAF callbacks.
//   if (scheduledAnimationFrame)
//     return;

//   scheduledAnimationFrame = true;
//   requestAnimationFrame(readAndUpdatePage);
// }

// window.addEventListener('scroll', onScroll);