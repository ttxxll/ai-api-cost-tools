'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

export default function LocaleDetector() {
  const pathname = usePathname();

  useEffect(() => {
    const lang = pathname.startsWith('/zh') ? 'zh' : 'en';
    document.documentElement.lang = lang;
  }, [pathname]);

  return null;
}
