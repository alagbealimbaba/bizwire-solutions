import { useEffect, useRef } from "react";
import gsap from "gsap";

export const useFloatingAnimation = () => {
  const imageRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline();
    tl.to(imageRef.current, {
      y: 40,
      duration: 1,
      opacity: 1,
      yoyo: true,
      repeat: -1,
    });
    tl.play();
  }, []);

  return imageRef;
};
