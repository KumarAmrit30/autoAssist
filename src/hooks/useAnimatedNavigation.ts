import { useNavigate } from "react-router-dom";
import { useCallback } from "react";

export interface NavigationOptions {
  /** Animation duration in milliseconds */
  duration?: number;
  /** Animation type */
  animation?: "fade" | "slide" | "scale" | "blur";
  /** Direction for slide animation */
  direction?: "left" | "right" | "up" | "down";
  /** Delay before navigation in milliseconds */
  delay?: number;
}

export const useAnimatedNavigation = () => {
  const navigate = useNavigate();

  const animatedNavigate = useCallback(
    (to: string, options: NavigationOptions = {}) => {
      const {
        duration = 300,
        animation = "fade",
        direction = "right",
        delay = 0,
      } = options;

      // Get the current page element
      const currentPage = document.body;

      // Apply exit animation
      const applyExitAnimation = () => {
        switch (animation) {
          case "fade":
            currentPage.style.transition = `opacity ${duration}ms ease-out`;
            currentPage.style.opacity = "0";
            break;

          case "slide":
            const slideDirection =
              direction === "left"
                ? "-100%"
                : direction === "right"
                ? "100%"
                : direction === "up"
                ? "0, -100%"
                : "0, 100%";
            currentPage.style.transition = `transform ${duration}ms cubic-bezier(0.4, 0, 0.2, 1)`;
            currentPage.style.transform = `translate(${slideDirection})`;
            break;

          case "scale":
            currentPage.style.transition = `transform ${duration}ms ease-out, opacity ${duration}ms ease-out`;
            currentPage.style.transform = "scale(0.95)";
            currentPage.style.opacity = "0";
            break;

          case "blur":
            currentPage.style.transition = `filter ${duration}ms ease-out, opacity ${duration}ms ease-out`;
            currentPage.style.filter = "blur(10px)";
            currentPage.style.opacity = "0";
            break;
        }
      };

      // Apply entrance animation when new page loads
      const applyEntranceAnimation = () => {
        const newPage = document.body;

        // Reset styles for new page
        newPage.style.transition = "";

        switch (animation) {
          case "fade":
            newPage.style.opacity = "0";
            setTimeout(() => {
              newPage.style.transition = `opacity ${duration}ms ease-in`;
              newPage.style.opacity = "1";
            }, 50);
            break;

          case "slide":
            const enterDirection =
              direction === "left"
                ? "100%"
                : direction === "right"
                ? "-100%"
                : direction === "up"
                ? "0, 100%"
                : "0, -100%";
            newPage.style.transform = `translate(${enterDirection})`;
            setTimeout(() => {
              newPage.style.transition = `transform ${duration}ms cubic-bezier(0.4, 0, 0.2, 1)`;
              newPage.style.transform = "translate(0, 0)";
            }, 50);
            break;

          case "scale":
            newPage.style.transform = "scale(1.05)";
            newPage.style.opacity = "0";
            setTimeout(() => {
              newPage.style.transition = `transform ${duration}ms ease-in, opacity ${duration}ms ease-in`;
              newPage.style.transform = "scale(1)";
              newPage.style.opacity = "1";
            }, 50);
            break;

          case "blur":
            newPage.style.filter = "blur(10px)";
            newPage.style.opacity = "0";
            setTimeout(() => {
              newPage.style.transition = `filter ${duration}ms ease-in, opacity ${duration}ms ease-in`;
              newPage.style.filter = "blur(0px)";
              newPage.style.opacity = "1";
            }, 50);
            break;
        }

        // Clean up styles after animation
        setTimeout(() => {
          newPage.style.transition = "";
          newPage.style.transform = "";
          newPage.style.opacity = "";
          newPage.style.filter = "";
        }, duration + 100);
      };

      // Execute the animation sequence
      setTimeout(() => {
        applyExitAnimation();

        // Navigate after exit animation completes
        setTimeout(() => {
          navigate(to);
          // Apply entrance animation on next tick
          setTimeout(applyEntranceAnimation, 0);
        }, duration);
      }, delay);
    },
    [navigate]
  );

  // Preset animation functions for common transitions
  const fadeNavigate = useCallback(
    (to: string, duration = 300) => {
      animatedNavigate(to, { animation: "fade", duration });
    },
    [animatedNavigate]
  );

  const slideNavigate = useCallback(
    (
      to: string,
      direction: "left" | "right" | "up" | "down" = "right",
      duration = 300
    ) => {
      animatedNavigate(to, { animation: "slide", direction, duration });
    },
    [animatedNavigate]
  );

  const scaleNavigate = useCallback(
    (to: string, duration = 300) => {
      animatedNavigate(to, { animation: "scale", duration });
    },
    [animatedNavigate]
  );

  const blurNavigate = useCallback(
    (to: string, duration = 300) => {
      animatedNavigate(to, { animation: "blur", duration });
    },
    [animatedNavigate]
  );

  return {
    animatedNavigate,
    fadeNavigate,
    slideNavigate,
    scaleNavigate,
    blurNavigate,
  };
};
