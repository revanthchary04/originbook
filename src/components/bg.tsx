'use client';

import { useEffect } from 'react';

export default function AuraBackground() {
  useEffect(() => {
    // Load Unicorn Studio script
    if (!window.UnicornStudio) {
      window.UnicornStudio = { isInitialized: false };
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@v1.4.29/dist/unicornStudio.umd.js';
      script.onload = function () {
        if (window.UnicornStudio && !window.UnicornStudio.isInitialized && window.UnicornStudio.init) {
          window.UnicornStudio.init();
          window.UnicornStudio.isInitialized = true;
        }
      };
      (document.head || document.body).appendChild(script);
    }
  }, []);

  return (
    <div
      className="aura-background-component top-0 w-full h-screen -z-10 absolute"
      data-alpha-mask="80"
      style={{
        maskImage: 'linear-gradient(to bottom, transparent, black 0%, black 80%, transparent)',
        WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 0%, black 80%, transparent)',
      }}
    >
      <div className="aura-background-component top-0 w-full -z-10 absolute h-full">
        <div
          data-us-project="EET25BiXxR2StNXZvAzF"
          className="absolute w-full h-full left-0 top-0 -z-10"
          data-us-initialized="true"
          data-scene-id="id-so0cxauptcb3jehon0cgg1"
        >
          <canvas
            aria-label="Unicorn Studio Scene"
            role="img"
          />
        </div>
      </div>
    </div>
  );
}

// TypeScript declaration for UnicornStudio
declare global {
  interface Window {
    UnicornStudio?: {
      isInitialized: boolean;
      init?: () => void;
    };
  }
}
