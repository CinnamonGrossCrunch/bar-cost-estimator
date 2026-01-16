'use client';

import { useState, useEffect } from 'react';

// Pricing constants for External Partner only
const PRICING = {
  fullBar: { perPerson: 10, minimum: 900 },
  beerWine: { perPerson: 8, minimum: 800 }
};

type ServiceType = 'fullBar' | 'beerWine';

// External Partner configuration
const EXTERNAL_PARTNER_CONFIG = {
  label: 'External Partner',
  description: 'Events Hosted by GitHub; Sponsored by Partner Org',
  backgroundImage: '/red-cocktail.png',
  colors: {
    active: 'bg-pink-500/50',
    inactive: 'bg-pink-200/60',
    hover: 'hover:bg-pink-300',
    glow: '0 0 20px rgba(236, 72, 153, 0.4), 0 0 40px rgba(236, 72, 153, 0.2)'
  }
};

const calculateCost = (
  serviceType: ServiceType,
  attendees: number,
  duration: number
): number => {
  const pricing = PRICING[serviceType];
  const calculatedCost = Math.round(pricing.perPerson * attendees * duration);
  
  // Apply minimum cost
  return Math.max(calculatedCost, pricing.minimum);
};

const formatDuration = (hours: number): string => {
  const h = Math.floor(hours);
  const m = Math.round((hours - h) * 60);
  
  if (m === 0) {
    return h === 1 ? '1 hour' : `${h} hours`;
  } else {
    return h === 0 ? `${m} min` : `${h} hour ${m} min`;
  }
};

