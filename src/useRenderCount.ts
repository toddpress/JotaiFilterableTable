import React, { useEffect, useRef } from "react";
export const useRenderCount = () => {
  const rerenderCountRef = useRef(0);
  useEffect(() => {
    rerenderCountRef.current += 1;
  });
  return rerenderCountRef.current;
};
