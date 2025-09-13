import React from "react";
import { motion, AnimatePresence } from "framer-motion";

export interface PageTransitionProps {
  children: React.ReactNode;
  animation?: "fade" | "slide" | "scale" | "blur" | "automotive";
  direction?: "left" | "right" | "up" | "down";
  duration?: number;
  className?: string;
}

const pageVariants = {
  fade: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  },
  slide: (direction: string) => ({
    initial: {
      x: direction === "left" ? "-100%" : direction === "right" ? "100%" : 0,
      y: direction === "up" ? "-100%" : direction === "down" ? "100%" : 0,
    },
    animate: { x: 0, y: 0 },
    exit: {
      x: direction === "left" ? "100%" : direction === "right" ? "-100%" : 0,
      y: direction === "up" ? "100%" : direction === "down" ? "-100%" : 0,
    },
  }),
  scale: {
    initial: { scale: 0.8, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    exit: { scale: 1.2, opacity: 0 },
  },
  blur: {
    initial: { filter: "blur(10px)", opacity: 0 },
    animate: { filter: "blur(0px)", opacity: 1 },
    exit: { filter: "blur(10px)", opacity: 0 },
  },
  automotive: {
    initial: {
      scale: 0.95,
      opacity: 0,
      filter: "blur(5px)",
      rotateX: 10,
    },
    animate: {
      scale: 1,
      opacity: 1,
      filter: "blur(0px)",
      rotateX: 0,
    },
    exit: {
      scale: 1.05,
      opacity: 0,
      filter: "blur(5px)",
      rotateX: -10,
    },
  },
};

const transitionSettings = {
  fade: { duration: 0.3, ease: "easeInOut" },
  slide: { duration: 0.4, ease: [0.4, 0, 0.2, 1] },
  scale: { duration: 0.3, ease: "easeOut" },
  blur: { duration: 0.5, ease: "easeInOut" },
  automotive: { duration: 0.6, ease: [0.4, 0, 0.2, 1] },
};

export const AnimatedPage: React.FC<PageTransitionProps> = ({
  children,
  animation = "automotive",
  direction = "right",
  duration,
  className = "",
}) => {
  const variants =
    animation === "slide"
      ? pageVariants.slide(direction)
      : pageVariants[animation];

  const transition = {
    ...transitionSettings[animation],
    ...(duration && { duration: duration / 1000 }),
  };

  return (
    <motion.div
      className={`min-h-screen ${className}`}
      initial="initial"
      animate="animate"
      exit="exit"
      variants={variants}
      transition={transition}
      style={{ perspective: "1000px" }}
    >
      {children}
    </motion.div>
  );
};

export const PageTransition: React.FC<
  {
    children: React.ReactNode;
    location: string;
  } & Omit<PageTransitionProps, "children">
> = ({ children, location, ...props }) => {
  return (
    <AnimatePresence mode="wait" initial={false}>
      <AnimatedPage key={location} {...props}>
        {children}
      </AnimatedPage>
    </AnimatePresence>
  );
};