export default function ExternalPartnerWidget() {
  const [serviceType, setServiceType] = useState<ServiceType>('beerWine');
  const [attendees, setAttendees] = useState<number>(0);
  const [duration, setDuration] = useState<number>(2.0);
  const [companyName, setCompanyName] = useState<string>('');
  const [estimatedCost, setEstimatedCost] = useState<number | null>(null);
  const [isCalculating, setIsCalculating] = useState<boolean>(false);
  const [footerBright, setFooterBright] = useState<boolean>(false);

  // Company name is always required for External Partner
  const isFormValid = attendees > 0 && companyName.trim() !== '';
  
  // Debug logging
  useEffect(() => {
    console.log('Form validation state:', {
      attendees,
      companyName: companyName.trim(),
      isFormValid,
      serviceType
    });
  }, [attendees, companyName, isFormValid, serviceType]);

  // Track calculation to analytics
  const trackCalculation = async (calculationData: {
    serviceType: ServiceType;
    attendees: number;
    duration: number;
    companyName: string;
    estimatedCost: number;
  }) => {
    try {
      console.log('Tracking calculation:', calculationData);
    } catch (error) {
      console.error('Analytics tracking failed:', error);
    }
  };

  // Handle estimate generation
  const handleGenerateEstimate = async () => {
    console.log('Generate estimate clicked', { isFormValid, attendees, companyName });
    if (!isFormValid) return;
    
    setIsCalculating(true);
    
    try {
      const cost = calculateCost(serviceType, attendees, duration);
      
      // Track the calculation
      await trackCalculation({
        serviceType,
        attendees,
        duration,
        companyName,
        estimatedCost: cost
      });
      
      setEstimatedCost(cost);
      
      // Trigger footer brightness animation after 1 second delay
      setTimeout(() => {
        setFooterBright(true);
      }, 1000);
    } catch (error) {
      console.error('Calculation failed:', error);
    } finally {
      setIsCalculating(false);
    }
  };

  // Reset estimate when key fields change
  useEffect(() => {
    if (estimatedCost !== null) {
      setEstimatedCost(null);
    }
    if (footerBright) {
      setFooterBright(false);
    }
  }, [serviceType, attendees, duration, companyName]);

  // Generate duration options from 1.0 to 6.0 hours in 0.5 increments
  const durationOptions = [];
  for (let i = 1.0; i <= 6.0; i += 0.5) {
    durationOptions.push(i);
  }

  const config = EXTERNAL_PARTNER_CONFIG;

  return (
    <div className={`bg-black rounded-b-12xl p-12 relative overflow-hidden w-full h-auto`}>
      <div 
        className="absolute inset-0 rounded-b-12xl transition-all duration-700"
        style={{
          backgroundImage: `url("${config.backgroundImage}")`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          opacity: 0.3
        }}
      ></div>
      <div 
        className="absolute inset-0 rounded-b-12xl opacity-80"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 800 800' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          mixBlendMode: 'soft-light',
          filter: 'blur(0.5px)'
        }}
      ></div>
      <div className="relative z-10 h-full overflow-y-auto">
      <h2 className="text-3xl font-light text-white mb-4 text-center">
       Budget Estimator
      </h2>

      {/* Service Type */}
      <div className="mb-2 backdrop-blur-md rounded-xl p-2 relative overflow-hidden border border-white/10" style={{
        background: 'linear-gradient(to bottom, rgba(255,255,255,0.08), rgba(255,255,255,0.02))'
      }}>
        <label className="block text-sm font-semibold text-white mb-1">
          Service Type 
        </label>
        <div className="flex gap-1 sm:gap-3">
          <button
            type="button"
            onClick={() => setServiceType('beerWine')}
            className={`flex-1 px-2 py-2 sm:px-4 sm:py-3 rounded-lg font-medium transition-all text-sm sm:text-base leading-tight ${
              serviceType === 'beerWine'
                ? `${config.colors.active} text-white border border-white/30`
                : 'backdrop-blur-md bg-white/20 text-gray-900 border-dashed border border-white/20 hover:bg-white/30'
            }`}
            style={serviceType === 'beerWine' ? {
              boxShadow: config.colors.glow
            } : {}}
          >
            Beer & Wine
          </button>
          <button
            type="button"
            onClick={() => setServiceType('fullBar')}
            className={`flex-1 px-2 py-2 sm:px-4 sm:py-3 rounded-lg font-medium transition-all text-sm sm:text-base leading-tight ${
              serviceType === 'fullBar'
                ? `${config.colors.active} text-white border border-white/30`
                : 'backdrop-blur-md bg-white/20 text-gray-900 border border-white/20 hover:bg-white/30'
            }`}
            style={serviceType === 'fullBar' ? {
              boxShadow: config.colors.glow
            } : {}}
          >
            Full Bar
          </button>
        </div>
        <div className="mt-3 text-xs text-gray-300 italic">
          {serviceType === 'fullBar' 
            ? 'Full Bar + Custom Cocktail Menu (3 cocktails + 1 Mocktail) + Beer & Wine'
            : '3 Varieties of Red Wine, 3 Varieties of White wine and Draft Beer Selection.'}
        </div>
      </div>

      {/* Expected Attendees */}
      <div className="mb-2 backdrop-blur-md rounded-xl p-4 relative overflow-hidden border border-white/10" style={{
        background: 'linear-gradient(to bottom, rgba(255,255,255,0.08), rgba(255,255,255,0.02))'
      }}>
        <label htmlFor="attendees" className="block text-sm font-semibold text-white mb-2">
          Expected Attendees
        </label>
        <input
          id="attendees"
          type="number"
          min="0"
          value={attendees === 0 ? '' : attendees}
          onChange={(e) => {
            const value = e.target.value;
            if (value === '') {
              setAttendees(0);
            } else {
              const numValue = parseInt(value);
              setAttendees(isNaN(numValue) ? 0 : Math.max(0, numValue));
            }
          }}
          placeholder="Enter number of attendees"
          className="w-full px-4 py-3 border border-gray-500 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white bg-gray-800/30 placeholder-gray-400"
          style={{
            MozAppearance: 'textfield'
          }}
          onWheel={(e) => e.currentTarget.blur()}
        />
      </div>

      {/* Duration */}
      <div className="mb-2 backdrop-blur-md rounded-xl p-4 relative overflow-hidden border border-white/10" style={{
        background: 'linear-gradient(to bottom, rgba(255,255,255,0.08), rgba(255,255,255,0.02))'
      }}>
        <label htmlFor="duration" className="block text-sm font-semibold text-white mb-2">
          Duration of Event
        </label>
        <select
          id="duration"
          value={duration}
          onChange={(e) => setDuration(parseFloat(e.target.value))}
          className="duration-dropdown w-full px-4 py-3 border border-gray-500 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-800/30 text-white"
        >
          {durationOptions.map((hours) => (
            <option key={hours} value={hours} className="duration-option text-white backdrop-blur-xl" style={{
              background: 'rgba(0, 0, 0, 0.7)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.1)'
            }}>
              {formatDuration(hours)}
            </option>
          ))}
        </select>
      </div>

      {/* Company Name - Always required for External Partner */}
      <div className="mb-2 backdrop-blur-md rounded-xl p-4 relative overflow-hidden border border-white/10" style={{
        background: 'linear-gradient(to bottom, rgba(255,255,255,0.08), rgba(255,255,255,0.02))'
      }}>
        <label htmlFor="companyName" className="block text-sm font-semibold text-gray-200 mb-2">
          Company Name *
        </label>
        <input
          id="companyName"
          type="text"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
          placeholder="Enter your company name"
          className="w-full px-4 py-3 border border-gray-500 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white bg-gray-800/30 placeholder-gray-400"
        />
      </div>

      {/* Estimated Cost */}
      <div className={`rounded-xl p-4 mb-3 text-center shadow-xl relative overflow-hidden border transition-all duration-500 ${
        estimatedCost !== null ? 'backdrop-blur-md border-white/20' : 'border-white/10'
      }`} style={{
        background: estimatedCost !== null 
          ? 'linear-gradient(to bottom, rgba(255,255,255,0.12), rgba(255,255,255,0.04))'
          : 'linear-gradient(to bottom, rgba(255,255,255,0.02), rgba(255, 255, 255, 0))'
      }}>
        <div className={`text-sm font-semibold text-gray-300 mb-0 transition-all duration-700 ease-in-out transform ${
          estimatedCost !== null 
            ? 'opacity-100 translate-y-0 scale-100' 
            : 'opacity-0 -translate-y-2 scale-95'
        }`}>
          ESTIMATED COST
        </div>
        
        <div className="relative min-h-[80px] flex items-center justify-center">
          {/* Estimated Cost Display */}
          <div 
            className={`absolute inset-0 flex items-center justify-center transition-all duration-700 ease-in-out transform ${
              estimatedCost !== null 
                ? 'opacity-100 scale-100 translate-y-0' 
                : 'opacity-0 scale-95 translate-y-4'
            }`}
          >
            <div className="text-5xl font-bold text-white">
              ${estimatedCost?.toLocaleString() || '0'}
            </div>
          </div>

          {/* Generate Button */}
          <div 
            className={`absolute inset-0 flex flex-col items-center justify-center transition-all duration-700 ease-in-out transform ${
              estimatedCost === null 
                ? 'opacity-100 scale-100 -translate-y-2' 
                : 'opacity-0 scale-95 -translate-y-4'
            }`}
          >
            <button
              onClick={(e) => {
                console.log('Button clicked!', e);
                console.log('Current form state:', { isFormValid, attendees, isCalculating });
                if (attendees <= 0) {
                  console.log('Setting attendees to 50 for testing');
                  setAttendees(50);
                  return;
                }
                handleGenerateEstimate();
              }}
              disabled={false}
              className={`px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 ${
                isFormValid && !isCalculating
                  ? `${config.colors.active} text-white border border-white/30 hover:brightness-150`
                  : 'bg-gray-500/50 text-gray-300 cursor-not-allowed border border-gray-500/30'
              }`}
              style={isFormValid && !isCalculating ? {
                boxShadow: config.colors.glow
              } : {}}
            >
              {isCalculating ? (
                <>
                  <span className="inline-block animate-spin mr-2">⏳</span>
                  Calculating...
                </>
              ) : (
                'Generate Estimate'
              )}
            </button>
            
            {!isFormValid && (
              <div className="mt-3 text-sm text-gray-400 animate-pulse">
                {attendees <= 0 
                  ? 'Please enter the number of attendees'
                  : !companyName.trim() 
                  ? 'Please enter your company name'
                  : 'Please fill in all required fields'
                }
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Disclaimer */}
      <div 
        className={`text-sm text-center leading-relaxed backdrop-blur-md rounded-t-xl rounded-b-8xl p-4 relative overflow-hidden border transition-all duration-500 ease-in-out ${
          footerBright ? 'border-white/40' : 'border-white/10'
        }`}
        style={{
          background: 'linear-gradient(to bottom, rgba(255,255,255,0.08), rgba(255,255,255,0.02))',
          boxShadow: footerBright ? '0 0 20px rgba(255, 255, 255, 0.3), 0 0 40px rgba(255, 255, 255, 0.1)' : 'none'
        }}
      >
        <p className={`transition-all duration-500 ease-in-out ${
          footerBright ? 'text-white' : 'text-gray-300'
        }`}>
          This tool is intended for generating &ldquo;ball park&rdquo; estimates to aid in planning events. For official quotes, special requests or scenarios outside these parameters,
          please email{' '}
          <a
            href="mailto:service@thegrossdomestic.com"
            className={`underline transition-all duration-500 ease-in-out ${
              footerBright ? 'text-blue-200 hover:text-blue-100' : 'text-blue-400 hover:text-blue-300'
            }`}
          >
            service@thegrossdomestic.com
          </a>
        </p>
      </div>
      </div>
    </div>
  );
}
