'use client';

import { Star, StarHalf, Quote, Sparkles } from 'lucide-react';
import Image from 'next/image';

export default function TestimonialsSection() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes scrollUp {
            0% {
              transform: translateY(0);
            }
            100% {
              transform: translateY(-33.33%);
            }
          }

          @keyframes scrollDown {
            0% {
              transform: translateY(-33.33%);
            }
            100% {
              transform: translateY(0);
            }
          }

          .scroll-column-1 {
            animation: scrollUp 20s linear infinite;
          }

          .scroll-column-2 {
            animation: scrollDown 20s linear infinite;
          }

          .scroll-column-3 {
            animation: scrollUp 20s linear infinite;
          }

          .scroll-column-1:hover,
          .scroll-column-2:hover,
          .scroll-column-3:hover {
            animation-play-state: paused;
          }
        `
      }} />

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12 text-center">
          <span className="text-sm font-medium text-rose-400">Testimonials</span>
          <h2 className="mt-2 text-3xl md:text-4xl font-semibold" style={{ fontFamily: 'Inter, sans-serif', letterSpacing: '-0.02em' }}>
            What our users say.
          </h2>
          
          {/* Rating Badge */}
          <div className="mt-4 inline-flex items-center gap-2 rounded-full border px-3 py-1.5 border-white/10 bg-white/5">
            <span className="inline-flex items-center -space-x-2">
              <Image
                className="h-6 w-6 rounded-full ring-2 object-cover ring-neutral-900"
                src="https://images.unsplash.com/photo-1527980965255-d3b416303d12?q=80&w=200&auto=format&fit=crop"
                alt="Reviewer 1"
                width={24}
                height={24}
              />
              <Image
                className="h-6 w-6 rounded-full ring-2 object-cover ring-neutral-900"
                src="https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?q=80&w=200&auto=format&fit=crop"
                alt="Reviewer 2"
                width={24}
                height={24}
              />
              <Image
                className="h-6 w-6 rounded-full ring-2 object-cover ring-neutral-900"
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop"
                alt="Reviewer 3"
                width={24}
                height={24}
              />
              <Image
                className="h-6 w-6 rounded-full ring-2 object-cover ring-neutral-900"
                src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop"
                alt="Reviewer 4"
                width={24}
                height={24}
              />
            </span>
            <span className="ml-2 inline-flex items-center gap-1 text-sm text-neutral-300">
              <Star className="w-4 h-4 text-amber-300 fill-amber-300" />
              <Star className="w-4 h-4 text-amber-300 fill-amber-300" />
              <Star className="w-4 h-4 text-amber-300 fill-amber-300" />
              <Star className="w-4 h-4 text-amber-300 fill-amber-300" />
              <StarHalf className="w-4 h-4 text-amber-300 fill-amber-300" />
              <span className="ml-1">4.9/5 • 2,431 reviews</span>
            </span>
          </div>
        </div>

        {/* Testimonials Grid */}
        <div
          className="grid grid-cols-1 overflow-hidden md:grid-cols-3 py-12 gap-x-6 gap-y-6"
          style={{
            maskImage: 'linear-gradient(180deg, transparent, black 45%, black 45%, transparent)',
            WebkitMaskImage: 'linear-gradient(180deg, transparent, black 45%, black 45%, transparent)',
          }}
        >
          {/* Column 1 - Scroll Up */}
          <div className="overflow-hidden">
            <div className="scroll-column-1 space-y-6">
              <TestimonialCard
                quote="The instant setup let our team start tracking KPIs in minutes, not days. It changed how we plan every sprint."
                name="Aisha Green"
                title="Head of Business Intelligence"
                image="https://images.unsplash.com/photo-1607746882042-944635dfe10e?q=80&w=256&auto=format&fit=crop"
              />
              <TestimonialCard
                quote="Reporting is effortless now. Our team shares concise insights in seconds—no confusion, no wasted time."
                name="Priya Patel"
                title="Marketing Director"
                image="https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=256&auto=format&fit=crop"
              />
              <TestimonialCard
                quote="From trial to rollout took under a week. Dashboards finally match how our teams actually work."
                name="Jonas Weber"
                title="Operations Lead"
                image="https://images.unsplash.com/photo-1546456073-6712f79251bb?q=80&w=256&auto=format&fit=crop"
              />
              {/* Duplicate for seamless loop */}
              <TestimonialCard
                quote="The instant setup let our team start tracking KPIs in minutes, not days. It changed how we plan every sprint."
                name="Aisha Green"
                title="Head of Business Intelligence"
                image="https://images.unsplash.com/photo-1607746882042-944635dfe10e?q=80&w=256&auto=format&fit=crop"
              />
            </div>
          </div>

          {/* Column 2 - Scroll Down */}
          <div className="overflow-hidden">
            <div className="scroll-column-2 space-y-6">
              <TestimonialCard
                quote="Clear, trustworthy reports across the org—security included. We cut weekly review time by 62%."
                name="Michael Chen"
                title="IT Security Lead"
                image="https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?q=80&w=256&auto=format&fit=crop"
              />
              <TestimonialCard
                quote="Integrations were seamless. No extra IT tickets, and we saved 120+ hours in the first quarter."
                name="Rachel Adams"
                title="Product Manager"
                image="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=256&auto=format&fit=crop"
              />
              <TestimonialCard
                quote="Support is outstanding. Every question had a thoughtful answer within minutes."
                name="Liam O'Connor"
                title="Customer Success Manager"
                image="https://images.unsplash.com/photo-1527980965255-d3b416303d12?q=80&w=256&auto=format&fit=crop"
              />
              {/* Duplicate for seamless loop */}
              <TestimonialCard
                quote="Clear, trustworthy reports across the org—security included. We cut weekly review time by 62%."
                name="Michael Chen"
                title="IT Security Lead"
                image="https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?q=80&w=256&auto=format&fit=crop"
              />
            </div>
          </div>

          {/* Column 3 - Scroll Up */}
          <div className="overflow-hidden">
            <div className="scroll-column-3 space-y-6">
              <TestimonialCard
                quote="Switching platforms was our best decision this year—intuitive, secure, and measurable results."
                name="Carlos Rivera"
                title="CEO"
                image="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=256&auto=format&fit=crop"
              />
              <TestimonialCard
                quote="Transparency removed all doubt. We always know where metrics stand and what to do next."
                name="Sofia Martinez"
                title="Analytics Lead"
                image="https://images.unsplash.com/photo-1554151228-14d9def656e4?q=80&w=256&auto=format&fit=crop"
              />
              <TestimonialCard
                quote="Predictive models helped us spot trends early and act faster. It's like a compass for growth."
                name="Noah Bennett"
                title="Strategy Director"
                image="https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?q=80&w=256&auto=format&fit=crop"
              />
              {/* Duplicate for seamless loop */}
              <TestimonialCard
                quote="Switching platforms was our best decision this year—intuitive, secure, and measurable results."
                name="Carlos Rivera"
                title="CEO"
                image="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=256&auto=format&fit=crop"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

interface TestimonialCardProps {
  quote: string;
  name: string;
  title: string;
  image: string;
}

function TestimonialCard({ quote, name, title, image }: TestimonialCardProps) {
  return (
    <article className="rounded-2xl border p-6 border-white/10 bg-neutral-900/70">
      <blockquote className="text-[16px] sm:text-[18px] text-neutral-100">
        <span className="inline-flex items-center gap-2">
          <Quote className="w-4 h-4 text-neutral-400 flex-shrink-0" />
          {quote}
        </span>
      </blockquote>
      <div className="mt-5 flex items-center gap-3">
        <Image
          className="h-10 w-10 rounded-full object-cover ring-2 ring-white/10"
          src={image}
          alt={name}
          width={40}
          height={40}
        />
        <div>
          <div className="text-sm font-medium">{name}</div>
          <div className="text-xs text-neutral-400">{title}</div>
        </div>
      </div>
    </article>
  );
}
