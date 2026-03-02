import { useRef, useCallback } from 'react';

export function useScrollDrag() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef(false);
  const mouseDownX = useRef(0);
  const startScrollLeft = useRef(0);

  const onMouseDown = useCallback((e: React.MouseEvent) => {
    mouseDownX.current = e.clientX;
    startScrollLeft.current = containerRef.current?.scrollLeft ?? 0;
  }, []);

  const onMouseMove = useCallback((e: React.MouseEvent) => {
    if (e.buttons !== 1) return;
    const dx = e.clientX - mouseDownX.current;
    if (Math.abs(dx) > 4) {
      isDraggingRef.current = true;
      if (containerRef.current) {
        containerRef.current.scrollLeft = startScrollLeft.current - dx;
      }
    }
  }, []);

  // Delay reset so onClick handlers fire first and can still read isDraggingRef
  const onMouseUp = useCallback(() => {
    setTimeout(() => { isDraggingRef.current = false; }, 0);
  }, []);

  const onMouseLeave = useCallback(() => {
    isDraggingRef.current = false;
  }, []);

  return {
    containerRef,
    isDraggingRef,
    dragHandlers: { onMouseDown, onMouseMove, onMouseUp, onMouseLeave },
  };
}
