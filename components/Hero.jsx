import { ArrowRight, Play } from 'lucide-react';
import Link from 'next/link';

export default function Hero() {
  return (
    <section className="relative py-20 lg:py-16 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[#F5F3EB] to-[#E8E4D6]"></div>
      
      {/* Bolt Badge - Positioned in upper right */}
      <div className="absolute top-4 right-4 md:top-6 md:right-6 lg:top-8 lg:right-8 z-10">
        <Link 
          href="https://bolt.new/" 
          target="_blank" 
          rel="noopener noreferrer"
          className="block transition-transform duration-200 hover:scale-105 hover:opacity-90"
        >
          <img 
            src="/black_circle_360x360.png" 
            alt="Powered by Bolt" 
            className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 xl:w-24 xl:h-24 drop-shadow-lg"
          />
        </Link>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          {/* Main Headline */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
            <span style={{ color: '#2E3A59' }}>Navigate Your</span>
            <br />
            <span className="bg-gradient-to-r from-[var(--navy)] via-[var(--olive-green)] to-[var(--muted-gold)] bg-clip-text text-transparent">
              Next Mission
            </span>
          </h1>

          {/* Subheading */}
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed" style={{ color: '#5A5A5A' }}>
            Your personalized AI assistant designed specifically for veterans 
            transitioning to civilian life. Access tailored resources, support, and 
            guidance at every step of your journey.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Link href="/#action-plan-section" 
                  className="inline-flex items-center text-lg px-8 py-4 rounded-lg font-semibold transition-colors duration-200 text-white"
                  style={{ backgroundColor: 'var(--olive-green)' }}>
              Start Your Journey
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link href="/about" 
                  className="inline-flex items-center text-lg px-8 py-4 rounded-lg font-semibold transition-colors duration-200 text-white"
                  style={{ backgroundColor: 'var(--navy)' }}>
              <Play className="mr-2 h-5 w-5" />
              Learn More
            </Link>
          </div>

          
        </div>
      </div>
    </section>
  );
}