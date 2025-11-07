'use client';

import { useState, useEffect } from 'react';

// Pricing constants and logic
const PRICING = {
  fullBar: {
    githubInternal: { baseRate: 75, perPerson: 8, minimum: 800 },
    externalSponsor: { baseRate: 95, perPerson: 10, minimum: 900 },
    nonProfit: { baseRate: 55, perPerson: 6, minimum: 800 }
  },
  beerWine: {
    githubInternal: { baseRate: 45, perPerson: 5, minimum: 600 },
    externalSponsor: { baseRate: 60, perPerson: 6.5, minimum: 800 },
    nonProfit: { baseRate: 35, perPerson: 4, minimum: 600 }
  }
};

type OrganizationType = 'githubInternal' | 'externalSponsor' | 'nonProfit';
type ServiceType = 'fullBar' | 'beerWine';

const calculateCost = (
  orgType: OrganizationType,
  serviceType: ServiceType,
  attendees: number,
  duration: number
): number => {
  const pricing = PRICING[serviceType][orgType];
  const baseCost = pricing.baseRate * duration;
  const attendeeCost = pricing.perPerson * attendees * duration;
  const calculatedCost = Math.round(baseCost + attendeeCost);
  
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

export default function CostCalculatorWidget() {
  const [orgType, setOrgType] = useState<OrganizationType>('githubInternal');
  const [serviceType, setServiceType] = useState<ServiceType>('beerWine');
  const [attendees, setAttendees] = useState<number>(50);
  const [duration, setDuration] = useState<number>(2.0);
  const [estimatedCost, setEstimatedCost] = useState<number>(0);

  useEffect(() => {
    const cost = calculateCost(orgType, serviceType, attendees, duration);
    setEstimatedCost(cost);
  }, [orgType, serviceType, attendees, duration]);

  // Generate duration options from 1.0 to 6.0 hours in 0.5 increments
  const durationOptions = [];
  for (let i = 1.0; i <= 6.0; i += 0.5) {
    durationOptions.push(i);
  }

  // Dynamic background gradient based on organization type
  const getBackgroundGradient = () => {
    switch (orgType) {
      case 'githubInternal':
        return 'from-violet-900/30 to-gray-900/80';
      case 'externalSponsor':
        return 'from-blue-700/30 to-gray-900/80';
      case 'nonProfit':
        return 'from-teal-300/40 to-gray-900/80';
      default:
        return 'from-gray-800/50 to-gray-900/80';
    }
  };

  return (
    <div className={`bg-black rounded-3xl shadow-2xl p-8 max-w-2xl mx-auto relative overflow-hidden`}>
      <div className={`absolute inset-0 bg-gradient-to-b ${getBackgroundGradient()} transition-all duration-700 rounded-3xl`} style={{ filter: 'blur(0.5px)' }}></div>
      <div 
        className="absolute inset-0 rounded-3xl opacity-80"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 800 800' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          mixBlendMode: 'soft-light',
          filter: 'blur(0.5px)'
        }}
      ></div>
      <div className="relative z-10">
      <h2 className="text-2xl font-bold text-white mb-6 text-center">
       GDP Bar Service Cost Estimator
      </h2>

      {/* Organization Type */}
      <div className="mb-3 backdrop-blur-md rounded-xl p-4 relative overflow-hidden border border-white/10" style={{
        background: 'linear-gradient(to bottom, rgba(255,255,255,0.08), rgba(255,255,255,0.02))'
      }}>
        <label className="block text-sm font-semibold text-gray-200 mb-2">
          Organization Event Type:
        </label>
        <div className="flex gap-1 sm:gap-2">
          <button
            type="button"
            onClick={() => setOrgType('githubInternal')}
            className={`flex-1 px-1.5 py-2 sm:px-4 sm:py-3 rounded-lg font-medium transition-all text-xs sm:text-base leading-tight ${
              orgType === 'githubInternal'
                ? 'bg-violet-900/50 text-white shadow-md ring-2 sm:ring-4 ring-violet-300'
                : 'bg-violet-200 text-gray-700 hover:bg-violet-300'
            }`}
          >
            GitHub Internal
          </button>
          <button
            type="button"
            onClick={() => setOrgType('externalSponsor')}
            className={`flex-1 px-1.5 py-2 sm:px-4 sm:py-3 rounded-lg font-medium transition-all text-xs sm:text-base leading-tight ${
              orgType === 'externalSponsor'
                ? 'bg-blue-500/50 text-white shadow-md ring-2 sm:ring-4 ring-blue-300'
                : 'bg-blue-200 text-gray-700 hover:bg-blue-300'
            }`}
          >
            External Sponsor
          </button>
          <button
            type="button"
            onClick={() => setOrgType('nonProfit')}
            className={`flex-1 px-1.5 py-2 sm:px-4 sm:py-3 rounded-lg font-medium transition-all text-xs sm:text-base leading-tight ${
              orgType === 'nonProfit'
                ? 'bg-teal-500/50 text-white shadow-md ring-2 sm:ring-4 ring-teal-300'
                : 'bg-teal-100 text-gray-700 hover:bg-teal-200'
            }`}
          >
            Non-Profit
          </button>
        </div>
        <div className="mt-3 text-sm text-gray-300 italic text-center">
          {orgType === 'githubInternal' && 'Events Sponsored by GitHub'}
          {orgType === 'externalSponsor' && 'Events Hosted by GitHub but Sponsored by Partner Organization'}
          {orgType === 'nonProfit' && 'Events Hosted By GitHub and Sponsored by a Non-Profit Organization'}
        </div>
      </div>

      {/* Service Type */}
      <div className="mb-3 backdrop-blur-md rounded-xl p-4 relative overflow-hidden border border-white/10" style={{
        background: 'linear-gradient(to bottom, rgba(255,255,255,0.08), rgba(255,255,255,0.02))'
      }}>
        <label className="block text-sm font-semibold text-gray-200 mb-3">
          Service Type *
        </label>
        <div className="flex gap-1 sm:gap-3">
          <button
            type="button"
            onClick={() => setServiceType('beerWine')}
            className={`flex-1 px-2 py-2 sm:px-4 sm:py-3 rounded-lg font-medium transition-all text-sm sm:text-base leading-tight ${
              serviceType === 'beerWine'
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Beer & Wine
          </button>
          <button
            type="button"
            onClick={() => setServiceType('fullBar')}
            className={`flex-1 px-2 py-2 sm:px-4 sm:py-3 rounded-lg font-medium transition-all text-sm sm:text-base leading-tight ${
              serviceType === 'fullBar'
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Full Bar
          </button>
        </div>
        <div className="mt-3 text-xs text-gray-300 italic">
          {serviceType === 'fullBar' 
            ? 'Full Bar with Custom Cocktail Menu (3 cocktails + 1 Mocktail)'
            : '3 Varieties of Red Wine, 3 Varieties of White wine and Draft Beer Selection.'}
        </div>
      </div>

      {/* Expected Attendees */}
      <div className="mb-3 backdrop-blur-md rounded-xl p-4 relative overflow-hidden border border-white/10" style={{
        background: 'linear-gradient(to bottom, rgba(255,255,255,0.08), rgba(255,255,255,0.02))'
      }}>
        <label htmlFor="attendees" className="block text-sm font-semibold text-gray-200 mb-2">
          Expected Attendees *
        </label>
        <input
          id="attendees"
          type="number"
          min="1"
          value={attendees}
          onChange={(e) => setAttendees(Math.max(1, parseInt(e.target.value) || 1))}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
        />
      </div>

      {/* Duration */}
      <div className="mb-6 backdrop-blur-md rounded-xl p-4 relative overflow-hidden border border-white/10" style={{
        background: 'linear-gradient(to bottom, rgba(255,255,255,0.08), rgba(255,255,255,0.02))'
      }}>
        <label htmlFor="duration" className="block text-sm font-semibold text-gray-200 mb-2">
          Duration of Event
        </label>
        <select
          id="duration"
          value={duration}
          onChange={(e) => setDuration(parseFloat(e.target.value))}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-900"
        >
          {durationOptions.map((hours) => (
            <option key={hours} value={hours}>
              {formatDuration(hours)}
            </option>
          ))}
        </select>
      </div>

      {/* Estimated Cost */}
      <div className="backdrop-blur-md rounded-xl p-6 mb-3 text-center shadow-xl relative overflow-hidden border border-white/20" style={{
        background: 'linear-gradient(to bottom, rgba(255,255,255,0.12), rgba(255,255,255,0.04))'
      }}>
        <div className="text-sm font-semibold text-gray-300 mb-2">ESTIMATED COST</div>
        <div className="text-5xl font-bold text-white">
          ${estimatedCost.toLocaleString()}
        </div>
      </div>

      {/* Disclaimer */}
      <div className="text-sm text-gray-300 text-center leading-relaxed backdrop-blur-md rounded-xl p-4 relative overflow-hidden border border-white/10" style={{
        background: 'linear-gradient(to bottom, rgba(255,255,255,0.08), rgba(255,255,255,0.02))'
      }}>
        <p>
          This is only an estimate. For special requests or scenarios outside these parameters,
          please email{' '}
          <a
            href="mailto:service@thegrossdomestic.com"
            className="text-blue-400 hover:text-blue-300 underline"
          >
            service@thegrossdomestic.com
          </a>
        </p>
      </div>
      </div>
    </div>
  );
}
