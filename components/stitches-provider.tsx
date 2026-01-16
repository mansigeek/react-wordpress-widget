'use client';

import { useEffect } from 'react';
import { getCssText } from '@/stitches.config';

export function StitchesProvider() {
  useEffect(() => {
    // Inject Stitches CSS on client side
    const styleId = 'stitches-css';
    if (!document.getElementById(styleId)) {
      const style = document.createElement('style');
      style.id = styleId;
      style.innerHTML = getCssText();
      document.head.appendChild(style);
    }
  }, []);

  return null;
}
