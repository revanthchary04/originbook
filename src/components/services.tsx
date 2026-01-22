import React from 'react';

const ServicesSection: React.FC = () => {
  return (
    <section className="mt-10 mb-0 pt-0 pb-0 relative">
      <div className="sm:px-6 lg:px-8 lg:pb-0 max-w-7xl mr-auto ml-auto pt-16 pr-4 pb-16 pl-4">
        <h2 
          className="text-3xl md:text-4xl font-semibold text-white text-center mb-0" 
          style={{ 
            fontFamily: 'Inter, sans-serif',
            letterSpacing: '-0.02em',
            maskImage: 'linear-gradient(90deg, transparent, black 0%, black 10%, transparent)', 
            WebkitMaskImage: 'linear-gradient(90deg, transparent, black 0%, black 10%, transparent)' 
          }}
        >
          Complete Digital Publishing Suite
        </h2>

        <section className="mt-10 mb-20 pt-0 pb-0 relative">
          <div className="sm:px-6 lg:px-8 lg:pt-8 max-w-full pt-16 pr-4 pb-16 pl-4">
            <div 
              className="rounded-2xl mt-10 backdrop-blur" 
              style={{ 
                maskImage: 'linear-gradient(90deg, transparent, black 20%, black 80%, transparent)', 
                WebkitMaskImage: 'linear-gradient(90deg, transparent, black 20%, black 80%, transparent)' 
              }}
            >
              <div 
                className="grid grid-cols-1 md:grid-cols-3 border-white/10 border-b" 
                style={{ 
                  maskImage: 'linear-gradient(0deg, transparent, black 0%, black 100%, transparent)', 
                  WebkitMaskImage: 'linear-gradient(0deg, transparent, black 0%, black 100%, transparent)' 
                }}
              >
                <div 
                  className="hover:bg-white/10 transition-all duration-300 cursor-pointer overflow-hidden group text-center pt-8 pr-8 pb-8 pl-8 relative" 
                  style={{ 
                    maskImage: 'linear-gradient(0deg, transparent, black 0%, black 10%, transparent)', 
                    WebkitMaskImage: 'linear-gradient(0deg, transparent, black 0%, black 10%, transparent)' 
                  }}
                >
                  <div className="inline-flex group-hover:bg-white/10 transition-colors duration-300 text-slate-200 bg-white/5 w-10 h-10 ring-white/10 ring-1 rounded-lg mr-auto mb-4 ml-auto items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                      <path d="M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z"></path>
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-white tracking-tight">PDF to Flipbook</h3>
                  <p className="text-sm text-zinc-400 mt-1">convert in seconds</p>
                </div>

                <div 
                  className="md:border-l md:border-white/10 hover:bg-white/10 transition-all duration-300 cursor-pointer overflow-hidden group text-center pt-8 pr-8 pb-8 pl-8 relative" 
                  style={{ 
                    maskImage: 'linear-gradient(0deg, transparent, black 0%, black 10%, transparent)', 
                    WebkitMaskImage: 'linear-gradient(0deg, transparent, black 0%, black 10%, transparent)' 
                  }}
                >
                  <div className="inline-flex group-hover:bg-white/10 transition-colors duration-300 text-slate-200 bg-white/5 w-10 h-10 ring-white/10 ring-1 rounded-lg mr-auto mb-4 ml-auto items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                      <rect width="18" height="18" x="3" y="3" rx="2" ry="2"></rect>
                      <circle cx="9" cy="9" r="2"></circle>
                      <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"></path>
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-white tracking-tight">Interactive Elements</h3>
                  <p className="text-sm text-zinc-400 mt-1">engage your readers</p>
                </div>

                <div 
                  className="md:border-l md:border-white/10 hover:bg-white/10 transition-all duration-300 cursor-pointer overflow-hidden group text-center pt-8 pr-8 pb-8 pl-8 relative" 
                  style={{ 
                    maskImage: 'linear-gradient(0deg, transparent, black 0%, black 10%, transparent)', 
                    WebkitMaskImage: 'linear-gradient(0deg, transparent, black 0%, black 10%, transparent)' 
                  }}
                >
                  <div className="inline-flex group-hover:bg-white/10 transition-colors duration-300 text-slate-200 bg-white/5 w-10 h-10 ring-white/10 ring-1 rounded-lg mr-auto mb-4 ml-auto items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                      <polyline points="16 18 22 12 16 6"></polyline>
                      <polyline points="8 6 2 12 8 18"></polyline>
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-white tracking-tight">Embed Anywhere</h3>
                  <p className="text-sm text-zinc-400 mt-1">share on any platform</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2">
                <div 
                  className="md:border-r md:border-white/10 hover:bg-white/10 transition-all duration-300 cursor-pointer overflow-hidden group text-center pt-8 pr-8 pb-8 pl-8 relative" 
                  style={{ 
                    maskImage: 'linear-gradient(180deg, transparent, black 0%, black 20%, transparent)', 
                    WebkitMaskImage: 'linear-gradient(180deg, transparent, black 0%, black 20%, transparent)' 
                  }}
                >
                  <div className="inline-flex group-hover:bg-white/10 transition-colors duration-300 text-slate-200 bg-white/5 w-10 h-10 ring-white/10 ring-1 rounded-lg mr-auto mb-4 ml-auto items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                      <circle cx="12" cy="12" r="10"></circle>
                      <path d="M12 6v6l4 2"></path>
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-white tracking-tight">Real-time Analytics</h3>
                  <p className="text-sm text-zinc-400 mt-1">track engagement</p>
                </div>

                <div 
                  className="hover:bg-white/10 transition-all duration-300 cursor-pointer overflow-hidden group text-center pt-8 pr-8 pb-8 pl-8 relative" 
                  style={{ 
                    maskImage: 'linear-gradient(180deg, transparent, black 0%, black 20%, transparent)', 
                    WebkitMaskImage: 'linear-gradient(180deg, transparent, black 0%, black 20%, transparent)' 
                  }}
                >
                  <div className="inline-flex group-hover:bg-white/10 transition-colors duration-300 text-slate-200 bg-white/5 w-10 h-10 ring-white/10 ring-1 rounded-lg mr-auto mb-4 ml-auto items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                      <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"></path>
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-white tracking-tight">Safe &amp; Secure</h3>
                  <p className="text-sm text-zinc-400 mt-1">privacy protected</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </section>
  );
};

export default ServicesSection;
