import type { Grade, DistinctionLevel } from '../types';

export const calculateCreditAverage = (grades: Grade[]): number => {
  if (grades.length === 0) return 0;
  
  const totalCreditPoints = grades.reduce((acc, g) => acc + (g.grade * g.credits), 0);
  const totalCredits = grades.reduce((acc, g) => acc + g.credits, 0);
  
  return totalCredits === 0 ? 0 : (totalCreditPoints / totalCredits);
};

/**
 * Calculates the final percentage as an integer.
 * Per KdG rules: Rounded to the nearest whole number (>= .5 rounds up).
 */
export const calculatePercentage = (average: number): number => {
  return Math.round((average / 20) * 100);
};

export const getDistinctionLevel = (percentage: number): DistinctionLevel => {
  if (percentage < 50) {
    return { label: 'Failed', color: 'text-red-600' };
  }
  
  if (percentage < 65) {
    return { label: 'Satisfactory', color: 'text-blue-700' };
  }
  
  if (percentage < 75) {
    return { label: 'Distinction', color: 'text-emerald-700' };
  }
  
  if (percentage < 85) {
    return { label: 'Great Distinction', color: 'text-purple-700' };
  }
  
  return { label: 'Greatest Distinction', color: 'text-amber-600 font-bold' };
};