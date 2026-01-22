'use client';

import { ShinyButton } from '@/components/ui/shiny-button';
import { useEffect } from 'react';
import AboutSection from './about';
import ServicesSection from './services';
import PricingSectionWrapper from './pricing';
import TestimonialsSection from './testimonials';
import Footer from './Footer';

export default function HeroSection() {
  useEffect(() => {
    // Load Unicorn Studio script
    if (!(window as any).UnicornStudio) {
      (window as any).UnicornStudio = { isInitialized: false };
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@v1.4.29/dist/unicornStudio.umd.js';
      script.onload = () => {
        if (!(window as any).UnicornStudio.isInitialized) {
          (window as any).UnicornStudio.init();
          (window as any).UnicornStudio.isInitialized = true;
        }
      };
      (document.head || document.body).appendChild(script);
    }
  }, []);

  return (
    <>
      <section className="relative z-10 flex min-h-screen items-center justify-center px-4 sm:px-6 lg:px-8 pt-20">
        {/* Unicorn Studio Background */}
        <div className="aura-background-component top-0 w-full -z-10 absolute h-full">
          <div data-us-project="EET25BiXxR2StNXZvAzF" className="absolute w-full h-full left-0 top-0 -z-10"></div>
        </div>
        <div className="max-w-4xl mx-auto w-full">
          <div className="space-y-8 text-center">
            {/* Title */}
            <div className="space-y-6">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold text-white leading-tight" style={{ fontFamily: 'var(--font-inter), Inter, sans-serif', letterSpacing: '-0.05em' }}>
                Transform PDFs into <br /> interactive flipbooks
              </h1>

              <p className="mx-auto max-w-2xl text-xs sm:text-sm md:text-base text-gray-400" style={{ fontFamily: 'Inter, sans-serif', letterSpacing: '-0.02em' }}>
                Create engaging digital publications with powerful analytics
              </p>
            </div>

            {/* CTA Button */}
            <div className="flex flex-col items-center gap-3 mt-10">
              <ShinyButton onClick={() => window.location.href = '/pricing'}>
                Get Started
              </ShinyButton>

              <p className="text-xs text-gray-400" style={{ fontFamily: 'var(--font-inter), Inter, sans-serif' }}>
                No Credit Card Required
              </p>
            </div>
          </div>
        </div>
      </section>

      <AboutSection />
      <ServicesSection />
      <PricingSectionWrapper />
      <TestimonialsSection />
      <Footer />
    </>
  );
}
