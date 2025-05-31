export const isTouchDevice = () => {
  if (typeof window !== "undefined") {
    // Client-side-only code
    return (
      "ontouchstart" in window ||
      navigator.maxTouchPoints > 0 ||
      navigator.msMaxTouchPoints > 0
    );
  }
};
