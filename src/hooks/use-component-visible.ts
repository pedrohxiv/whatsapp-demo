import { useEffect, useRef, useState } from "react";

interface ComponentVisible {
  ref: React.RefObject<any>;
  isVisible: boolean;
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export const useComponentVisible = (
  isComponentVisible: boolean
): ComponentVisible => {
  const [isVisible, setIsVisible] = useState(isComponentVisible);

  const ref = useRef<any>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsVisible(false);
      }
    };

    document.addEventListener("click", handleClickOutside, true);

    return () =>
      document.removeEventListener("click", handleClickOutside, true);
  }, []);

  return { ref, isVisible, setIsVisible };
};
