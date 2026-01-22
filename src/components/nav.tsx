'use client';

import { useState } from 'react';

export default function Navigation() {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [previousDropdown, setPreviousDropdown] = useState<string | null>(null);

  const handleMouseEnter = (dropdown: string) => {
    setPreviousDropdown(activeDropdown);
    setActiveDropdown(dropdown);
  };

  const handleMouseLeave = () => {
    setPreviousDropdown(activeDropdown);
    setActiveDropdown(null);
  };

  // Get animation direction based on current and previous dropdown
  const getAnimationClass = (currentDropdown: string) => {
    if (!previousDropdown) return 'animate-fadeIn';
    
    // Features is on the left, Why is on the right
    if (currentDropdown === 'features') {
      return previousDropdown === 'why' ? 'animate-slideInLeft' : 'animate-fadeIn';
    }
    if (currentDropdown === 'why') {
      return previousDropdown === 'features' ? 'animate-slideInRight' : 'animate-fadeIn';
    }
    return 'animate-fadeIn';
  };

  // Determine header height based on which dropdown is open
  const getHeaderHeight = () => {
    if (activeDropdown === 'features') return '308px';
    if (activeDropdown === 'why') return '200px';
    return '52px';
  };

  return (
    <header 
      className="dark fixed top-8 left-1/2 -translate-x-1/2 z-[99] w-[460px] bg-black/80 backdrop-blur-lg rounded-[24px] overflow-hidden shadow-lg hidden md:block transition-all duration-300" 
      style={{ height: getHeaderHeight() }}
    >
      <div>
        <div className="flex items-center gap-2 h-13 pl-4 pr-3">
          {/* Logo */}
          <a href="/" className="active" aria-current="page">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0 text-gray-300">
              <path d="M16 3C27 3 31 10 31 16C31 22 27 29 16 29C5 29 1 22 1 16C1 10 5 3 16 3ZM15 9C11.134 9 8 12.134 8 16C8 19.866 11.134 23 15 23H17C20.866 23 24 19.866 24 16C24 12.134 20.866 9 17 9H15Z" fill="currentColor" />
            </svg>
          </a>

          {/* Navigation */}
          <nav className="flex items-center text-sm flex-1">
            {/* Features Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => handleMouseEnter('features')} 
              onMouseLeave={handleMouseLeave}
            >
              <button 
                type="button" 
                className="flex items-center gap-0.5 px-2 py-1 text-sm font-medium transition-colors text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg"
              >
                Features
                <span style={{ transform: activeDropdown === 'features' ? 'rotate(180deg)' : 'none' }} className="transition-transform duration-200">
                  <svg width="14" height="14" fill="none" viewBox="0 0 16 16">
                    <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </button>
            </div>

            {/* Why Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => handleMouseEnter('why')} 
              onMouseLeave={handleMouseLeave}
            >
              <button 
                type="button" 
                className="flex items-center gap-0.5 px-2 py-1 text-sm font-medium transition-colors text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg"
              >
                Why
                <span style={{ transform: activeDropdown === 'why' ? 'rotate(180deg)' : 'none' }} className="transition-transform duration-200">
                  <svg width="14" height="14" fill="none" viewBox="0 0 16 16">
                    <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </button>
            </div>

            {/* Blog Link */}
            <a className="px-2 py-1 text-sm font-medium transition-colors text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg" href="/blog">
              Blog
            </a>

            {/* Docs Link */}
            <a className="px-2 py-1 text-sm font-medium transition-colors text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg" href="/docs">
              Docs
            </a>
          </nav>

          {/* Login */}
          <a className="text-sm font-medium transition-colors px-2 py-1 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg" href="/login">
            Login
          </a>

          {/* Register Button */}
          <a href="/register">
            <button className="select-none flex items-center relative cursor-pointer justify-center whitespace-nowrap font-medium transition-all focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-4 focus-visible:ring-offset-black focus-visible:outline-none rounded-full bg-green-600 text-white hover:bg-green-500 disabled:bg-green-300 disabled:text-white h-[30px] px-4 text-sm gap-2 active:scale-[0.99]">
              Register
            </button>
          </a>
        </div>

        {/* Dropdown Content - Features */}
        {activeDropdown === 'features' && (
          <div 
            key="features-dropdown"
            className={`transition-all duration-300 ${getAnimationClass('features')}`}
          >
            <div className="grid grid-cols-2 gap-2 p-2">
              <a href="/analytics" className="flex flex-col items-center gap-2 px-3 py-4 rounded-xl bg-purple-500/10 hover:bg-purple-500/20 transition-colors">
                <span className="w-10 h-9 rounded-full bg-purple-600 flex items-center justify-center">
                  <svg width="20" height="20" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-white" aria-label="Dashboard" role="img">
                    <path d="M15 14.0001H1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M15 10C10.5 10 12.5313 2 8 2C3.5 2 5.5 10 1 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                <span className="flex flex-col items-center">
                  <h5 className="font-medium text-gray-200 text-center">Analytics</h5>
                  <span className="text-xs font-medium text-gray-500 text-center line-clamp-2">Track pageviews and visitors</span>
                </span>
              </a>

              <a href="/realtime" className="flex flex-col items-center gap-2 px-3 py-4 rounded-xl bg-sky-500/10 hover:bg-sky-500/20 transition-colors">
                <span className="w-10 h-9 rounded-full bg-sky-600 flex items-center justify-center">
                  <svg width="20" height="20" fill="none" viewBox="0 0 16 16" className="text-white">
                    <path d="M8 15C11.866 15 15 11.866 15 8C15 4.13401 11.866 1 8 1M8 15C4.13401 15 1 11.866 1 8C1 4.13401 4.13401 1 8 1M8 15C6.22373 15 4.78378 11.866 4.78378 8C4.78378 4.13401 6.22373 1 8 1M8 15C9.77626 15 11.2162 11.866 11.2162 8C11.2162 4.13401 9.77626 1 8 1M14.8108 8H1.18919" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
                  </svg>
                </span>
                <span className="flex flex-col items-center">
                  <h5 className="font-medium text-gray-200 text-center">Realtime</h5>
                  <span className="text-xs font-medium text-gray-500 text-center line-clamp-2">Live visitor map and feed</span>
                </span>
              </a>

              <a href="/performance" className="flex flex-col items-center gap-2 px-3 py-4 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 transition-colors">
                <span className="w-10 h-9 rounded-full bg-amber-600 flex items-center justify-center">
                  <svg width="20" height="20" fill="none" viewBox="0 0 16 16" className="text-white">
                    <path d="M10.2703 6.48649L8.19668 10.4609M14.0541 10.8378H1.94595M12.9497 3.05026C10.2161 0.316581 5.78393 0.316581 3.05026 3.05026C0.316581 5.78391 0.316581 10.2161 3.05026 12.9497C5.78391 15.6834 10.2161 15.6834 12.9497 12.9497C15.6834 10.2161 15.6834 5.78393 12.9497 3.05026Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                <span className="flex flex-col items-center">
                  <h5 className="font-medium text-gray-200 text-center">Performance</h5>
                  <span className="text-xs font-medium text-gray-500 text-center line-clamp-2">Monitor your web vitals</span>
                </span>
              </a>

              <a href="/profiles" className="flex flex-col items-center gap-2 px-3 py-4 rounded-xl bg-green-500/10 hover:bg-green-500/20 transition-colors">
                <span className="w-10 h-9 rounded-full bg-green-600 flex items-center justify-center">
                  <svg width="20" height="20" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-white">
                    <path d="M8 15c3.866 0 7-3.134 7-7S11.866 1 8 1 1 4.134 1 8s3.134 7 7 7Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M5.29 9.4c.31 1.21 1.41 2.1 2.71 2.1s2.4-.89 2.71-2.1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <ellipse cx="5.55" cy="6.25" rx="1.05" ry="1.05" fill="currentColor" />
                    <ellipse cx="10.45" cy="6.25" rx="1.05" ry="1.05" fill="currentColor" />
                  </svg>
                </span>
                <span className="flex flex-col items-center">
                  <h5 className="font-medium text-gray-200 text-center">Profiles</h5>
                  <span className="text-xs font-medium text-gray-500 text-center line-clamp-2">Identify returning visitors</span>
                </span>
              </a>
            </div>
          </div>
        )}

        {/* Dropdown Content - Why */}
        {activeDropdown === 'why' && (
          <div 
            key="why-dropdown"
            className={`transition-all duration-300 ${getAnimationClass('why')}`}
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-1 md:gap-2 p-2">
              <a href="/vs/google-analytics" className="flex flex-row md:flex-col items-center gap-2 px-3 py-2 md:py-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors">
                <span className="md:w-10 md:h-9 md:rounded-full flex items-center justify-center bg-white/5">
                  <svg width="20" height="20" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M11 1.90909V13.9091C11 15.2528 11.9261 16 12.9091 16C13.8182 16 14.8182 15.3636 14.8182 13.9091V2C14.8182 0.769885 13.9091 0 12.9091 0C11.9091 0 11 0.84943 11 1.90909Z" fill="#F8AB00" />
                    <path d="M6 7.99997V13.9091C6 15.2528 6.92614 16 7.90909 16C8.81818 16 9.81818 15.3636 9.81818 13.9091V8.09088C9.81818 6.86076 8.90909 6.09088 7.90909 6.09088C6.90909 6.09088 6 6.94031 6 7.99997Z" fill="#E37300" />
                    <path d="M4.81818 14.0909C4.81818 15.1449 3.96307 16 2.90909 16C1.85511 16 1 15.1449 1 14.0909C1 13.0369 1.85511 12.1818 2.90909 12.1818C3.96307 12.1818 4.81818 13.0369 4.81818 14.0909Z" fill="#E37300" />
                  </svg>
                </span>
                <span className="flex flex-1 justify-between items-center md:flex-col">
                  <h5 className="font-medium text-center line-clamp-1">
                    <span className="text-gray-400">vs</span> <span className="text-gray-200">GA</span>
                  </h5>
                  <span className="text-xs font-medium text-gray-500 text-center line-clamp-2">How we compare to Google Analytics</span>
                </span>
              </a>

              <a href="/vs/plausible" className="flex flex-row md:flex-col items-center gap-2 px-3 py-2 md:py-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors">
                <span className="md:w-10 md:h-9 md:rounded-full flex items-center justify-center bg-white/5">
                  <svg width="20" height="20" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M13.9327 6.02742C13.6417 8.81563 11.2039 10.888 8.40061 10.888H7.32119V13.44C7.32119 14.8539 6.17504 16 4.76119 16H2.76318C2.26834 16 1.86719 15.5989 1.86719 15.104V9.85003L3.21067 7.96506C3.45382 7.62391 3.9008 7.49661 4.2872 7.65845L5.05139 7.97853C5.43659 8.13986 5.88216 8.01305 6.12467 7.67306L7.91593 5.16181C8.15782 4.82269 8.60243 4.69646 8.98644 4.85789L10.4584 5.47667C10.8432 5.63843 11.2887 5.51185 11.531 5.17194L13.2535 2.75525C13.7935 3.70453 14.0574 4.83225 13.9327 6.02742Z" fill="url(#paint0_linear_5470_75)" />
                    <path d="M2.74508 7.69937C2.96462 7.39133 3.28399 7.15444 3.65544 7.08298C3.94509 7.02727 4.23062 7.05651 4.49471 7.16712L5.25871 7.48711C5.30273 7.50555 5.34907 7.51489 5.39644 7.51489C5.51286 7.51489 5.62279 7.45824 5.69048 7.36333L7.44893 4.89805C7.66844 4.59031 7.98771 4.35378 8.35893 4.2825C8.6475 4.22709 8.93129 4.25613 9.19313 4.36619L10.6651 4.98498C10.7095 5.00366 10.7562 5.01312 10.8039 5.01312C10.92 5.01312 11.0294 4.95675 11.0967 4.86235L12.9419 2.27362C11.9544 0.897184 10.3419 0 8.51919 0H2.76318C2.26834 0 1.86719 0.401151 1.86719 0.895996V8.9311L2.74508 7.69937Z" fill="url(#paint1_linear_5470_75)" />
                    <defs>
                      <linearGradient id="paint0_linear_5470_75" x1="5.82488" y1="6.01167" x2="9.19336" y2="11.9065" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#909CF7" />
                        <stop offset="1" stopColor="#4B38D8" />
                      </linearGradient>
                      <linearGradient id="paint1_linear_5470_75" x1="3.9962" y1="-0.362211" x2="7.46745" y2="5.71248" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#909CF7" />
                        <stop offset="1" stopColor="#4B38D8" />
                      </linearGradient>
                    </defs>
                  </svg>
                </span>
                <span className="flex flex-1 justify-between items-center md:flex-col">
                  <h5 className="font-medium text-center line-clamp-1">
                    <span className="text-gray-400">vs</span> <span className="text-gray-200">Plausible</span>
                  </h5>
                  <span className="text-xs font-medium text-gray-500 text-center line-clamp-2">How we compare to Plausible</span>
                </span>
              </a>

              <a href="/vs/fathom" className="flex flex-row md:flex-col items-center gap-2 px-3 py-2 md:py-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors">
                <span className="md:w-10 md:h-9 md:rounded-full flex items-center justify-center bg-white/5">
                  <svg width="20" height="20" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clipPath="url(#clip0_5470_117)">
                      <path d="M0 0H16V16H0V0Z" fill="#846BFF" />
                      <path d="M12.7112 4.72019H12.3591C12.2991 4.72027 12.2406 4.739 12.1917 4.77378C12.1427 4.80857 12.1058 4.8577 12.0861 4.91437L9.89013 11.2139C9.87492 11.2575 9.87036 11.3041 9.87684 11.3499C9.88332 11.3956 9.90065 11.4391 9.92738 11.4767C9.95411 11.5144 9.98946 11.5451 10.0305 11.5663C10.0715 11.5875 10.117 11.5986 10.1632 11.5986H10.5153C10.5753 11.5985 10.6338 11.5798 10.6827 11.545C10.7316 11.5103 10.7685 11.4612 10.7883 11.4045L12.9839 5.10494C12.9991 5.06133 13.0037 5.01471 12.9972 4.96898C12.9907 4.92325 12.9734 4.87973 12.9466 4.84206C12.9199 4.8044 12.8846 4.77367 12.8435 4.75246C12.8025 4.73125 12.757 4.72016 12.7108 4.72013M4.77419 6.72356V6.43638C4.77419 6.35956 4.74367 6.28589 4.68936 6.23158C4.63504 6.17726 4.56138 6.14675 4.48456 6.14675H3.93112V5.88075C3.93019 5.56969 4.0005 5.38338 4.0635 5.31563L4.0665 5.31187C4.10964 5.26937 4.16384 5.23981 4.22294 5.22656C4.4274 5.19368 4.63422 5.17767 4.84131 5.17869H4.94769C5.0245 5.17869 5.09817 5.14817 5.15248 5.09386C5.2068 5.03954 5.23731 4.96588 5.23731 4.88906V4.62969C5.23745 4.5625 5.21415 4.49736 5.17144 4.44549C5.12873 4.39362 5.06928 4.35826 5.00331 4.3455C4.96422 4.33797 4.92498 4.3312 4.88562 4.32519C4.83094 4.31688 4.54419 4.31269 4.48787 4.3125H4.48394C4.01769 4.3125 3.62075 4.42137 3.355 4.70662L3.3545 4.70713C3.09475 4.99325 3.00125 5.39788 3 5.88963V11.3094C2.99999 11.3474 3.00748 11.3851 3.02203 11.4202C3.03658 11.4553 3.05792 11.4873 3.08481 11.5142C3.11171 11.5411 3.14364 11.5624 3.17879 11.5769C3.21393 11.5915 3.25159 11.599 3.28962 11.5989H3.64169C3.71848 11.5989 3.79212 11.5684 3.84642 11.5141C3.90072 11.4598 3.93123 11.3862 3.93125 11.3094V7.01294H4.48494C4.56174 7.01292 4.63539 6.9824 4.68969 6.92809C4.74399 6.87377 4.7745 6.80011 4.7745 6.72331M8.44394 6.32137C8.09991 6.13302 7.71154 6.04073 7.31956 6.05419C6.93318 6.04446 6.5496 6.12237 6.19763 6.28206C5.88204 6.43093 5.61651 6.66828 5.43331 6.96525L5.43206 6.96725C5.40755 7.00686 5.3946 7.05254 5.39469 7.09912C5.39494 7.15376 5.41212 7.20698 5.44388 7.25144C5.47563 7.2959 5.5204 7.32942 5.572 7.34737L5.85606 7.4485C5.93504 7.47632 6.02069 7.47902 6.10126 7.45622C6.18183 7.43343 6.25337 7.38626 6.30606 7.32119C6.33294 7.28837 6.36162 7.257 6.39187 7.22731C6.57775 7.04694 6.85363 6.94063 7.28281 6.93894C7.4675 6.93456 7.65156 6.96319 7.82619 7.02356C7.95126 7.06863 8.06194 7.14644 8.14669 7.24888C8.30756 7.44625 8.40875 7.75125 8.41813 8.18838C8.00438 8.19481 7.63762 8.21212 7.32069 8.24175C6.92219 8.27725 6.52919 8.35906 6.14962 8.4855L6.14838 8.486L6.145 8.48687H6.14437C5.7972 8.58162 5.48492 8.77494 5.24531 9.04344C5.0221 9.32423 4.90627 9.67539 4.91862 10.0339V10.0433C4.91203 10.3565 4.99762 10.6648 5.16475 10.9298C5.33218 11.184 5.57152 11.3826 5.85225 11.5002C6.16509 11.6278 6.50086 11.6896 6.83862 11.6818C7.09837 11.6786 7.35561 11.6305 7.59894 11.5396C7.87259 11.4389 8.12576 11.2895 8.34619 11.0986C8.38936 11.0615 8.43078 11.0223 8.47031 10.9813C8.49614 11.1502 8.55342 11.3127 8.63919 11.4604C8.66494 11.5027 8.70119 11.5376 8.74442 11.5618C8.78764 11.5859 8.83637 11.5984 8.88587 11.5982H8.88644L9.05587 11.5962C9.13206 11.5953 9.20481 11.5643 9.25836 11.5101C9.31191 11.4559 9.34196 11.3828 9.342 11.3066V8.20575C9.35045 7.82552 9.27886 7.44777 9.13188 7.097C8.99095 6.77219 8.75043 6.50057 8.44506 6.32137M8.20969 9.992C8.07079 10.2344 7.87453 10.4389 7.63812 10.5878C7.4077 10.7343 7.13954 10.8104 6.8665 10.8069C6.50244 10.8062 6.25775 10.7226 6.09275 10.5863C6.01502 10.5233 5.95304 10.443 5.91175 10.3519C5.86894 10.247 5.84789 10.1346 5.84987 10.0214C5.84787 9.88831 5.88112 9.75713 5.9465 9.64119C6.03374 9.51276 6.15752 9.41348 6.30181 9.35619C6.58862 9.23575 6.89119 9.157 7.20031 9.12231C7.60505 9.069 8.01266 9.04037 8.42087 9.03656V9.21562C8.42182 9.48878 8.34887 9.75711 8.20975 9.99219" fill="white" />
                    </g>
                    <defs>
                      <clipPath id="clip0_5470_117">
                        <rect width="16" height="16" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                </span>
                <span className="flex flex-1 justify-between items-center md:flex-col">
                  <h5 className="font-medium text-center line-clamp-1">
                    <span className="text-gray-400">vs</span> <span className="text-gray-200">Fathom</span>
                  </h5>
                  <span className="text-xs font-medium text-gray-500 text-center line-clamp-2">How we compare to Fathom</span>
                </span>
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
