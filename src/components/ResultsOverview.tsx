import React from 'react';
import type { DistinctionLevel } from '../types';
import { KDG_NAVY } from '../constants/colors';
import { Tooltip } from './Tooltip';

interface ResultsOverviewProps {
  average: number;
  percentage: number;
  distinction: DistinctionLevel;
}

export const ResultsOverview: React.FC<ResultsOverviewProps> = ({ 
  average, 
  percentage, 
  distinction 
}) => {
  return (
    <div 
      className="rounded-xl shadow-xl overflow-hidden mb-10 text-white animate-in fade-in slide-in-from-bottom-4 duration-700"
      style={{ backgroundColor: KDG_NAVY }}
    >
      <div className="px-8 py-10 grid grid-cols-1 md:grid-cols-3 gap-8 text-center items-center">
        <div className="border-r border-white/10 md:pr-4 last:border-0">
          <p className="text-white/70 text-sm font-bold uppercase tracking-widest mb-1">Credit Average</p>
          <p className="text-5xl font-black">
            {average.toFixed(2)}
            <span className="text-2xl text-white/50">/20</span>
          </p>
        </div>
        <div className="border-r border-white/10 md:pr-4 last:border-0">
          <p className="text-white/70 text-sm font-bold uppercase tracking-widest mb-1">Percentage</p>
          <div className="flex justify-center">
            <Tooltip content={`Raw value: ${((average / 20) * 100).toFixed(2)}%`}>
              <p className="text-5xl font-black cursor-help">
                {percentage}%
              </p>
            </Tooltip>
          </div>
        </div>
        <div className="last:border-0">
          <p className="text-white/70 text-sm font-bold uppercase tracking-widest mb-1">Distinction</p>
          <p 
            className="text-2xl font-black bg-white inline-block px-4 py-1 rounded"
            style={{ color: KDG_NAVY }}
          >
            {distinction.label}
          </p>
        </div>
      </div>
    </div>
  );
};

